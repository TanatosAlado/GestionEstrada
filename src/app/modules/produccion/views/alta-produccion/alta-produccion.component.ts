import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ProduccionService } from '../../services/produccion.service';
import { MatDialogRef } from '@angular/material/dialog';
import { StockService } from 'src/app/shared/services/stock.service';
import { ProductoService } from 'src/app/modules/productos/services/productos.service';
import { Producto } from 'src/app/modules/productos/models/producto.model';

@Component({
  selector: 'app-alta-produccion',
  templateUrl: './alta-produccion.component.html',
  styleUrls: ['./alta-produccion.component.css']
})
export class AltaProduccionComponent implements OnInit {
  produccionForm: FormGroup;
  tiposDisponibles: Producto[] = [];

  constructor(
    private fb: FormBuilder,
    private produccionService: ProduccionService,
    private dialogRef: MatDialogRef<AltaProduccionComponent>,
    private stockService: StockService,
    private productoService: ProductoService
  ) {
    this.produccionForm = this.fb.group({
      fecha: [new Date(), Validators.required],
      operador: ['', Validators.required],
      detalle: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.cargarTiposDisponibles();
    this.agregarTipo(); // uno por defecto
  }

  cargarTiposDisponibles(): void {
    this.productoService.obtenerProductos().subscribe(productos => {
      this.tiposDisponibles = productos.filter(p => p.tipo !== 'dispenser');
    });
  }

  get detalle(): FormArray {
    return this.produccionForm.get('detalle') as FormArray;
  }

  agregarTipo(): void {
    this.detalle.push(this.fb.group({
      productoId: ['', Validators.required], // antes: tipoBidon
      cantidad: [0, [Validators.required, Validators.min(1)]]
    }));
  }


  eliminarTipo(index: number): void {
    this.detalle.removeAt(index);
  }

  guardar(): void {
    if (this.produccionForm.invalid) return;

    const formValue = this.produccionForm.value;

    // Convertir detalle para que tenga productoId y cantidad
    const detalleProduccion = formValue.detalle.map((item: any) => ({
      id: item.productoId,
      cantidad: item.cantidad
    }));

    const produccion = {
      id: '', // se asigna luego
      fecha: formValue.fecha,
      operador: formValue.operador,
      detalle: detalleProduccion
    };
    console.log('Producción a guardar:', produccion);

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
