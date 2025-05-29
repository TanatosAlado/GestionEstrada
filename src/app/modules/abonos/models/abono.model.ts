export interface Abono {
  id?: string;                // ID en Firestore
  nombre: string;             // Ej: "Abono Familiar", "Empresarial"
  cantidadBidones: number;    // Bidones que se entregan por semana
  precioMensual: number;      // Valor total del abono
  incluyeDispenser: boolean;  // Si al contratar se entrega uno
  activo: boolean;            // Para desactivar sin borrar
}