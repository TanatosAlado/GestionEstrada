import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProduccionService } from '../../services/produccion.service';
import { Produccion } from '../../models/produccion.model';
import { MatDialog } from '@angular/material/dialog';
import { AltaProduccionComponent } from '../alta-produccion/alta-produccion.component';
import { ProductoService } from 'src/app/modules/productos/services/productos.service';
import { Producto } from 'src/app/modules/productos/models/producto.model';

@Component({
  selector: 'app-lista-produccion',
  templateUrl: './lista-produccion.component.html',
  styleUrls: ['./lista-produccion.component.css']
})
export class ListaProduccionComponent implements OnInit {

  producciones: Produccion[] = [];
  displayedColumns: string[] = ['id', 'fecha', 'operador', 'detalle'];
  productosDisponibles: Producto[] = [];




  constructor(
    private produccionService: ProduccionService,
    private router: Router,
    private dialog: MatDialog,
    private productoService: ProductoService) { }

  ngOnInit(): void {
    this.obtenerProducciones();
    this.productoService.obtenerProductos().subscribe((res) => {
      this.productosDisponibles = res;
    });
  }

  obtenerProducciones(): void {
    this.produccionService.obtenerTodas().subscribe((res) => {
      this.producciones = res;
    });
  }

  irANuevaProduccion(): void {
    this.router.navigate(['/produccion/nueva']);
  }

  formatearFecha(timestamp: any): string {
    if (!timestamp) return '';
    const date = timestamp.toDate(); // Timestamp → Date
    return date.toLocaleDateString();
  }

  resumenDetalle(detalle: Produccion['detalle']): string {
    return detalle.map(d => `${d.tipoBidon}: ${d.cantidad}`).join(' | ');
  }

  abrirModal() {
    const dialogRef = this.dialog.open(AltaProduccionComponent, {
      width: '600px',
      disableClose: true, // opcional
      data: {} // podés pasar datos si hace falta
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado === 'creado') {
        this.obtenerProducciones();
      }
    });
  }


  obtenerNombreProducto(productoId: string): string {
    const prod = this.productosDisponibles.find(p => p.id === productoId);
    return prod ? `${prod.tipo} (${prod.capacidad})` : productoId;
  }

obtenerDetalleTexto(detalle: { id: string; cantidad: number }[]): string {
  if (!detalle || detalle.length === 0) return '-';

  return detalle.map(item => {
    const producto = this.productosDisponibles.find(p => p.id === item.id);
    const nombre = producto
      ? `${producto.tipo} ${producto.capacidad ? producto.capacidad + 'L' : ''}`
      : 'Producto desconocido';
    return `${nombre}: ${item.cantidad}`;
  }).join(', ');
}




}