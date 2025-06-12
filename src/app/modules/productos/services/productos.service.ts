import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Producto } from '../models/producto.model';
import { from, map, Observable } from 'rxjs';
import { collection as fsCollection, getDocs, query, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private productosRef = fsCollection(this.firestore, 'Productos');

  constructor(private firestore: Firestore) {}

  obtenerProductos(): Observable<Producto[]> {
    return collectionData(this.productosRef, { idField: 'id' }) as Observable<Producto[]>;
  }

  agregarProducto(producto: Producto): Promise<void> {
    return addDoc(this.productosRef, producto).then(() => {});
  }

  actualizarProducto(producto: Producto): Promise<void> {
    const productoDoc = doc(this.firestore, `Productos/${producto.id}`);
    return updateDoc(productoDoc, { ...producto });
  }

  eliminarProducto(id: string): Promise<void> {
    const productoDoc = doc(this.firestore, `Productos/${id}`);
    return deleteDoc(productoDoc);
  }

  getPreciosProductos(): Observable<Producto[]> {
  const ref = collection(this.firestore, 'Productos');
  return from(getDocs(ref)).pipe(
    map(snapshot =>
      snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Producto[]
    )
  );
}

async getProductosActivosPromise(): Promise<Producto[]> {
  const productosRef = collection(this.firestore, 'Productos');
  const snapshot = await getDocs(query(productosRef, where('activo', '==', true)));
  return snapshot.docs.map(doc => doc.data() as Producto);
}

}