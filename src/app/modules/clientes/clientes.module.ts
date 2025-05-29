import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AltaClienteComponent } from './views/alta-cliente/alta-cliente.component';
import { ListaClienteComponent } from './views/lista-cliente/lista-cliente.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AsignarAbonoComponent } from './views/asignar-abono/asignar-abono.component';



@NgModule({
  declarations: [
    AltaClienteComponent,
    ListaClienteComponent,
    AsignarAbonoComponent
  ],
  imports: [
    CommonModule,
    SharedModule // Asegúrate de importar SharedModule si es necesario
  ]
})
export class ClientesModule { }
