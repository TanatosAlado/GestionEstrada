import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module'; 
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './modules/home/home.module';
import { ProduccionModule } from './modules/produccion/produccion.module';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app'; // API modular
import { provideAuth, getAuth } from '@angular/fire/auth'; // Para Auth (si lo usas)
import { provideFirestore, getFirestore } from '@angular/fire/firestore'; // Para Firestore (si lo usas)
import { environment } from 'src/environment/environment';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StockModule } from './modules/stock/stock.module';
import { ClientesModule } from './modules/clientes/clientes.module';
import { RepartidoresModule } from './modules/repartidores/repartidores.module';
import { ProductosModule } from './modules/productos/productos.module';
import { AbonosModule } from './modules/abonos/abonos.module';
import { CargasModule } from './modules/cargas/cargas.module';
import { RemitosModule } from './modules/remitos/remitos.module';
import { FacturacionModule } from './modules/facturacion/facturacion.module';
import { PagosModule } from './modules/pagos/pagos.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    SharedModule,
    HomeModule,
    ProduccionModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()), // Solo si usas Firestore
    BrowserAnimationsModule,
    StockModule,
    ClientesModule,
    RepartidoresModule,
    ProductosModule,
    AbonosModule,
    CargasModule,
    RemitosModule,
    FacturacionModule,
    PagosModule,
    UsuariosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
