import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemitosListaComponent } from './views/remitos-lista/remitos-lista.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetalleRemitoComponent } from './views/detalle-remito/detalle-remito.component';



@NgModule({
  declarations: [
    RemitosListaComponent,
    DetalleRemitoComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class RemitosModule { }
