import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AltaProduccionComponent } from './views/alta-produccion/alta-produccion.component';
import { ListaProduccionComponent } from './views/lista-produccion/lista-produccion.component';
import { DetalleProduccionComponent } from './views/detalle-produccion/detalle-produccion.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    AltaProduccionComponent,
    ListaProduccionComponent,
    DetalleProduccionComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    AltaProduccionComponent,
    ListaProduccionComponent,
    DetalleProduccionComponent
  ],
})
export class ProduccionModule { }
