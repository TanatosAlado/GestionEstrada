import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AltaProduccionComponent } from './views/alta-produccion/alta-produccion.component';
import { ListaProduccionComponent } from './views/lista-produccion/lista-produccion.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    AltaProduccionComponent,
    ListaProduccionComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    AltaProduccionComponent,
    ListaProduccionComponent,
  ],
})
export class ProduccionModule { }
