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
      ruta: '/clientes',
    },
    {
      titulo: 'Carga',
      descripcion: 'Gestión de cargas',
      icono: 'fa-solid fa-truck',
      ruta: '/cargas',
    },
    {
      titulo: 'Pagos',
      descripcion: 'Gestión de pagos',
      icono: 'fa-solid fa-comment-dollar',
      ruta: '/pagos',
    },
    {
      titulo: 'Produccion',
      descripcion: 'Gestión de producciones',
      icono: 'fa-regular fa-square-plus',
      ruta: '/produccion',
    },
    {
      titulo: 'Remitos',
      descripcion: 'Gestión de remitos',
      icono: 'fa-solid fa-list',
      ruta: '/remitos',
    },
    {
      titulo: 'Stock',
      descripcion: 'Gestión de stock',
      icono: 'fa-solid fa-warehouse',
      ruta: '/stock',
    },
    {
      titulo: 'Repartidores',
      descripcion: 'Gestión de repartidores',
      icono: 'fa-solid fa-user-gear',
      ruta: '/repartidores',
    },
    {
      titulo: 'Productos',
      descripcion: 'Gestión de productos',
      icono: 'fa-solid fa-cubes',
      ruta: '/productos',
    },
    {
      titulo: 'Abonos',
      descripcion: 'Gestión de abonos',
      icono: 'fa-solid fa-envelope-open-text',
      ruta: '/abonos',
    }
  ];

  constructor(private router: Router) { }

  irAGestion(ruta: string) {
    this.router.navigate(['/gestiones', ruta]);
  }

}
