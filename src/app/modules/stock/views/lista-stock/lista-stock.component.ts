import { Component } from '@angular/core';
import { ProductoService } from 'src/app/modules/productos/services/productos.service';
import { Producto } from 'src/app/modules/productos/models/producto.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lista-stock',
  templateUrl: './lista-stock.component.html',
  styleUrls: ['./lista-stock.component.css']
})
export class ListaStockComponent {

  stock: Producto[] = [];
  productosEditados: Set<string> = new Set();

  constructor(private productoService: ProductoService, private snackBar: MatSnackBar) { }


  ngOnInit() {
    this.productoService.obtenerProductos().subscribe(productos => {
      this.stock = productos.map(p => ({ ...p, stock: p.stock ?? 0 }));
    });
  }

  onStockChange(producto: Producto) {
    this.productosEditados.add(producto.id);
  }

  guardarStock(producto: Producto) {
    this.productoService.actualizarProducto(producto)
      .then(() => {
        this.productosEditados.delete(producto.id);
        this.snackBar.open('Stock actualizado', 'Cerrar', { duration: 2000 });
      })
      .catch(error => {
        console.error('Error al actualizar stock', error);
        this.snackBar.open('Error al guardar stock', 'Cerrar', { duration: 3000 });
      });
  }

  fueEditado(id: string): boolean {
    return this.productosEditados.has(id);
  }

}
