// asignar-abono-general.component.ts

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbonosClientesService } from '../../services/abonos-clientes.service'; 
import { AbonoGeneral } from '../../models/abonoGeneral.model'; 
import { Cliente } from 'src/app/modules/clientes/models/cliente.model'; 
import { AbonosService } from '../../services/abonos.service';

@Component({
  selector: 'app-asignar-abono-general',
  templateUrl: './asignar-abono-general.component.html',
  styleUrls: ['./asignar-abono-general.component.css']
})
export class AsignarAbonoGeneralComponent implements OnInit {
  cliente: Cliente;
  abonosGenerales: AbonoGeneral[] = [];
  abonoSeleccionado?: AbonoGeneral;

  cargando = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { cliente: Cliente },
    private dialogRef: MatDialogRef<AsignarAbonoGeneralComponent>,
    private abonosService: AbonosService
  ) {
    this.cliente = data.cliente;
  }

  ngOnInit(): void {
    this.cargarAbonosGenerales();
  }

  cargarAbonosGenerales() {
    this.cargando = true;
    this.abonosService.obtenerAbonosGenerales().subscribe({
      next: (abonos) => {
        this.abonosGenerales = abonos;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        alert('Error cargando abonos generales');
      }
    });
  }

  asignarAbono() {
    if (!this.abonoSeleccionado) {
      alert('Por favor seleccioná un abono general');
      return;
    }
    this.cargando = true;
    this.abonosService.asignarAbonoGeneralACliente(this.cliente.id, this.abonoSeleccionado.id)
      .then(() => {
        this.cargando = false;
        this.dialogRef.close(true);
      })
      .catch(() => {
        this.cargando = false;
        alert('Error al asignar el abono general');
      });
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}
