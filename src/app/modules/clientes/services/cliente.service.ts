import { collection, getDocs, collection as col, doc as firestoreDoc } from 'firebase/firestore';
import { Cliente } from '../models/cliente.model';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Firestore, doc, setDoc, updateDoc } from '@angular/fire/firestore';


@Injectable({ providedIn: 'root' })
export class ClienteService {


  constructor(private firestore: Firestore) { }

  obtenerClientes(): Observable<Cliente[]> {
    const ref = collection(this.firestore, 'Clientes');
    return from(getDocs(ref)).pipe(
      map(snapshot => snapshot.docs.map(doc => {
        const data = doc.data() as Cliente;
        return new Cliente(Object.assign({ id: doc.id }, data));
      }))
    );
  }

  agregarCliente(cliente: Cliente): Promise<void> {
    const colRef = col(this.firestore, 'Clientes');
    const newDocRef = firestoreDoc(colRef);
    cliente.id = newDocRef.id;
    return setDoc(newDocRef, cliente);
  }

  actualizarCliente(cliente: Cliente): Promise<void> {
    const clienteDocRef = doc(this.firestore, 'Clientes', cliente.id); // 👈 nota el uso correcto aquí
    return updateDoc(clienteDocRef, { ...cliente });
  }

  getRefClientePorId(id: string) {
    return doc(this.firestore, 'Clientes', id);
  }

}
