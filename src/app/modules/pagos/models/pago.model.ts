export interface Pago {
  id?: string;
  clienteId: string;
  clienteNombre: string;
  fecha: Date; 
  monto: number;
  metodo: string; 
  facturasAplicadas: {
    facturaId: string;
    montoAplicado: number;
  }[];
  observaciones?: string;
}
