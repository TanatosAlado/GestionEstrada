import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AbonoCliente } from '../../models/abonoCliente.model';
import { AbonosService } from '../../services/abonos.service';
import { EditarAbonoComponent } from '../editar-abono/editar-abono.component';

@Component({
  selector: 'app-ver-abonos',
  templateUrl: './ver-abonos.component.html',
  styleUrls: ['./ver-abonos.component.css']
})
export class VerAbonosComponent implements OnInit {
  abonos: AbonoCliente[] = [];

  // Las columnas a mostrar
  columnas: string[] = [
    'fechaInicio',
    'fechaFijacionPrecioHasta',
    'cantidadBidones',
    'cantidadContratada',
    'precioNegociado',
    'acciones'
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { clienteId: string },
    private abonosService: AbonosService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.abonosService.obtenerAbonosPorCliente(this.data.clienteId).subscribe(abonos => {
      this.abonos = abonos;

      if (this.abonos.length === 0) {
        // Si no tiene abonos personalizados, consultamos el abono general
        this.abonosService.obtenerAbonoGeneralAsignado(this.data.clienteId).subscribe(abonoGeneral => {
          console.log('Abono general asignado:', abonoGeneral);
          if (abonoGeneral) {
            this.abonos = [{
              id: abonoGeneral.id,
              clienteId: this.data.clienteId,
              tipo: abonoGeneral.tipoCliente,
              bidones: abonoGeneral.bidones,
              precioNegociado: abonoGeneral.precio,
              fechaInicio: abonoGeneral.fechaAsignacion || null,
              fechaFijacionPrecioHasta: null,
              activo: true,
              cantidadContratada: 1,
              esGeneral: true
            }];
          } else {
            console.log('No hay abono general asignado para este cliente.');
          }
        });

      }
    });
  }



  eliminarAbono(abonoId: string): void {
    if (confirm('¿Estás seguro que querés eliminar este abono?')) {
      this.abonosService.eliminarAbono(abonoId).then(() => {
        this.abonos = this.abonos.filter(a => a.id !== abonoId);
      });
    }
  }

  editarAbono(abono: AbonoCliente): void {
    const dialogRef = this.dialog.open(EditarAbonoComponent, {
      width: '700px',
      data: abono
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.abonosService.actualizarAbono(abono.id, result).then(() => {
          const index = this.abonos.findIndex(a => a.id === abono.id);
          if (index !== -1) {
            this.abonos[index] = { ...this.abonos[index], ...result };
          }
        });
      }
    });
  }


eliminarAsignacionGeneral(): void {
  if (confirm('¿Estás seguro que querés eliminar la asignación del abono general?')) {
    this.abonosService.eliminarAsignacionAbonoGeneral(this.data.clienteId).then(() => {
      this.abonos = []; // Limpiamos la tabla
    });
  }
}


}
