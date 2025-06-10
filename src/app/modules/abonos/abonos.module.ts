import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AltaAbonoComponent } from './views/alta-abono/alta-abono.component';
import { ListaAbonosComponent } from './views/lista-abono/lista-abono.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { VerAbonosComponent } from './views/ver-abonos/ver-abonos.component';
import { EditarAbonoComponent } from './views/editar-abono/editar-abono.component';



@NgModule({
  declarations: [
    AltaAbonoComponent,
    ListaAbonosComponent,
    VerAbonosComponent,
    EditarAbonoComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AbonosModule { }
