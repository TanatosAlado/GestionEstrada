import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResumenFactura } from 'src/app/modules/facturacion/models/resumenFactura.model'; 

@Component({
  selector: 'app-resumen-factura',
  templateUrl: './resumen-factura.component.html',
  styleUrls: ['./resumen-factura.component.css']
})
export class ResumenFacturaComponent {
  constructor(
    public dialogRef: MatDialogRef<ResumenFacturaComponent>,
    @Inject(MAT_DIALOG_DATA) public resumen: ResumenFactura
  ) {}

  confirmar() {
    this.dialogRef.close('confirmar');
  }

  cancelar() {
    this.dialogRef.close();
  }
}