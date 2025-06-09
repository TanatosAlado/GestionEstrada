import { Component, OnInit } from '@angular/core';
import { RemitosService } from '../../services/remitos.service';
import { RemitoCliente } from '../../models/remitoCliente.model';
import { Cliente } from '../../../clientes/models/cliente.model';
import { ClienteService } from 'src/app/modules/clientes/services/cliente.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import { FacturasService } from 'src/app/modules/facturacion/services/facturas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DetalleRemitoComponent } from '../detalle-remito/detalle-remito.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-remitos-lista',
  templateUrl: './remitos-lista.component.html',
  styleUrls: ['./remitos-lista.component.css']
})
export class RemitosListaComponent implements OnInit {

  remitos: RemitoCliente[] = [];
  clientes: Cliente[] = [];

  clienteSeleccionado: string | null = null;
  estadoFacturacionSeleccionado: boolean | null = null;

  displayedColumns: string[] = ['select', 'cliente', 'fecha', 'repartidor', 'facturado','acciones'];
  remitosSeleccionados: RemitoCliente[] = [];
  dataSource = new MatTableDataSource<RemitoCliente>();

  constructor(
    private remitosService: RemitosService,
    private clienteService: ClienteService,
    private facturasService: FacturasService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.cargarRemitos();
    this.cargarClientes();
  }

  cargarRemitos(): void {
    this.remitosService.obtenerTodosLosRemitos().subscribe(remitos => {
      this.remitos = remitos;
      this.aplicarFiltros(); // Aplica los filtros iniciales (todos)
    });
  }

  cargarClientes(): void {
    this.clienteService.obtenerClientes().subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  aplicarFiltros(): void {
    this.dataSource.data = this.remitos.filter(remito => {
      const coincideCliente = !this.clienteSeleccionado || remito.clienteId === this.clienteSeleccionado;
      const coincideFacturado = this.estadoFacturacionSeleccionado === null || remito.facturado === this.estadoFacturacionSeleccionado;
      return coincideCliente && coincideFacturado;
    });
  }

  onClienteSeleccionado(clienteId: string | null): void {
    this.clienteSeleccionado = clienteId;
    this.aplicarFiltros();
  }

  onEstadoFacturacionSeleccionado(valor: boolean | null): void {
    this.estadoFacturacionSeleccionado = valor;
    this.aplicarFiltros();
  }

  toggleSeleccion(remito: RemitoCliente) {
    const yaSeleccionado = this.remitosSeleccionados.some(r => r.id === remito.id);
    const mismoCliente = this.remitosSeleccionados.length === 0 || this.remitosSeleccionados[0].clienteId === remito.clienteId;

    if (yaSeleccionado) {
      this.remitosSeleccionados = this.remitosSeleccionados.filter(r => r.id !== remito.id);
    } else if (mismoCliente) {
      this.remitosSeleccionados.push(remito);
    } else {
      alert("No se pueden seleccionar remitos de diferentes clientes.");
    }
  }

  estaSeleccionado(remito: RemitoCliente): boolean {
    return this.remitosSeleccionados.some(r => r.id === remito.id);
  }

  toggleSeleccionarTodos(event: MatCheckboxChange) {
    if (event.checked) {
      const remitosNoFacturados = this.dataSource.data.filter(r => !r.facturado);
      const clienteUnico = this.remitosSeleccionados.length === 0 ? null : this.remitosSeleccionados[0].clienteId;
      const remitosMismoCliente = remitosNoFacturados.filter(r => r.clienteId === clienteUnico || !clienteUnico);
      this.remitosSeleccionados = remitosMismoCliente;
    } else {
      this.remitosSeleccionados = [];
    }
  }

  isAllSelected(): boolean {
    const remitosNoFacturados = this.dataSource.data.filter(r => !r.facturado);
    return this.remitosSeleccionados.length === remitosNoFacturados.length;
  }

  isSomeSelected(): boolean {
    return this.remitosSeleccionados.length > 0 && !this.isAllSelected();
  }

  facturarSeleccionados() {
    if (this.remitosSeleccionados.length === 0) return;

    const clienteId = this.remitosSeleccionados[0].clienteId;
    const fechaFactura = new Date();
    const remitosIds = this.remitosSeleccionados.map(r => r.id);

    const cliente = this.clientes.find(c => c.id === clienteId);

    let clienteNombre = 'Desconocido';
    if (cliente) {
      if (cliente.tipoCliente === 'empresa') {
        clienteNombre = cliente.razonSocial || 'Empresa sin nombre';
      } else {
        clienteNombre = `${cliente.nombre} ${cliente.apellido}`.trim();
      }
    }

    const factura = {
      clienteId: clienteId,
      clienteNombre: clienteNombre,
      fecha: fechaFactura,
      remitos: remitosIds,
    };


    this.facturasService.crearFactura(factura).then(() => {
      const actualizaciones = this.remitosSeleccionados.map(remito =>
        this.remitosService.marcarRemitoComoFacturado(remito.id)
      );

      Promise.all(actualizaciones).then(() => {
        this.snackBar.open('Factura creada y remitos actualizados', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['snackbar-success']
        });

        this.remitosSeleccionados.forEach(remito => {
          remito.facturado = true;
        });

        this.aplicarFiltros();
        this.remitosSeleccionados = [];
      }).catch(error => {
        console.error('Error al actualizar remitos:', error);
        this.snackBar.open('Error al actualizar remitos', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['snackbar-error']
        });
      });
    }).catch(error => {
      console.error('Error al crear la factura:', error);
      this.snackBar.open('Error al crear la factura', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      });
    });
  }

verDetalle(remito: any): void {
  this.dialog.open(DetalleRemitoComponent, {
    width: '600px',
    data: { remito }
  });
}


}
