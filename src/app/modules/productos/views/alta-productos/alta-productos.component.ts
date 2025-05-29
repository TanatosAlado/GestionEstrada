import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../../services/productos.service'; 
import { Producto } from '../../models/producto.model'; 
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alta-productos',
  templateUrl: './alta-productos.component.html',
  styleUrls: ['./alta-productos.component.css']
})
export class AltaProductosComponent implements OnInit {
  productoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productosService: ProductoService,
    private dialogRef: MatDialogRef<AltaProductosComponent>
  ) {}

  ngOnInit(): void {
    this.productoForm = this.fb.group({
      tipo: ['bidon', Validators.required],
      capacidad: [null],
      tipoDispenser: [''],
      stock: [0, [Validators.required, Validators.min(0)]],
      activo: [true]
    });

    this.onTipoChange(this.productoForm.get('tipo')?.value); // Inicializar validaciones condicionales
  }

  onTipoChange(tipo: string) {
    const tipoDispenser = this.productoForm.get('tipoDispenser');
    const capacidad = this.productoForm.get('capacidad');

    if (tipo === 'dispenser') {
      tipoDispenser?.setValidators([Validators.required]);
      capacidad?.clearValidators();
      capacidad?.setValue(null);
    } else {
      tipoDispenser?.clearValidators();
      tipoDispenser?.setValue('');
      capacidad?.setValidators([Validators.required, Validators.min(1)]);
    }

    tipoDispenser?.updateValueAndValidity();
    capacidad?.updateValueAndValidity();
  }

  guardar() {
    if (this.productoForm.invalid) return;

    const producto: Producto = this.productoForm.value;

    this.productosService.agregarProducto(producto).then(() => {
      this.dialogRef.close(true);
    });
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}
