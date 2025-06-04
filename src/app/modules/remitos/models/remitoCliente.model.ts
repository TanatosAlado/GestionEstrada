export interface RemitoCliente {
  clienteId: string;
  productos: { codigo: string; cantidad: number }[];
  fecha: Date;
  repartidorId: string;
  facturado: boolean;
}