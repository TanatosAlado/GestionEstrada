import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturasListaComponent } from './views/facturas-lista/facturas-lista.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FacturaDetalleComponent } from './views/factura-detalle/factura-detalle.component';



@NgModule({
  declarations: [
    FacturasListaComponent,
    FacturaDetalleComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class FacturacionModule { }
