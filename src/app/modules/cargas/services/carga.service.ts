import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Carga } from '../models/carga.model';
import { Repartidor } from '../../repartidores/models/repartidor.model';
import { Observable, from, forkJoin, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargaService {

  constructor(private firestore: Firestore) {}

  obtenerCargas(): Observable<Carga[]> {
    const cargasRef = collection(this.firestore, 'Cargas');

    return collectionData(cargasRef, { idField: 'id' }).pipe(
      switchMap((cargas: any[]) => {
        const cargasConRepartidor$ = cargas.map((carga) => {
          const fecha = carga.fecha?.toDate?.() || carga.fecha;

          if (carga.repartidorId) {
            const repartidorDocRef = doc(this.firestore, 'Repartidores', carga.repartidorId);
            return from(getDoc(repartidorDocRef)).pipe(
              map((repartidorSnap) => {
                const repartidorNombre = repartidorSnap.exists() ? repartidorSnap.data()['nombre'] : 'Desconocido';
                return {
                  ...carga,
                  fecha,
                  repartidor: carga.repartidorId,
                  repartidorNombre,
                } as Carga;
              })
            );
          } else {
            return from(Promise.resolve({
              ...carga,
              fecha,
              repartidor: '',
              repartidorNombre: 'Desconocido',
            } as Carga));
          }
        });

        return forkJoin(cargasConRepartidor$);
      })
    );
  }

  guardarCarga(carga: Carga): Promise<void> {


    const cargasRef = collection(this.firestore, 'Cargas');
    // Creamos un objeto plano para Firestore (ojo con fecha y repartidor)
    const cargaParaGuardar = {
      fecha: carga.fecha,
      repartidorId: carga.repartidorId,
      productos: carga.productos,
      remitos: carga.remitos || []
    };

    console.log('Guardando carga:', cargaParaGuardar);
    return addDoc(cargasRef, cargaParaGuardar).then(() => {});
  }

  obtenerRepartidores(): Observable<Repartidor[]> {
    const repRef = collection(this.firestore, 'Repartidores');
    return collectionData(repRef, { idField: 'id' }) as Observable<Repartidor[]>;
  }

  async descontarStock(productos: { id: string, cantidad: number }[]): Promise<void> {
  for (const producto of productos) {
    const productoRef = doc(this.firestore, 'Productos', producto.id);
    const productoSnap = await getDoc(productoRef);

    if (!productoSnap.exists()) {
      console.warn(`Producto con ID ${producto.id} no encontrado`);
      continue;
    }

    const data = productoSnap.data();
    const stockActual = data['stock'] ?? 0;
    const nuevoStock = stockActual - producto.cantidad;

    await updateDoc(productoRef, { stock: nuevoStock });
  }
}
}
