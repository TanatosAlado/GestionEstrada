import { Injectable } from '@angular/core';
import { Firestore, doc, collection, runTransaction, getDoc, setDoc, collectionData, getDocs, updateDoc, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface Producto {
  id: string;
  stock: number;
  capacidad: number;
  tipo: string;
  // otras propiedades si las necesitás
}

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private firestore: Firestore) {}

async actualizarStockPorProduccion(detalle: { id: string, cantidad: number }[]) {
  const productosRef = collection(this.firestore, 'Productos');

  for (const item of detalle) {
    const productoRef = doc(this.firestore, `Productos/${item.id}`);
    const docSnap = await getDoc(productoRef);

    if (docSnap.exists()) {
      const producto = docSnap.data() as Producto;
      const stockActual = typeof producto['stock'] === 'number' ? producto['stock'] : 0;
      const nuevoStock = stockActual + item.cantidad;

      await updateDoc(productoRef, { stock: nuevoStock });
    } else {
      console.warn(`Producto con id ${item.id} no encontrado en la base`);
    }
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
