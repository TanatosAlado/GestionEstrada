import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaRepartidoresComponent } from './views/lista-repartidores/lista-repartidores.component';
import { AltaRepartidorComponent } from './views/alta-repartidor/alta-repartidor.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ListaRepartidoresComponent,
    AltaRepartidorComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class RepartidoresModule { }
