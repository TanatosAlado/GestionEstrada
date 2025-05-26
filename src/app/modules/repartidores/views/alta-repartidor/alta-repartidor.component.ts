import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Repartidor } from '../../models/repartidor.model'; 
import { RepartidorService } from '../../services/repartidor.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alta-repartidor',
  templateUrl: './alta-repartidor.component.html',
  styleUrls: ['./alta-repartidor.component.css']
})
export class AltaRepartidorComponent implements OnInit {

  repartidorForm!: FormGroup;

  @Output() onGuardar = new EventEmitter<Repartidor>();

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AltaRepartidorComponent>
  ) {}

  ngOnInit(): void {
    this.repartidorForm = this.fb.group({
      nombre: ['', Validators.required],
      telefono: ['']
    });
  }

  guardar(): void {
    if (this.repartidorForm.invalid) {
      this.repartidorForm.markAllAsTouched();
      return;
    }

    const nuevoRepartidor: Repartidor = new Repartidor({
      id: '',
      nombre: this.repartidorForm.value.nombre,
      telefono: this.repartidorForm.value.telefono,
      stock: []
    });

    this.dialogRef.close(nuevoRepartidor);
  }

    cancelar() {
    this.dialogRef.close(null);
  }
}
