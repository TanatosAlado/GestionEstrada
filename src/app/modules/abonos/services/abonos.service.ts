import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { AbonoCliente } from '../models/abonoCliente.model';
import { collection as col, DocumentReference, doc as firestoreDoc, getDocs, query, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AbonosService {

  private abonosRef = collection(this.firestore, 'Abonos');

  constructor(private firestore: Firestore) { }

  crearAbono(abono: AbonoCliente): Promise<DocumentReference> {
    const colRef = col(this.firestore, 'Abonos');
    const newDocRef = firestoreDoc(colRef);
    abono.id = newDocRef.id;
    return setDoc(newDocRef, abono).then(() => newDocRef); // 👈 devolvés la referencia
  }


  obtenerAbonos(): Observable<AbonoCliente[]> {
    const ref = collection(this.firestore, 'Abonos');
    return from(getDocs(ref)).pipe(
      map((snapshot) =>
        snapshot.docs.map((doc) => {
          const data = doc.data() as AbonoCliente;
          return { ...data, id: doc.id };
        })
      )
    );
  }



  actualizarAbono(id: string, abono: Partial<AbonoCliente>): Promise<void> {
    const abonoDoc = doc(this.firestore, 'Abonos', id);
    return updateDoc(abonoDoc, abono);
  }

  obtenerAbonosPorCliente(clienteId: string) {
    const abonosQuery = query(this.abonosRef, where('clienteId', '==', clienteId));
    return from(getDocs(abonosQuery)).pipe(
      map(snapshot => snapshot.docs.map(doc => doc.data() as AbonoCliente))
    );
  }

  eliminarAbono(id: string): Promise<void> {
    const abonoDoc = doc(this.firestore, 'Abonos', id);
    return deleteDoc(abonoDoc);
  }


}
