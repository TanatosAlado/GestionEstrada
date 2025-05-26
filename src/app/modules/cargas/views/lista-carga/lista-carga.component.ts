import { Component, OnInit } from '@angular/core';
import { Carga } from '../../models/carga.model';
import { MatDialog } from '@angular/material/dialog';
import { AltaCargaComponent } from '../alta-carga/alta-carga.component';
import { CargaService } from '../../services/carga.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lista-carga',
  templateUrl: './lista-carga.component.html',
  styleUrls: ['./lista-carga.component.css']
})
export class ListaCargaComponent {
  cargas: Carga[] = [];
  displayedColumns = ['fecha', 'repartidor', 'acciones'];
  repartidoresMap = new Map<string, string>(); // id → nombre

  constructor(
    private dialog: MatDialog,
    private cargaService: CargaService,
     private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.cargaService.obtenerCargas().subscribe((cargas) => {
      this.cargas = cargas;
    });
  }

abrirAltaCarga() {
  const dialogRef = this.dialog.open(AltaCargaComponent, {
    width: '600px'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.snackBar.open('Carga guardada correctamente 🎉', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    }
  });
}

}
