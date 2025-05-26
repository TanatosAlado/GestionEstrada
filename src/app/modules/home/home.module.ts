import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutHomeComponent } from './layout-home/layout-home.component';
import { GestionesComponent } from './ui/gestiones/gestiones.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EncabezadoComponent } from './ui/encabezado/encabezado.component';



@NgModule({
  declarations: [
    LayoutHomeComponent,
    GestionesComponent,
    EncabezadoComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class HomeModule { }
