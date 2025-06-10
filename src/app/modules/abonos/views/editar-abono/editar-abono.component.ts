import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbonoCliente } from '../../models/abonoCliente.model';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-editar-abono',
  templateUrl: './editar-abono.component.html',
  styleUrls: ['./editar-abono.component.css']
})
export class EditarAbonoComponent implements OnInit {
  abonoForm: FormGroup;
  hoy: Date = new Date();
  puedeEditarPrecio: boolean = true;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditarAbonoComponent>,
    @Inject(MAT_DIALOG_DATA) public abono: AbonoCliente
  ) {}

ngOnInit(): void {
  let fechaFijacion: Date | null = null;

  if (this.abono.fechaFijacionPrecioHasta) {
    fechaFijacion = this.abono.fechaFijacionPrecioHasta instanceof Timestamp
      ? this.abono.fechaFijacionPrecioHasta.toDate()
      : new Date(this.abono.fechaFijacionPrecioHasta);
  }

  // Solo se bloquea la edición del precio si hay una fecha límite futura
  this.puedeEditarPrecio = !fechaFijacion || fechaFijacion <= this.hoy;

  this.abonoForm = this.fb.group({
    cantidadContratada: [this.abono.cantidadContratada, [Validators.required, Validators.min(1)]],
    precioNegociado: [
      { value: this.abono.precioNegociado, disabled: !this.puedeEditarPrecio },
      [Validators.required, Validators.min(0)]
    ],
    fechaFijacionPrecioHasta: [fechaFijacion, this.fechaMinimaValidator()]
  });
}

fechaMinimaValidator() {
  return (control) => {
    const fecha = control.value;
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fecha && new Date(fecha) < hoy) {
      return { fechaPasada: true };
    }
    return null;
  };
}

  guardar(): void {
    if (this.abonoForm.valid) {
      const formValue = this.abonoForm.getRawValue(); // incluye campos deshabilitados
      this.dialogRef.close(formValue);
    }
  }
}