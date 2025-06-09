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
    const fechaFijacion = this.abono.fechaFijacionPrecioHasta instanceof Timestamp
      ? this.abono.fechaFijacionPrecioHasta.toDate()
      : new Date(this.abono.fechaFijacionPrecioHasta);

    this.puedeEditarPrecio = fechaFijacion <= this.hoy;

    this.abonoForm = this.fb.group({
      cantidadContratada: [this.abono.cantidadContratada, [Validators.required, Validators.min(1)]],
      precioNegociado: [{ value: this.abono.precioNegociado, disabled: !this.puedeEditarPrecio }, [Validators.required, Validators.min(0)]],
      fechaFijacionPrecioHasta: [fechaFijacion, Validators.required]
    });
  }

  guardar(): void {
    if (this.abonoForm.valid) {
      const formValue = this.abonoForm.getRawValue(); // incluye campos deshabilitados
      this.dialogRef.close(formValue);
    }
  }
}