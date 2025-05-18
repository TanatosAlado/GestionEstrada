import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/views/login/login.component';
import { LayoutHomeComponent } from './modules/home/layout/layout-home/layout-home.component';
import { GestionesComponent } from './modules/home/layout/ui/gestiones/gestiones/gestiones.component';
import { CargaComponent } from './modules/home/layout/ui/carga/carga/carga.component';
import { ClientesComponent } from './modules/home/layout/ui/clientes/clientes/clientes.component';
import { PagosComponent } from './modules/home/layout/ui/pagos/pagos/pagos.component';
import { ProduccionComponent } from './modules/home/layout/ui/produccion/produccion/produccion.component';
import { RemitosComponent } from './modules/home/layout/ui/remitos/remitos/remitos.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'prefix' },
  { path: 'inicio', component: LoginComponent,
    //canActivate: [AuthGuard],
  },
    {
    path: 'gestiones',
    component: LayoutHomeComponent,
    //canActivate: [AdminGuard],
    children: [
      { path: '', component: GestionesComponent }, 
      { path: 'carga', component: CargaComponent },
      { path: 'clientes', component: ClientesComponent },
      { path: 'pagos', component: PagosComponent },
      { path: 'produccion', component: ProduccionComponent },
      { path: 'remitos', component: RemitosComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
