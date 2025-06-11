export interface AbonoGeneral {
  id?: string;
  descripcion: string;
  tipoCliente: 'particular' | 'empresa';
  bidones: {
    '12L': number;
    '20L': number;
  };
  cantidadContratada?: number;
  precio: number;
  activo: boolean;
}