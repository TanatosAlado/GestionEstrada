import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-detalle-remito',
  templateUrl: './detalle-remito.component.html',
  styleUrls: ['./detalle-remito.component.css']
})
export class DetalleRemitoComponent {
  remito: any;

  constructor(
    public dialogRef: MatDialogRef<DetalleRemitoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { remito: any }
  ) {
    this.remito = data.remito;
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
