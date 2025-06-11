import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';
import { MatDialog } from '@angular/material/dialog';
import { AltaClienteComponent } from '../alta-cliente/alta-cliente.component';
import { AltaAbonoComponent } from 'src/app/modules/abonos/views/alta-abono/alta-abono.component';
import { VerAbonosComponent } from 'src/app/modules/abonos/views/ver-abonos/ver-abonos.component';
import { AsignarAbonoGeneralComponent } from 'src/app/modules/abonos/views/asignar-abono-general/asignar-abono-general.component';

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.css']
})
export class ListaClienteComponent {
  clientes: Cliente[] = [];

  displayedColumns: string[] = ['nombreRazon', 'tipo', 'telefono', 'abonos', 'acciones'];


  constructor(private clienteService: ClienteService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes() {
    this.clienteService.obtenerClientes().subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  abrirAltaCliente() {
    const dialogRef = this.dialog.open(AltaClienteComponent, {
      width: '600px',
      maxHeight: '90vh', // ocupa hasta el 90% del alto visible
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarClientes(); // Recargar la lista si se agregó un cliente
      }
    });
  }

  editarCliente(cliente: Cliente) {
    // Abrir modal o navegar a la pantalla de edición, pasando el cliente seleccionado
    console.log('Editar cliente', cliente);
    // Aquí pondrías tu lógica para editar
  }

  eliminarCliente(cliente: Cliente) {
    // Confirmar y eliminar cliente
    if (confirm(`¿Querés eliminar al cliente ${cliente.nombre || cliente.razonSocial}?`)) {
      console.log('Eliminar cliente', cliente);
      // Aquí pondrías la lógica para eliminar
    }
  }

  abrirAsignarAbono(cliente: Cliente) {
  const dialogRef = this.dialog.open(AltaAbonoComponent, {
    width: '500px',
    data: { cliente }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.cargarClientes(); // refrescar listado si se asignó un abono
    }
  });
}

verAbonos(cliente: Cliente) {
  this.dialog.open(VerAbonosComponent, {
    width: '900px',
    data: { clienteId: cliente.id }
  });
}

  abrirAsignarAbonoGeneral(cliente: Cliente) {
    const dialogRef = this.dialog.open(AsignarAbonoGeneralComponent, {
      width: '500px',
      data: { cliente }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarClientes();
      }
    });
  }

}