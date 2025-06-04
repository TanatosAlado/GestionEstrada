import { Component, OnInit } from '@angular/core';
import { Carga } from '../../models/carga.model';
import { MatDialog } from '@angular/material/dialog';
import { AltaCargaComponent } from '../alta-carga/alta-carga.component';
import { CargaService } from '../../services/carga.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenerarRemitosComponent } from '../generar-remitos/generar-remitos.component';

@Component({
  selector: 'app-lista-carga',
  templateUrl: './lista-carga.component.html',
  styleUrls: ['./lista-carga.component.css']
})
export class ListaCargaComponent {
  cargas: Carga[] = [];
  displayedColumns = ['fecha', 'repartidor', 'avance', 'acciones'];

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

abrirGenerarRemitos(carga: Carga) {
  console.log('Abrir generar remitos para carga:', carga);
  const dialogRef = this.dialog.open(GenerarRemitosComponent, {
    width: '800px',
    data: { carga }
  });

  dialogRef.afterClosed().subscribe((resultado) => {
    if (resultado) {
      this.snackBar.open('Remitos generados correctamente ✅', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    }
  });
}

calcularPorcentajeAsignado(carga: Carga): number {
  if (!carga.productos?.length) return 0;

  const total = carga.productos.reduce((acc, p) => acc + (p.cantidad || 0), 0);
  const asignado = carga.productos.reduce((acc, p) => acc + (p.cantidadAsignada || 0), 0);

  return total === 0 ? 0 : Math.round((asignado / total) * 100);
}

cargaCompletada(carga: Carga): boolean {
  return this.calcularPorcentajeAsignado(carga) >= 100;
}


}
