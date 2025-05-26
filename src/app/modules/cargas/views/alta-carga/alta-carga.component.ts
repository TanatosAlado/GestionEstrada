import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Carga } from '../../models/carga.model';
import { Repartidor } from 'src/app/modules/repartidores/models/repartidor.model';
import { CargaService } from '../../services/carga.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alta-carga',
  templateUrl: './alta-carga.component.html',
  styleUrls: ['./alta-carga.component.css']
})
export class AltaCargaComponent {

    cargaForm!: FormGroup;
    repartidores: Repartidor[] = [];

  productosDisponibles = [
    { nombre: 'Bidón 10L', codigo: '10L' },
    { nombre: 'Bidón 20L', codigo: '20L' },
    { nombre: 'Botella 500ml', codigo: '500ML' },
    { nombre: 'Dispenser', codigo: 'DISP' }
  ];



  constructor(    private fb: FormBuilder,
    private cargaService: CargaService,
    private dialogRef: MatDialogRef<AltaCargaComponent>) {}

  ngOnInit(): void {
    this.cargaForm = this.fb.group({
      fecha: [new Date(), Validators.required],
      repartidorId: ['', Validators.required],
      productos: this.fb.array([]),
      remitos: [[]]
    });

    this.productosDisponibles.forEach(p => {
      this.productosFormArray.push(this.fb.group({
        codigo: [p.codigo],
        cantidad: [0, [Validators.required, Validators.min(0)]]
      }));
    });

    this.cargaService.obtenerRepartidores().subscribe(repartidores => {
      this.repartidores = repartidores;
    });
  }

  get productosFormArray(): FormArray {
    return this.cargaForm.get('productos') as FormArray;
  }

  guardarCarga() {
    if (this.cargaForm.invalid) {
      this.cargaForm.markAllAsTouched();
      return;
    }

    const formValue = this.cargaForm.value;

    // Filtramos solo productos con cantidad > 0
    const productos = formValue.productos.filter((p: any) => p.cantidad > 0);

    const repartidorSeleccionado = this.repartidores.find(r => r.id === formValue.repartidorId);

    if (!repartidorSeleccionado) {
      alert('Seleccioná un repartidor válido.');
      return;
    }

    const carga: Carga = {
      fecha: formValue.fecha,
      repartidor: this.cargaForm.value.repartidorId, 
      productos,
      remitos: formValue.remitos
    };

    this.cargaService.guardarCarga(carga).then(() => {
      this.dialogRef.close(true); // cerrar modal y avisar éxito
    }).catch(err => {
      console.error(err);
      alert('Error guardando la carga.');
    });
  }
}