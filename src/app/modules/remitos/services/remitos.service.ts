import { Injectable } from '@angular/core';
import { addDoc, collection, doc, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';
import { RemitoCliente } from '../models/remitoCliente.model';
import { CargaService } from '../../cargas/services/carga.service';

@Injectable({
  providedIn: 'root'
})
export class RemitosService {

  constructor(private firestore: Firestore, private cargaService: CargaService) { }

async generarRemitoCliente(remito: {
  clienteId: string;
  productos: { codigo: string; cantidad: number }[];
  fecha: Date;
}, cargaId: string): Promise<void> {

  const remitosRef = collection(this.firestore, 'RemitosClientes');
  const clienteRef = doc(this.firestore, `Clientes/${remito.clienteId}`);

  const clienteSnap = await getDoc(clienteRef);
  const clienteData = clienteSnap.data();

  const stockActual = clienteData?.['stock'] || {};
  const remitosActuales = clienteData?.['remitos'] || [];

  // 👇 Obtener nombre visible del cliente
  let clienteNombre = '';
  if (clienteData?.['tipoCliente'] === 'empresa') {
    clienteNombre = clienteData['razonSocial'] || 'Empresa sin nombre';
  } else if (clienteData?.['tipoCliente'] === 'personal') {
    clienteNombre = `${clienteData['nombre'] || ''} ${clienteData['apellido'] || ''}`.trim();
  }

  // 👇 Crear el objeto completo de remito
  const remitoConEstado = {
    ...remito,
    facturado: false,
    clienteNombre // ✅ Nombre completo o razón social
  };

  // 👇 Guardar el nuevo remito
  const remitoDocRef = await addDoc(remitosRef, remitoConEstado);
  const remitoId = remitoDocRef.id;

  // 👇 Actualizar stock y remitos en el cliente
  const nuevoStock = { ...stockActual };
  for (const producto of remito.productos) {
    if (!nuevoStock[producto.codigo]) nuevoStock[producto.codigo] = 0;
    nuevoStock[producto.codigo] += producto.cantidad;
  }

  const nuevoRemito = {
    id: remitoId,
    fecha: remito.fecha,
    productos: remito.productos,
    facturado: false
  };

  const remitosActualizados = [...remitosActuales, nuevoRemito];

  await updateDoc(clienteRef, {
    stock: nuevoStock,
    remitos: remitosActualizados
  });

  // 👉 ACTUALIZAR CARGA: cantidadAsignada
  await this.cargaService.actualizarCantidadAsignadaEnCarga(
    cargaId,
    remito.productos.map(p => ({ id: p.codigo, cantidad: p.cantidad }))
  );
}

  

async guardarRemitos(remitos: RemitoCliente[]): Promise<void> {
  const remitosRef = collection(this.firestore, 'RemitosClientes');

  for (const remito of remitos) {
    const clienteRef = doc(this.firestore, `Clientes/${remito.clienteId}`);

    // Guardamos el remito
    await addDoc(remitosRef, remito);

    // Actualizamos el stock del cliente
    const clienteSnap = await getDoc(clienteRef);
    const clienteData = clienteSnap.data();
    const stockActual = clienteData?.['stock'] || {};

    const nuevoStock = { ...stockActual };

    for (const producto of remito.productos) {
      if (!nuevoStock[producto.codigo]) nuevoStock[producto.codigo] = 0;
      nuevoStock[producto.codigo] += producto.cantidad;
    }

    await updateDoc(clienteRef, { stock: nuevoStock });
  }
}






}
