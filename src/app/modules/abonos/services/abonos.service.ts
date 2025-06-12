import { Injectable } from '@angular/core';
import { firstValueFrom, from, map, Observable, of, switchMap } from 'rxjs';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { AbonoCliente } from '../models/abonoCliente.model';
import { collection as col, DocumentReference, doc as firestoreDoc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { AbonoGeneral } from '../models/abonoGeneral.model';

@Injectable({
  providedIn: 'root'
})
export class AbonosService {

  private abonosRef = collection(this.firestore, 'Abonos');
  private abonosGeneralesCollection = collection(this.firestore, 'AbonosGenerales');
  private abonosClientesRef = collection(this.firestore, 'abonosClientes');


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

obtenerAbonoGeneralAsignado(clienteId: string) {
  console.log('Buscando abono general para cliente:', clienteId);
  const q = query(collection(this.firestore, 'clienteAbonosGenerales'), where('clienteId', '==', clienteId));
  return from(getDocs(q)).pipe(
    switchMap(snapshot => {
      console.log('Snapshot docs count:', snapshot.size);
      if (snapshot.empty) {
        console.log('No se encontró asignación de abono general para cliente:', clienteId);
        return of(null);
      }

      const data = snapshot.docs[0].data();
      console.log('Documento encontrado:', data);

      const abonoGeneralId = data['abonoGeneralId'];
      const fechaAsignacion = data['fechaAsignacion'];
      const abonoGeneralDoc = doc(this.firestore, `AbonosGenerales/${abonoGeneralId}`);
      return from(getDoc(abonoGeneralDoc)).pipe(
        map(generalSnap => {
          if (!generalSnap.exists()) {
            console.log('No existe el abono general con id:', abonoGeneralId);
            return null;
          }
          console.log('Abono general encontrado:', generalSnap.data());
          return {
            ...(generalSnap.data() as AbonoGeneral),
            id: generalSnap.id,
            fechaAsignacion
          };
        })
      );
    })
  );
}

eliminarAsignacionAbonoGeneral(clienteId: string): Promise<void> {
  const q = query(
    collection(this.firestore, 'clienteAbonosGenerales'),
    where('clienteId', '==', clienteId)
  );

  return getDocs(q).then(snapshot => {
    if (snapshot.empty) return Promise.resolve();


    const docId = snapshot.docs[0].id;
    const docRef = doc(this.firestore, 'clienteAbonosGenerales', docId);
    return deleteDoc(docRef);
  });
}



  eliminarAbono(id: string): Promise<void> {
    const abonoDoc = doc(this.firestore, 'Abonos', id);
    return deleteDoc(abonoDoc);
  }


  crearAbonoGeneral(abono: AbonoGeneral): Promise<DocumentReference> {
  const colRef = col(this.firestore, 'AbonosGenerales');
  const newDocRef = firestoreDoc(colRef);
  abono.id = newDocRef.id;
  return setDoc(newDocRef, abono).then(() => newDocRef);
}

obtenerAbonosGenerales(): Observable<AbonoGeneral[]> {
  return collectionData(this.abonosGeneralesCollection, { idField: 'id' }) as Observable<AbonoGeneral[]>;
}

async asignarAbonoGeneralACliente(clienteId: string, abonoGeneralId: string): Promise<void> {
  const ref = collection(this.firestore, 'clienteAbonosGenerales');

  // Eliminar asignaciones previas
  const existentes = await getDocs(query(ref, where('clienteId', '==', clienteId)));
  for (const docu of existentes.docs) {
    await deleteDoc(docu.ref);
  }

  // Crear nueva asignación
  const nuevoDocRef = await addDoc(ref, {
    clienteId,
    abonoGeneralId,
    fechaAsignacion: new Date()
  });

  // Actualizar el mismo documento con su ID (en campo `id`)
  const docRef = doc(this.firestore, 'clienteAbonosGenerales', nuevoDocRef.id);
  await updateDoc(docRef, { id: nuevoDocRef.id });
}

  async obtenerAbonoActivoPorCliente(clienteId: string): Promise<AbonoCliente | null> {
    const snapshot = await getDocs(
      query(this.abonosClientesRef, where('clienteId', '==', clienteId), where('activo', '==', true))
    );

    const abonos = snapshot.docs.map(doc => doc.data() as AbonoCliente);
    return abonos.length > 0 ? abonos[0] : null;
  }

  async obtenerAbonoClientePorId(id: string): Promise<AbonoCliente> {
    const docRef = doc(this.firestore, 'Abonos', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { ...(docSnap.data() as AbonoCliente), id: docSnap.id };
    } else {
      throw new Error('AbonoCliente no encontrado');
    }
  }


}
