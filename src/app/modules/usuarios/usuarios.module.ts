import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaUsuariosComponent } from './views/lista-usuarios/lista-usuarios.component';
import { AltaUsuariosComponent } from './views/alta-usuarios/alta-usuarios.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ListaUsuariosComponent,
    AltaUsuariosComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class UsuariosModule { }
