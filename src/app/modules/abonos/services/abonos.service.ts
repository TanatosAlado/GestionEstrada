import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Abono } from '../models/abono.model';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AbonosService {

  private abonosRef = collection(this.firestore, 'Abonos');

  constructor(private firestore: Firestore) {}

  crearAbono(abono: Abono): Promise<void> {
    const id = doc(this.abonosRef).id;
    return setDoc(doc(this.firestore, 'Abonos', id), { ...abono, id });
  }

  obtenerAbonos(): Observable<Abono[]> {
    return collectionData(this.abonosRef, { idField: 'id' }) as Observable<Abono[]>;
  }

  actualizarAbono(id: string, abono: Partial<Abono>): Promise<void> {
    const abonoDoc = doc(this.firestore, 'Abonos', id);
    return updateDoc(abonoDoc, abono);
  }
}
