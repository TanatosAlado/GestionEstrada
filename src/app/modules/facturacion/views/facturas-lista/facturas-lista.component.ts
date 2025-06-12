import { Component, OnInit } from '@angular/core';
import { FacturasService } from '../../services/facturas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FacturaDetalleComponent } from '../factura-detalle/factura-detalle.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-facturas-lista',
  templateUrl: './facturas-lista.component.html',
  styleUrls: ['./facturas-lista.component.css']
})
export class FacturasListaComponent {

  facturas: any[] = [];
  columnas: string[] = ['cliente', 'fecha', 'total', 'estado', 'acciones'];

  constructor(private facturasService: FacturasService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.facturasService.obtenerFacturas().subscribe(data => {
      this.facturas = data;
    });
  }

  marcarComoAbonada(factura: any) {
  // this.facturasService.actualizarFactura(factura.id, { estado: 'abonada' }).then(() => {
  //   this.snackBar.open('Factura marcada como abonada', 'Cerrar', {
  //     duration: 3000,
  //     verticalPosition: 'top',
  //     panelClass: ['snackbar-success']
  //   });
  // });
}

verDetalle(factura: any) {
  this.dialog.open(FacturaDetalleComponent, {
    width: '600px',
    data: factura
  });
}



}
