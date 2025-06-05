export interface RemitoCliente {
  id: string;
  clienteId: string;
  clienteNombre: string;
  productos: {
    codigo: string;
    cantidad: number;
    descripcion?: string;
  }[];
  fecha: Date;
  repartidorId: string;
  repartidorNombre?: string;
  facturado: boolean;
}