import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {

  public clienteAEliminar: string = ''; 
  displayedColumns: string[] = ['nombre', 'apellido', 'razonSocial', 'estado', 'acciones'];
  totalClientes = 0;
  dataSource = new MatTableDataSource<any>([]);

  constructor(private dialog: MatDialog){
    
  }

    abrirRegistro(){
  
  }

    verCliente(cliente: any): void {
    // this.dialog.open(ClienteDetalleComponent, {
    //   width: '500px',
    //   data: cliente
    // });
  }

    openConfirmDialog(cliente: any): void {
    // this.clienteAEliminar = cliente.id;
    // const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    //   width: '400px',
    //   data: {
    //     message: `¿Está seguro que desea eliminar este cliente: ${cliente.nombre}?`,
    //     confirmAction: () => this.eliminarCliente() // Acción a ejecutar si se confirma
    //   }
    // });
  }

    eliminarCliente(): void {
    console.log('Eliminar', this.clienteAEliminar);
    // LLAMAR AL SERVICIO, SUSCRIBIRSE E INFIRMAR AL USUARIO
  }

    editarCliente(cliente: any): void {
    // const dialogRef = this.dialog.open(ClienteEditarComponent, {
    //   width: '500px',
    //   maxHeight: '90vh', 
    //   data: cliente
    // });
  
    // dialogRef.afterClosed().subscribe(resultado => {
    //   if (resultado) {
       
    //     console.log('Datos actualizados:', resultado);
    //     this.clientesService.actualizarCliente(resultado.id, resultado)
    //     .then(() => {
    //       console.log('Cliente actualizado correctamente en Firebase');
    //       this.loadClientes();
    //     })
    //     .catch(error => {
    //       console.error('Error al actualizar el cliente:', error);
    //     });
    //   }
    // });
  }


  onPageChange(event: PageEvent) {
    // if (event.pageIndex > event.previousPageIndex!) {
    //   // Avanzando
    //   this.loadClientes(this.clientesService.ultimoCliente);
    // } else {
    //   // Retrocediendo aún no implementado (hay que hacer una pila si querés)
    //   console.log('Retroceder no implementado aún');
    // }
  }

    loadTotalClientes(): void {
    // this.clientesService.getClientesCount().subscribe(total => {
    //   this.totalClientes = total;
    // });
  }

}
