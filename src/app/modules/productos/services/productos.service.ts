import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Producto } from '../models/producto.model';
import { Observable } from 'rxjs';
import { collection as fsCollection } from 'firebase/firestore';

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
}