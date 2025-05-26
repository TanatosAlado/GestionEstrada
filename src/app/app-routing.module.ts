import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/views/login/login.component';
import { LayoutHomeComponent } from './modules/home/layout-home/layout-home.component';
import { GestionesComponent } from './modules/home/ui/gestiones/gestiones.component';

import { AltaProduccionComponent } from './modules/produccion/views/alta-produccion/alta-produccion.component';
import { ListaProduccionComponent } from './modules/produccion/views/lista-produccion/lista-produccion.component';
import { DetalleProduccionComponent } from './modules/produccion/views/detalle-produccion/detalle-produccion.component';
import { ListaStockComponent } from './modules/stock/views/lista-stock/lista-stock.component';

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
  }
  // Eliminé esta línea para evitar conflicto:
  // { path: 'produccion', component: ProduccionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
