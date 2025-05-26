import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ProduccionService } from '../../services/produccion.service';
import { Timestamp } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { StockService } from 'src/app/shared/services/stock.service';


@Component({
  selector: 'app-alta-produccion',
  templateUrl: './alta-produccion.component.html',
  styleUrls: ['./alta-produccion.component.css']
})
export class AltaProduccionComponent implements OnInit {
  produccionForm: FormGroup;
  tiposDisponibles = ['20L', '12L', '500cc'];

  constructor(
    private fb: FormBuilder,
    private produccionService: ProduccionService,
    private dialogRef: MatDialogRef<AltaProduccionComponent>,
    private stockService: StockService,
  ) {
    this.produccionForm = this.fb.group({
      fecha: [new Date(), Validators.required],
      operador: ['', Validators.required],
      detalle: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.agregarTipo(); // uno por defecto
  }

  get detalle(): FormArray {
    return this.produccionForm.get('detalle') as FormArray;
  }

  agregarTipo(): void {
    this.detalle.push(this.fb.group({
      tipoBidon: ['', Validators.required],
      cantidad: [0, [Validators.required, Validators.min(1)]]
    }));
  }

  eliminarTipo(index: number): void {
    this.detalle.removeAt(index);
  }

  guardar(): void {
    if (this.produccionForm.invalid) return;

    const formValue = this.produccionForm.value;

    const produccion = {
      id: '', // se asigna luego
      fecha: formValue.fecha,
      operador: formValue.operador,
      detalle: formValue.detalle
    };

    this.produccionService.crearProduccion(produccion)
      .then(async () => {
        await this.stockService.actualizarStockPorProduccion(produccion.detalle);
        alert('Producción registrada con éxito');
        this.produccionForm.reset();
        this.detalle.clear();
        this.agregarTipo();
      })
      .catch(error => {
        console.error('Error al crear la producción:', error);
        alert('Error al registrar la producción. Intente nuevamente.');
      });
  }

  cerrar(): void {
    this.dialogRef.close();
  }


}