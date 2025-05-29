import { Component } from '@angular/core';
import { Abono } from '../../models/abono.model';
import { AbonosService } from '../../services/abonos.service';
import { AltaAbonoComponent } from '../alta-abono/alta-abono.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-lista-abono',
  templateUrl: './lista-abono.component.html',
  styleUrls: ['./lista-abono.component.css']
})
export class ListaAbonoComponent {

  abonos: Abono[] = [];
columnas: string[] = ['nombre', 'cantidadBidones', 'precioMensual', 'acciones'];

constructor(private abonoService: AbonosService, private dialog: MatDialog) {}

ngOnInit() {
  this.abonoService.obtenerAbonos().subscribe(abonos => {
    this.abonos = abonos;
  });
}

asignarAbono(abono: Abono) {
  // abrir formulario para asignar este abono a un cliente
}

  cambiarEstado(abono: Abono) {
    const actualizado = { ...abono, activo: !abono.activo };
    this.abonoService.actualizarAbono(actualizado.id!, actualizado);
  }

  abrirAltaAbono() {
  const dialogRef = this.dialog.open(AltaAbonoComponent, {
    width: '500px'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Podés refrescar el listado si lo necesitás
      this.abonoService.obtenerAbonos().subscribe(abonos => {
        this.abonos = abonos;
      });
    }
  });
}

}
