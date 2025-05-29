import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cliente } from '../../models/cliente.model';
import { AbonosService } from 'src/app/modules/abonos/services/abonos.service';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-asignar-abono',
  templateUrl: './asignar-abono.component.html',
  styleUrls: ['./asignar-abono.component.css']
})
export class AsignarAbonoComponent implements OnInit {
  cliente: Cliente;
  abonosDisponibles: any[] = [];
  abonoSeleccionadoId: string = '';
  fechaInicio: Date = new Date();
  entregarDispenser: boolean = true;

  constructor(
    private abonoService: AbonosService,
    private clienteService: ClienteService,
    private dialogRef: MatDialogRef<AsignarAbonoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cliente: Cliente }
  ) {
    this.cliente = data.cliente;
  }

  ngOnInit(): void {
    this.abonoService.obtenerAbonos().subscribe(abonos => {
      this.abonosDisponibles = abonos;
    });
  }

  asignarAbono() {
    const clienteActualizado = { ...this.cliente };

    // Para empresa, podrías tener lógica para múltiples abonos
    if (!clienteActualizado.abonos) {
      clienteActualizado.abonos = [];
    }

    clienteActualizado.abonos.push({
      abonoId: this.abonoSeleccionadoId,
      fechaInicio: this.fechaInicio
    });
    clienteActualizado.tieneDispenser = this.entregarDispenser;

    this.clienteService.actualizarCliente(clienteActualizado).then(() => {
      this.dialogRef.close(true);
    });
  }

  cancelar() {
    this.dialogRef.close();
  }
}
