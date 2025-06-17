import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/views/login/login.component';
import { LayoutHomeComponent } from './modules/home/layout-home/layout-home.component';
import { GestionesComponent } from './modules/home/ui/gestiones/gestiones.component';

import { AltaProduccionComponent } from './modules/produccion/views/alta-produccion/alta-produccion.component';
import { ListaProduccionComponent } from './modules/produccion/views/lista-produccion/lista-produccion.component';
import { ListaStockComponent } from './modules/stock/views/lista-stock/lista-stock.component';
import { ListaClienteComponent } from './modules/clientes/views/lista-cliente/lista-cliente.component';
import { AltaClienteComponent } from './modules/clientes/views/alta-cliente/alta-cliente.component';
import { ListaCargaComponent } from './modules/cargas/views/lista-carga/lista-carga.component';
import { ListaRepartidoresComponent } from './modules/repartidores/views/lista-repartidores/lista-repartidores.component';
import { ListaProductosComponent } from './modules/productos/views/lista-productos/lista-productos.component';
import { ListaAbonosComponent } from './modules/abonos/views/lista-abono/lista-abono.component';
import { RemitosListaComponent } from './modules/remitos/views/remitos-lista/remitos-lista.component';
import { FacturasListaComponent } from './modules/facturacion/views/facturas-lista/facturas-lista.component';
import { ListaPagosComponent } from './modules/pagos/views/lista-pagos/lista-pagos.component';
import { ListaUsuariosComponent } from './modules/usuarios/views/lista-usuarios/lista-usuarios.component';

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
    component: ListaAbonosComponent,
    children: [
      { path: 'listaP', component: ListaAbonosComponent },
    ]
  },
    {
    path: 'remitos',
    component: RemitosListaComponent,
    children: [
      { path: 'listaR', component: RemitosListaComponent },
    ]
  },
  {
    path: 'facturas',
    component: FacturasListaComponent,
    children: [
      { path: 'listaF', component: FacturasListaComponent },
    ]
  },
    {
    path: 'pagos',
    component: ListaPagosComponent,
    children: [
      { path: 'listaP', component: ListaPagosComponent },
    ]
  },
      {
    path: 'usuarios',
    component: ListaUsuariosComponent,
    children: [
      { path: 'listaU', component: ListaUsuariosComponent },
    ]
  },
]  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
