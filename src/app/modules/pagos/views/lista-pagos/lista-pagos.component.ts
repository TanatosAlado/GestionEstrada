import { Component } from '@angular/core';
import { PagosService } from '../../services/pagos.service';
import { ClienteService } from 'src/app/modules/clientes/services/cliente.service';
import { AltaPagosComponent } from '../alta-pagos/alta-pagos.component';
import { PagoDetalleComponent } from '../pago-detalle/pago-detalle.component';
import { MatDialog } from '@angular/material/dialog';
import { Pago } from '../../models/pago.model';

@Component({
  selector: 'app-lista-pagos',
  templateUrl: './lista-pagos.component.html',
  styleUrls: ['./lista-pagos.component.css']
})
export class ListaPagosComponent {

  pagos: Pago[] = [];
  pagosFiltrados: Pago[] = [];
  clientes: any[] = []; // Asegurate de cargarlos
  clienteSeleccionado: string | null = null;

  columnas: string[] = ['cliente', 'fecha', 'monto', 'acciones'];

  constructor(
    private pagosService: PagosService,
    private dialog: MatDialog,
    private clientesService: ClienteService,
  ) {}

  ngOnInit() {
    this.cargarClientes();
    this.cargarPagos();
  }

  cargarClientes() {
    this.clientesService.obtenerClientes().subscribe(data => {
      this.clientes = data;
    });
  }

  cargarPagos() {
    this.pagosService.obtenerTodos().subscribe(data => {
      this.pagos = data;
      this.filtrarPagos();
    });
  }

  filtrarPagos() {
    if (this.clienteSeleccionado) {
      this.pagosFiltrados = this.pagos.filter(p => p.clienteId === this.clienteSeleccionado);
    } else {
      this.pagosFiltrados = this.pagos;
    }
  }

  abrirDialogoNuevoPago() {
    const dialogRef = this.dialog.open(AltaPagosComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado === 'recargado') {
        this.cargarPagos();
      }
    });
  }

  verDetalle(pago: Pago) {
    this.dialog.open(PagoDetalleComponent, {
      width: '600px',
      data: pago
    });
  }
}
