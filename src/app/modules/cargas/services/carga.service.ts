import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, getDoc } from '@angular/fire/firestore';
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
      repartidorId: carga.repartidor,
      productos: carga.productos,
      remitos: carga.remitos || []
    };
    return addDoc(cargasRef, cargaParaGuardar).then(() => {});
  }

  obtenerRepartidores(): Observable<Repartidor[]> {
    const repRef = collection(this.firestore, 'Repartidores');
    return collectionData(repRef, { idField: 'id' }) as Observable<Repartidor[]>;
  }
}
