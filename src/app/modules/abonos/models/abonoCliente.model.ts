export interface AbonoCliente {
  id?: string; // ID Firebase
  clienteId: string;
  clienteNombre?: string; // para mostrar en tabla
  tipo: 'particular' | 'empresa';
  cantidadBidones: number;
  precioNegociado: number;
  fechaInicio: Date;
  fechaFijacionPrecioHasta?: Date;
  activo: boolean;
  cantidadContratada?: number; // opcional, para empresas
}