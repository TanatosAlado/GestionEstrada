import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaStockComponent } from './views/lista-stock/lista-stock.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ListaStockComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class StockModule { }
