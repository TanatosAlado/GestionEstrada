import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { Produccion } from '../models/produccion.model';
import { collectionData } from '@angular/fire/firestore';
import { addDoc, collection as col, doc as firestoreDoc, Timestamp } from 'firebase/firestore';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProduccionService {
  constructor(private firestore: Firestore) {}

  crearProduccion(data: Produccion): Promise<void> {
    const colRef = col(this.firestore, 'Producciones');
    const newDocRef = firestoreDoc(colRef);
    data.id = newDocRef.id;
    return setDoc(newDocRef, data);
  }

  obtenerProducciones() {
    const colRef = col(this.firestore, 'Producciones');
    return collectionData(colRef, { idField: 'id' });
  }

obtenerTodas(): Observable<Produccion[]> {
  const ref = collection(this.firestore, 'Producciones');
  return collectionData(ref, { idField: 'id' }).pipe(
    map((docs) =>
      docs.map((doc) => {
        return {
          id: doc['id'],
          fecha: (doc['fecha'] as Timestamp).toDate(),
          operador: doc['operador'],
          detalle: doc['detalle']
        } as Produccion;
      })
    )
  );
}

}
