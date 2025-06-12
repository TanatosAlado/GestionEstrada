import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RemitosService } from 'src/app/modules/remitos/services/remitos.service';
import { RemitoCliente } from 'src/app/modules/remitos/models/remitoCliente.model';
import { take } from 'rxjs';

@Component({
  selector: 'app-factura-detalle',
  templateUrl: './factura-detalle.component.html',
  styleUrls: ['./factura-detalle.component.css']
})
export class FacturaDetalleComponent {

  remitos: RemitoCliente[] = [];
  remitosCargados = false;
  cargandoRemitos = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public factura: any,
    private remitosService: RemitosService
  ) {}

  cargarRemitos() {
    if (this.remitosCargados || this.cargandoRemitos) return;

    this.cargandoRemitos = true;
    const ids = this.factura.remitos || [];

    Promise.all(
      ids.map(id => this.remitosService.obtenerRemitoPorId(id).pipe(take(1)).toPromise())
    )
      .then(remitos => {
        this.remitos = remitos.filter(r => !!r); // eliminamos nulos si hay
        this.remitosCargados = true;
      })
      .catch(err => {
        console.error('Error al cargar remitos:', err);
      })
      .finally(() => {
        this.cargandoRemitos = false;
      });
  }
}
