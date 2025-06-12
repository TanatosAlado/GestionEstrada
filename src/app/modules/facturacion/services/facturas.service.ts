import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collection, addDoc, updateDoc, doc, getFirestore, collectionData, getDocs } from '@angular/fire/firestore';
import { AbonoCliente } from '../../abonos/models/abonoCliente.model';
import { AbonoGeneral } from '../../abonos/models/abonoGeneral.model';
import { Producto } from '../../productos/models/producto.model';


@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  private db = getFirestore();

  constructor(private firestore: Firestore) {}


  crearFactura(factura: any): Promise<void> {
    const facturasRef = collection(this.db, 'Facturas');

    return addDoc(facturasRef, factura).then(docRef => {
      // Agregar el ID generado como propiedad en el documento
      return updateDoc(doc(this.db, 'Facturas', docRef.id), {
        id: docRef.id
      });
    });
  }

  obtenerFacturas(): Observable<any[]> {
    const facturasRef = collection(this.firestore, 'Facturas');
    return collectionData(facturasRef, { idField: 'id' }) as Observable<any[]>;
  }
  

async obtenerAbonoClienteActivo(clienteId: string): Promise<AbonoCliente | null> {
  const ref = collection(this.firestore, 'clienteAbonosGenerales');
  const snapshot = await getDocs(ref);
  const abonos = snapshot.docs.map(d => d.data() as AbonoCliente);
  return abonos.find(a => a.clienteId === clienteId && a.activo) || null;
}

async obtenerAbonoGeneralActivo(): Promise<AbonoGeneral | null> {
  const ref = collection(this.firestore, 'AbonosGenerales');
  const snapshot = await getDocs(ref);
  const abonos = snapshot.docs.map(d => d.data() as AbonoGeneral);
  return abonos.find(a => a.activo && a.tipoCliente === 'particular') || null;
}

async obtenerPreciosProductos(): Promise<Producto[]> {
  const ref = collection(this.firestore, 'Productos');
  const snapshot = await getDocs(ref);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Producto[];
}



}
