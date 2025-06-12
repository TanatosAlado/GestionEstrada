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
import { AbonoGeneral } from 'src/app/modules/abonos/models/abonoGeneral.model';
import { AbonoCliente } from 'src/app/modules/abonos/models/abonoCliente.model';
import { ResumenFactura } from 'src/app/modules/facturacion/models/resumenFactura.model';
import { ResumenFacturaComponent } from '../resumen-factura/resumen-factura.component';
import { ProductoService } from 'src/app/modules/productos/services/productos.service';
import { AbonosService } from 'src/app/modules/abonos/services/abonos.service';
import { firstValueFrom } from 'rxjs';


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

  displayedColumns: string[] = ['select', 'cliente', 'fecha', 'repartidor', 'facturado', 'acciones'];
  remitosSeleccionados: RemitoCliente[] = [];
  dataSource = new MatTableDataSource<RemitoCliente>();

  resumenCalculado!: ResumenFactura; // se asigna luego de calcular


  constructor(
    private remitosService: RemitosService,
    private clienteService: ClienteService,
    private facturasService: FacturasService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private productoService: ProductoService,
    private abonosService: AbonosService
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

  async toggleSeleccion(remito: RemitoCliente) {
    const yaSeleccionado = this.remitosSeleccionados.some(r => r.id === remito.id);
    const mismoCliente = this.remitosSeleccionados.length === 0 || this.remitosSeleccionados[0].clienteId === remito.clienteId;

    if (yaSeleccionado) {
      this.remitosSeleccionados = this.remitosSeleccionados.filter(r => r.id !== remito.id);
    } else if (mismoCliente) {
      this.remitosSeleccionados.push(remito);
    } else {
      alert("No se pueden seleccionar remitos de diferentes clientes.");
      return;
    }

    // 🔁 Recalcular resumen al cambiar la selección
    await this.calcularResumenFactura();
  }

  estaSeleccionado(remito: RemitoCliente): boolean {
    return this.remitosSeleccionados.some(r => r.id === remito.id);
  }

  async toggleSeleccionarTodos(event: MatCheckboxChange) {
    if (event.checked) {
      const remitosNoFacturados = this.dataSource.data.filter(r => !r.facturado);
      const clienteUnico = this.remitosSeleccionados.length === 0 ? null : this.remitosSeleccionados[0]?.clienteId || remitosNoFacturados[0]?.clienteId;
      const remitosMismoCliente = remitosNoFacturados.filter(r => r.clienteId === clienteUnico);
      this.remitosSeleccionados = remitosMismoCliente;
    } else {
      this.remitosSeleccionados = [];
    }

    // 🔁 Recalcular resumen
    await this.calcularResumenFactura();
  }

  isAllSelected(): boolean {
    const remitosNoFacturados = this.dataSource.data.filter(r => !r.facturado);
    return this.remitosSeleccionados.length === remitosNoFacturados.length;
  }

  isSomeSelected(): boolean {
    return this.remitosSeleccionados.length > 0 && !this.isAllSelected();
  }

  facturarSeleccionados(resumen: ResumenFactura) {
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
      clienteId,
      clienteNombre,
      fecha: fechaFactura,
      remitos: remitosIds,
      total: resumen.total,            // 💲 Monto total
      estado: 'pendiente',             // 🔁 Estado inicial
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


  abrirResumenFactura(resumen: ResumenFactura) {
    const dialogRef = this.dialog.open(ResumenFacturaComponent, {
      width: '800px',
      data: resumen
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.total) {
        this.facturarSeleccionados(result); // pasás el resumen con total
      }
    });
  }


  verDetalle(remito: any): void {
    this.dialog.open(DetalleRemitoComponent, {
      width: '800px',
      data: { remito }
    });
  }


  async calcularResumenFactura() {
    if (this.remitosSeleccionados.length === 0) return;

    const clienteId = this.remitosSeleccionados[0].clienteId;
    const clienteNombre = this.remitosSeleccionados[0].clienteNombre || '';

    // Paso 1: Agrupar productos por capacidad
    const contador: Record<string, number> = {};

    this.remitosSeleccionados.forEach(remito => {
      remito.productos.forEach(producto => {
        const match = producto.descripcion?.match(/(\d+)\s?L/i);
        if (match) {
          const capacidad = match[1];
          contador[capacidad] = (contador[capacidad] || 0) + producto.cantidad;
        }
      });
    });

    // Paso 2: Obtener abono activo (personalizado o general)
    let abono: AbonoCliente | AbonoGeneral | null = null;
    const cliente = this.clientes.find(c => c.id === clienteId);

    if (cliente?.tipoCliente === 'empresa' && cliente.abonos?.length > 0) {
      const ultimoAbono = cliente.abonos[cliente.abonos.length - 1];
      try {
        const abonoCompleto = await this.abonosService.obtenerAbonoClientePorId(ultimoAbono.abonoId);
        if (abonoCompleto?.activo) {
          abono = abonoCompleto;
        }
      } catch (error) {
        console.warn('No se pudo obtener el abono personalizado por ID:', error);
      }
    }

    if (!abono) {
      abono = await firstValueFrom(this.abonosService.obtenerAbonoGeneralAsignado(clienteId));
    }

    // Paso 3: Obtener precios desde Productos
    const productos = await this.productoService.getProductosActivosPromise();

    let total = 0;
    const productosResumen = [];

    for (const capacidadStr of Object.keys(contador)) {
      const capacidad = Number(capacidadStr);
      const cantidad = contador[capacidadStr];

      const producto = productos.find(p => p.capacidad === capacidad && p.activo);
      const precioUnitario = producto?.precio || 0;

      const semanas = this.remitosSeleccionados.length;
      let cantidadContratada = 1;

      if ('cantidadContratada' in abono && typeof abono.cantidadContratada === 'number') {
        cantidadContratada = abono.cantidadContratada;
      }

      const bidonesPorSemana = abono?.bidones?.[`${capacidad}L`] ?? 0;
      const cantidadCubiertaTotal = bidonesPorSemana * cantidadContratada * semanas;

      const cubiertos = Math.min(cantidad, cantidadCubiertaTotal);
      const excedente = cantidad - cubiertos;
      const subtotal = excedente * precioUnitario;

      total += subtotal;

      productosResumen.push({
        tipo: 'bidon',
        capacidad,
        cantidad,
        cubiertosPorAbono: cubiertos,
        excedente,
        precioUnitario,
        subtotal
      });
    }

    // ✅ Paso adicional: sumar el costo del abono por la cantidad de remitos
    if (abono) {
      const precioAbono = abono['precioNegociado'] || abono['precio'] || 0;
      const cantidadRemitos = this.remitosSeleccionados.length;
      total += precioAbono * cantidadRemitos;
    }

    this.resumenCalculado = {
      clienteId,
      clienteNombre,
      abono,
      productos: productosResumen,
      total
    };
  }


}
