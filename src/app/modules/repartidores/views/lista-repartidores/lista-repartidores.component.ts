import { Component, OnInit } from '@angular/core';
import { Repartidor } from '../../models/repartidor.model';
import { RepartidorService } from '../../services/repartidor.service';
import { StockItem } from 'src/app/shared/models/stockItem.model';
import { AltaRepartidorComponent } from '../alta-repartidor/alta-repartidor.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lista-repartidores',
  templateUrl: './lista-repartidores.component.html',
  styleUrls: ['./lista-repartidores.component.css']
})
export class ListaRepartidoresComponent implements OnInit {
  repartidores: Repartidor[] = [];
  displayedColumns: string[] = ['nombreCompleto', 'telefono', 'stockTotal', 'acciones'];

  constructor(private dialog: MatDialog, private repartidorService: RepartidorService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cargarRepartidores();
  }

  cargarRepartidores() {
    this.repartidorService.obtenerRepartidores()
      .subscribe(data => this.repartidores = data);
  }

  obtenerStockTotal(stock: StockItem[]): number {
    return stock.reduce((total, item) => total + item.cantidad, 0);
  }

  abrirAltaRepartidor() {
    const dialogRef = this.dialog.open(AltaRepartidorComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((nuevoRepartidor: Repartidor | null) => {
      if (nuevoRepartidor) {
        this.repartidorService.agregarRepartidor(nuevoRepartidor)
          .then(() => {
            this.snackBar.open('Repartidor agregado con éxito', 'Cerrar', { duration: 3000 });
            this.cargarRepartidores();
          })
          .catch(error => {
            console.error(error);
            this.snackBar.open('Error al guardar repartidor', 'Cerrar', { duration: 3000 });
          });
      }
    });
  }

  editarRepartidor(repartidor: Repartidor) {
    // Lógica para editar
  }

  eliminarRepartidor(id: string) {
    // Lógica para eliminar
  }
}
