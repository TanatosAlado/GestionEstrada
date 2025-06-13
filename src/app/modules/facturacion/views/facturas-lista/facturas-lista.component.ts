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

  displayedColumns: string[] = ['cliente', 'fecha', 'total', 'saldo', 'estado', 'acciones'];

  constructor(private facturasService: FacturasService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.facturasService.obtenerFacturas().subscribe(data => {
      this.facturas = data;
    });
  }

verDetalle(factura: any) {
  this.dialog.open(FacturaDetalleComponent, {
    width: '600px',
    data: factura
  });
}

}
