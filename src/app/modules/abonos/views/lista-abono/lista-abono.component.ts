import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AltaAbonoComponent } from '../alta-abono/alta-abono.component';
import { AbonoCliente } from '../../models/abonoCliente.model';
import { AbonosService } from '../../services/abonos.service';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-lista-abono',
  templateUrl: './lista-abono.component.html',
  styleUrls: ['./lista-abono.component.css']
})
export class ListaAbonosComponent implements OnInit {

  abonos: AbonoCliente[] = [];

  columnas: string[] = [
    'clienteNombre',
    'tipo',
    'cantidadBidones',
    'precioNegociado',
    'fechaInicio',
    'fechaFijacionPrecioHasta',
    'activo'
  ];

  constructor(private dialog: MatDialog, private abonoService: AbonosService) { }

  ngOnInit(): void {
    // Luego se cargará desde Firebase
    this.cargarAbonos();
  }

  abrirAltaAbono() {
    const dialogRef = this.dialog.open(AltaAbonoComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Refrescar lista si se creó un nuevo abono
        this.cargarAbonos();
      }
    });
  }

  cargarAbonos() {
    this.abonoService.obtenerAbonos().subscribe((abonos: AbonoCliente[]) => {
      this.abonos = abonos.map((a) => ({
        ...a,
        fechaInicio:
          a.fechaInicio instanceof Date
            ? a.fechaInicio
            : (a.fechaInicio as Timestamp).toDate(),
        fechaFijacionPrecioHasta:
          a.fechaFijacionPrecioHasta
            ? a.fechaFijacionPrecioHasta instanceof Date
              ? a.fechaFijacionPrecioHasta
              : (a.fechaFijacionPrecioHasta as Timestamp).toDate()
            : undefined
      }));
    });
  }
}