import { Injectable } from '@angular/core';
import { collection, getDocs, getFirestore, addDoc, doc, getDoc, updateDoc, deleteDoc, query, where, Firestore } from '@angular/fire/firestore';
import { Pago } from '../models/pago.model';
import { from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagosService {

  private pagosCollection

  constructor(private firestore: Firestore) {
    this.pagosCollection = collection(this.firestore, 'Pagos');
  }

  obtenerTodos() {
    return from(getDocs(this.pagosCollection)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as object) } as Pago)))

    );
  }

  crearPago(pago: Pago) {
    return from(addDoc(this.pagosCollection, pago));
  }

  obtenerPorId(id: string) {
    const ref = doc(this.firestore, 'Pagos', id);
    return from(getDoc(ref)).pipe(
      map(snapshot => snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } as Pago : null)
    );
  }

  /**
   * Actualizar un pago existente
   */
  actualizarPago(id: string, data: Partial<Pago>) {
    const ref = doc(this.firestore, 'Pagos', id);
    return from(updateDoc(ref, data));
  }

  /**
   * Eliminar un pago
   */
  eliminarPago(id: string) {
    const ref = doc(this.firestore, 'Pagos', id);
    return from(deleteDoc(ref));
  }

  /**
   * Obtener pagos por cliente
   */
  obtenerPorCliente(clienteId: string) {
    const q = query(this.pagosCollection, where('clienteId', '==', clienteId));
    return from(getDocs(q)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as object) } as Pago)))
    );
  }

  registrarPago(pago: any, asignaciones: { [facturaId: string]: number }) {
    const pagosRef = collection(this.firestore, 'Pagos');

    return addDoc(pagosRef, pago).then(async () => {
      // Por cada factura, actualizar pagos recibidos
      for (const [facturaId, montoAsignado] of Object.entries(asignaciones)) {
        const monto = Number(montoAsignado);
        if (monto <= 0) continue;

        const facturaRef = doc(this.firestore, 'Facturas', facturaId);
        const snapshot = await getDoc(facturaRef);
        const data = snapshot.data();

        if (!data) continue;

        const pagosPrevios = data['pagosRecibidos'] || 0;
        const total = data['total'] || 0;
        const nuevoTotal = pagosPrevios + monto;

        let nuevoEstado = 'pendiente';

        if (nuevoTotal >= total) {
          nuevoEstado = 'abonada';
        } else if (nuevoTotal > 0 && nuevoTotal < total) {
          nuevoEstado = 'pago parcial';
        }

        await updateDoc(facturaRef, {
          pagosRecibidos: nuevoTotal,
          estado: nuevoEstado
        });
      }
    });
  }

}
