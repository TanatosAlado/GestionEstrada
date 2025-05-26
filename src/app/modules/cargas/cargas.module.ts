import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AltaCargaComponent } from './views/alta-carga/alta-carga.component';
import { ListaCargaComponent } from './views/lista-carga/lista-carga.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    AltaCargaComponent,
    ListaCargaComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CargasModule { }
