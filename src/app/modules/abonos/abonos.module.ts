import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AltaAbonoComponent } from './views/alta-abono/alta-abono.component';
import { ListaAbonoComponent } from './views/lista-abono/lista-abono.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    AltaAbonoComponent,
    ListaAbonoComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AbonosModule { }
