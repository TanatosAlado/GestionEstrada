import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Repartidor } from 'src/app/modules/repartidores/models/repartidor.model';
import { CargaService } from '../../services/carga.service';
import { ProductoService } from 'src/app/modules/productos/services/productos.service';
import { Producto } from 'src/app/modules/productos/models/producto.model';
import { Firestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alta-carga',
  templateUrl: './alta-carga.component.html',
  styleUrls: ['./alta-carga.component.css']
})
export class AltaCargaComponent implements OnInit {

  private firestore = inject(Firestore);
  cargaForm!: FormGroup;
  repartidores: Repartidor[] = [];
  productosDisponibles: Producto[] = [];

  constructor(
    private dialogRef: MatDialogRef<AltaCargaComponent>,
    private fb: FormBuilder,
    private cargaService: CargaService,
    private productoService: ProductoService,
    private snackbar: MatSnackBar,

  ) { }

  ngOnInit(): void {
    this.cargaForm = this.fb.group({
      fecha: [new Date(), Validators.required],
      repartidorId: ['', Validators.required],
      productos: this.fb.array([]),
      remitos: [[]]
    });

    // Obtener productos desde Firebase
    this.productoService.obtenerProductos().subscribe((productos: Producto[]) => {
      // Solo productos tipo 'bidon'
      this.productosDisponibles = productos;

      // Armar FormArray en base a los productos reales
      this.productosDisponibles.forEach(p => {
        this.productosFormArray.push(this.fb.group({
          id: [p.id],
          descripcion: [this.getDescripcionProducto(p)],
          cantidad: [0, [Validators.required, Validators.min(0)]]
        }));
      });
    });

    this.cargaService.obtenerRepartidores().subscribe(repartidores => {
      this.repartidores = repartidores;
    });
  }

  get productosFormArray(): FormArray {
    return this.cargaForm.get('productos') as FormArray;
  }

async guardarCarga() {
  if (this.cargaForm.invalid) return;

  const formValue = this.cargaForm.value;

  const productosFiltrados = formValue.productos
    .filter((p: any) => p.cantidad > 0)
    .map((p: any) => ({
      ...p,
      cantidadAsignada: 0
    }));

  const carga = {
    ...formValue,
    productos: productosFiltrados
  };

  console.log('Datos de carga a guardar:', carga);

  try {
    await this.cargaService.guardarCarga(carga);

    const productosParaDescontar = carga.productos.map((p: any) => ({
      id: p.id,
      cantidad: p.cantidad
    }));

    await this.cargaService.descontarStock(productosParaDescontar);

    this.dialogRef.close(true);
    this.cargaForm.reset();

  } catch (error) {
    console.error('Error al guardar la carga o descontar stock:', error);
    this.snackbar.open('Ocurrió un error al guardar la carga', 'Cerrar', { duration: 3000 });
  }
}


  getDescripcionProducto(producto: Producto | undefined): string {
    if (!producto) {
      return '';
    }
    if (producto.capacidad) {
      // Si tiene capacidad, mostramos como "10L", "20L", etc.
      return `${producto.capacidad}L`;
    }

    if (producto.tipo === 'dispenser') {
      // Si es dispenser, mostramos el tipo específico de dispenser si existe
      if (producto.tipoDispenser) {
        return `Dispenser ${producto.tipoDispenser}`;
      }
      return 'Dispenser';
    }

    // Para otros tipos solo mostramos el tipo capitalizado (puedes adaptar)
    return producto.tipo.charAt(0).toUpperCase() + producto.tipo.slice(1);
  }

  cerrar(): void {
    this.dialogRef.close();
  }


}
