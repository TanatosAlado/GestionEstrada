import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service'; 
import { AltaUsuariosComponent } from '../alta-usuarios/alta-usuarios.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent {

 usuarios: any[] = [];
  displayedColumns: string[] = ['email', 'accesos', 'acciones'];

  constructor(private usuariosService: UsuariosService, private dialog: MatDialog) {}

  ngOnInit() {
    this.usuariosService.obtenerUsuarios().subscribe(data => {
      this.usuarios = data;
    });
  }

    abrirAltaUsuario() {
    const dialogRef = this.dialog.open(AltaUsuariosComponent, {
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      // Opcional: refrescar la lista de usuarios si se creó uno nuevo
      // this.cargarUsuarios();
    });
  }


  editarUsuario(usuario: any) {
    // Lógica para abrir formulario con datos
  }

  eliminarUsuario(usuario: any) {
    // Confirmación y delete lógico
  }
}