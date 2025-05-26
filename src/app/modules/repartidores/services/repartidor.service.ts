import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, doc as firestoreDoc, setDoc, collection as col } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Repartidor } from '../models/repartidor.model';
@Injectable({
  providedIn: 'root'
})
export class RepartidorService {


  constructor(private firestore: Firestore) { }

  obtenerRepartidores(): Observable<Repartidor[]> {
    const ref = collection(this.firestore, 'Repartidores');
    return from(getDocs(ref)).pipe(
      map(snapshot => snapshot.docs.map(doc => {
        const data = doc.data() as Repartidor;
        return new Repartidor(Object.assign({ id: doc.id }, data));
      }))
    );
  }

  agregarRepartidor(repartidor: Repartidor): Promise<void> {
    const colRef = col(this.firestore, 'Repartidores');
    const newDocRef = firestoreDoc(colRef);
    repartidor.id = newDocRef.id;
    repartidor.stock = repartidor.stock || [];

    // Creamos un objeto plano a partir de la instancia:
    const repartidorParaGuardar = { ...repartidor };

    return setDoc(newDocRef, repartidorParaGuardar);
  }


}
