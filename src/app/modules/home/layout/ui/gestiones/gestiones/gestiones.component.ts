import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestiones',
  templateUrl: './gestiones.component.html',
  styleUrls: ['./gestiones.component.css']
})
export class GestionesComponent {

    gestiones = [
    {
      titulo: 'Clientes',
      descripcion: 'Gestión de clientes',
      icono: 'fas fa-users',
      ruta: '/gestiones/clientes',
    },
    {
      titulo: 'Carga',
      descripcion: 'Gestión de cargas',
      icono: 'fa-solid fa-truck',
      ruta: '/gestiones/carga',
    },
    {
      titulo: 'Pagos',
      descripcion: 'Gestión de pagos',
      icono: 'fa-solid fa-comment-dollar',
      ruta: '/gestiones/pagos',
    },
    {
      titulo: 'Produccion',
      descripcion: 'Gestión de producciones',
      icono: 'fa-regular fa-square-plus',
      ruta: '/gestiones/produccion',
    },
        {
      titulo: 'Remitos',
      descripcion: 'Gestión de remitos',
      icono: 'fa-solid fa-list',
      ruta: '/gestiones/remitos',
    },
  ];

  constructor(private router: Router) { }

  irAGestion(ruta: string) {
    this.router.navigate(['/gestiones', ruta]);
  }

}
