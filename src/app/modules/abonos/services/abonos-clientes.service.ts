import { inject, Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, addDoc, updateDoc, deleteDoc, docData, setDoc, query, where } from '@angular/fire/firestore';
import { AbonoCliente } from '../models/abonoCliente.model'; 
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AbonosClientesService {

  private abonosClientesRef = collection(this.firestore, 'abonosClientes');

  constructor(private firestore: Firestore) {}

  crearAsignacion(asignacion: AbonoCliente): Promise<void> {
    const id = doc(this.abonosClientesRef).id; // Generar un nuevo ID
    return setDoc(doc(this.firestore, 'abonosClientes', id), { ...asignacion, id });
  }

obtenerAsignacionesPorCliente(clienteId: string): Observable<AbonoCliente[]> {
  const abonosClienteQuery = query(
    this.abonosClientesRef,
    where('clienteId', '==', clienteId)
  );
  return collectionData(abonosClienteQuery, { idField: 'id' }) as Observable<AbonoCliente[]>;
}

  actualizarAsignacion(id: string, datos: Partial<AbonoCliente>): Promise<void> {
    const ref = doc(this.firestore, `abonosClientes/${id}`);
    return updateDoc(ref, datos);
  }

  eliminarAsignacion(id: string): Promise<void> {
    const ref = doc(this.firestore, `abonosClientes/${id}`);
    return deleteDoc(ref);
  }

  obtenerAsignacionPorId(id: string): Observable<AbonoCliente> {
    const ref = doc(this.firestore, `abonosClientes/${id}`);
    return docData(ref, { idField: 'id' }) as Observable<AbonoCliente>;
  }

    crearAbono(abono: AbonoCliente): Promise<void> {
      const id = doc(this.abonosClientesRef).id;
      return setDoc(doc(this.firestore, 'Abonos', id), { ...abono, id });
    }
}
