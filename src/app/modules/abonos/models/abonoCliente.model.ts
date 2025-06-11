export interface AbonoCliente {
  id?: string; // ID Firebase
  clienteId: string;
  clienteNombre?: string; // para mostrar en tabla
  tipo: 'particular' | 'empresa';
  //cantidadBidones: number;
    bidones?: {
    '12L': number;
    '20L': number;
  };
  precioNegociado: number;
  fechaInicio: Date;
  fechaFijacionPrecioHasta?: Date;
  activo: boolean;
  cantidadContratada?: number; // opcional, para empresas
  esGeneral?: boolean;
}