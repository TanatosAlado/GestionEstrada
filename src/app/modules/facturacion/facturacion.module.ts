import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturasListaComponent } from './views/facturas-lista/facturas-lista.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    FacturasListaComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class FacturacionModule { }
