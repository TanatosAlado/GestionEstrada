import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AltaAbonoComponent } from '../alta-abono/alta-abono.component';
import { AltaAbonoGeneralComponent } from '../alta-abono-general/alta-abono-general.component';
import { AbonosService } from '../../services/abonos.service';
import { AbonoCliente } from '../../models/abonoCliente.model';
import { AbonoGeneral } from '../../models/abonoGeneral.model';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-lista-abono',
  templateUrl: './lista-abono.component.html',
  styleUrls: ['./lista-abono.component.css']
})
export class ListaAbonosComponent implements OnInit {

  abonos: AbonoCliente[] = [];
  abonosGenerales: AbonoGeneral[] = [];

  columnas: string[] = [
    'clienteNombre',
    'tipo',
    'cantidadBidones',
    'precioNegociado',
    'fechaInicio',
    'fechaFijacionPrecioHasta',
    'activo'
  ];

  columnasGenerales: string[] = [
    'tipo',
    'precio',
    'activo'
  ];

  constructor(
    private dialog: MatDialog,
    private abonoService: AbonosService
  ) { }

  ngOnInit(): void {
    this.cargarAbonos();
    this.cargarAbonosGenerales();
  }

  abrirAltaAbono() {
    const dialogRef = this.dialog.open(AltaAbonoComponent, { width: '500px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.cargarAbonos();
    });
  }

  abrirAltaAbonoGeneral() {
    const dialogRef = this.dialog.open(AltaAbonoGeneralComponent, { width: '500px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.cargarAbonosGenerales();
    });
  }

  cargarAbonos() {
    this.abonoService.obtenerAbonos().subscribe((abonos: AbonoCliente[]) => {
      this.abonos = abonos.map((a) => ({
        ...a,
        fechaInicio: a.fechaInicio instanceof Date ? a.fechaInicio : (a.fechaInicio as Timestamp).toDate(),
        fechaFijacionPrecioHasta: a.fechaFijacionPrecioHasta
          ? a.fechaFijacionPrecioHasta instanceof Date
            ? a.fechaFijacionPrecioHasta
            : (a.fechaFijacionPrecioHasta as Timestamp).toDate()
          : undefined
      }));
    });
  }

  cargarAbonosGenerales() {
    this.abonoService.obtenerAbonosGenerales().subscribe((abonos: AbonoGeneral[]) => {
      this.abonosGenerales = abonos;
    });
  }
}