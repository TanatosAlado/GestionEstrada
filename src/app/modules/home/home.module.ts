import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutHomeComponent } from './layout/layout-home/layout-home.component';
import { CargaComponent } from './layout/ui/carga/carga/carga.component';
import { ClientesComponent } from './layout/ui/clientes/clientes/clientes.component';
import { PagosComponent } from './layout/ui/pagos/pagos/pagos.component';
import { ProduccionComponent } from './layout/ui/produccion/produccion/produccion.component';
import { RemitosComponent } from './layout/ui/remitos/remitos/remitos.component';
import { GestionesComponent } from './layout/ui/gestiones/gestiones/gestiones.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EncabezadoComponent } from './layout/ui/encabezado/encabezado/encabezado.component';



@NgModule({
  declarations: [
    LayoutHomeComponent,
    CargaComponent,
    ClientesComponent,
    PagosComponent,
    ProduccionComponent,
    RemitosComponent,
    GestionesComponent,
    EncabezadoComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class HomeModule { }
