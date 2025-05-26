import { Injectable } from '@angular/core';
import { Firestore, doc, collection, runTransaction, getDoc, setDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private firestore: Firestore) {}

  async actualizarStockPorProduccion(detalle: { tipoBidon: string, cantidad: number }[]) {
    const stockRef = collection(this.firestore, 'Stock');

    for (const item of detalle) {
      const docRef = doc(stockRef, item.tipoBidon);

      await runTransaction(this.firestore, async (transaction) => {
        const docSnap = await transaction.get(docRef);
        const cantidadActual = docSnap.exists() ? docSnap.data()['cantidad'] : 0;
        const nuevaCantidad = cantidadActual + item.cantidad;

        transaction.set(docRef, {
          tipoBidon: item.tipoBidon,
          cantidad: nuevaCantidad
        });
      });
    }
  }

  async descontarStockPorCarga(detalle: { tipoBidon: string, cantidad: number }[]) {
    const stockRef = collection(this.firestore, 'Stock');

    for (const item of detalle) {
      const docRef = doc(stockRef, item.tipoBidon);

      await runTransaction(this.firestore, async (transaction) => {
        const docSnap = await transaction.get(docRef);
        const cantidadActual = docSnap.exists() ? docSnap.data()['cantidad'] : 0;

        if (item.cantidad > cantidadActual) {
          throw new Error(`Stock insuficiente para tipo: ${item.tipoBidon}`);
        }

        const nuevaCantidad = cantidadActual - item.cantidad;

        transaction.set(docRef, {
          tipoBidon: item.tipoBidon,
          cantidad: nuevaCantidad
        });
      });
    }
  }

  getStockActual(): Observable<any[]> {
    const ref = collection(this.firestore, 'Stock');
    return collectionData(ref);
  }


}
