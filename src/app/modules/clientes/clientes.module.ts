import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AltaClienteComponent } from './views/alta-cliente/alta-cliente.component';
import { ListaClienteComponent } from './views/lista-cliente/lista-cliente.component';



@NgModule({
  declarations: [
    AltaClienteComponent,
    ListaClienteComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ClientesModule { }
