import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaProductosComponent } from './views/lista-productos/lista-productos.component';
import { AltaProductosComponent } from './views/alta-productos/alta-productos.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ListaProductosComponent,
    AltaProductosComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ProductosModule { }
