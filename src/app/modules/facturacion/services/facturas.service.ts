import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collection, addDoc, updateDoc, doc, getFirestore, collectionData } from '@angular/fire/firestore';


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
  
}
