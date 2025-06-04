import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemitosListaComponent } from './views/remitos-lista/remitos-lista.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    RemitosListaComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class RemitosModule { }
