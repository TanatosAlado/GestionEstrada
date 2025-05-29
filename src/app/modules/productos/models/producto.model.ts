export interface Producto {
  id: string;

  tipo: 'bidon' | 'dispenser' | 'botella';  // Tipo de producto
  activo: boolean;                          // Estado del producto
  stock: number;                            // Cantidad disponible en stock

  // Solo si el tipo es distinto de "dispenser"
  capacidad?: number;

  // Solo si el tipo es "dispenser"
  tipoDispenser?: 'Frio-Calor' | 'Natural';
}