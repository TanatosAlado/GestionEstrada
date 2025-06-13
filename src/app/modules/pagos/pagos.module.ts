import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaPagosComponent } from './views/lista-pagos/lista-pagos.component';
import { AltaPagosComponent } from './views/alta-pagos/alta-pagos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PagoDetalleComponent } from './views/pago-detalle/pago-detalle.component';



@NgModule({
  declarations: [
    ListaPagosComponent,
    AltaPagosComponent,
    PagoDetalleComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class PagosModule { }
