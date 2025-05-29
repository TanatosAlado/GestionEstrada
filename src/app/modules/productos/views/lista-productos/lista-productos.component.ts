import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto.model'; 
import { ProductoService } from '../../services/productos.service';
import { AltaProductosComponent } from '../alta-productos/alta-productos.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent {
  productos: Producto[] = [];
  columnas = ['tipo', 'capacidad', 'tipoDispenser', 'stock', 'activo'];


  constructor(private productosService: ProductoService, private dialog: MatDialog) {}

  ngOnInit() {
    this.productosService.obtenerProductos().subscribe((prods) => {
      this.productos = prods;
    });
  }

  activarDesactivar(producto: Producto) {
    producto.activo = !producto.activo;
    this.productosService.actualizarProducto(producto);
  }

  abrirAltaProducto() {
  const dialogRef = this.dialog.open(AltaProductosComponent, {
    width: '500px'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Podés mostrar un snackBar o recargar la lista si fuera necesario
    }
  });
}

}
