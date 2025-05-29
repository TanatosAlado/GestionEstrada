import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/views/login/login.component';
import { LayoutHomeComponent } from './modules/home/layout-home/layout-home.component';
import { GestionesComponent } from './modules/home/ui/gestiones/gestiones.component';

import { AltaProduccionComponent } from './modules/produccion/views/alta-produccion/alta-produccion.component';
import { ListaProduccionComponent } from './modules/produccion/views/lista-produccion/lista-produccion.component';
import { DetalleProduccionComponent } from './modules/produccion/views/detalle-produccion/detalle-produccion.component';
import { ListaStockComponent } from './modules/stock/views/lista-stock/lista-stock.component';
import { ListaClienteComponent } from './modules/clientes/views/lista-cliente/lista-cliente.component';
import { AltaClienteComponent } from './modules/clientes/views/alta-cliente/alta-cliente.component';
import { ListaCargaComponent } from './modules/cargas/views/lista-carga/lista-carga.component';
import { ListaRepartidoresComponent } from './modules/repartidores/views/lista-repartidores/lista-repartidores.component';
import { ListaProductosComponent } from './modules/productos/views/lista-productos/lista-productos.component';
import { ListaAbonoComponent } from './modules/abonos/views/lista-abono/lista-abono.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' }, // cambio de prefix a full
  { path: 'inicio', component: LoginComponent },
  {
    path: 'gestiones',
    component: LayoutHomeComponent,
    children: [
      { path: '', component: GestionesComponent },
    ]
  },
  {
    path: 'produccion',
    component: ListaProduccionComponent,
    children: [
      { path: 'lista', component: ListaProduccionComponent },
      { path: 'alta', component: AltaProduccionComponent },
      { path: 'detalle/:id', component: DetalleProduccionComponent }
    ]
  },
  {
    path: 'stock',
    component: ListaStockComponent,
    children: [
      { path: 'listaStock', component: ListaStockComponent },
    ]
  },
  {
    path: 'clientes',
    component: ListaClienteComponent,
    children: [
      { path: 'altaC', component: AltaClienteComponent },
    ]
  },
  {
    path: 'cargas',
    component: ListaCargaComponent,
    children: [
      { path: 'altaCarga', component: ListaCargaComponent },
    ]
  },
  {
    path: 'repartidores',
    component: ListaRepartidoresComponent,
    children: [
      { path: 'listaR', component: ListaRepartidoresComponent },
    ]
  },
    {
    path: 'productos',
    component: ListaProductosComponent,
    children: [
      { path: 'listaP', component: ListaProductosComponent },
    ]
  },
    {
    path: 'abonos',
    component: ListaAbonoComponent,
    children: [
      { path: 'listaP', component: ListaAbonoComponent },
    ]
  },
]  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
