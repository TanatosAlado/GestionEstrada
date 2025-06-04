import { Repartidor } from "src/app/modules/repartidores/models/repartidor.model";

export interface ProductoCarga {
  codigo: string;     // ej: '10L'
  cantidad: number;
  cantidadAsignada?: number;
}

export interface Carga {
  id: string;
  fecha: Date;
  repartidorId: string; // solo el ID del repartidor
  productos: ProductoCarga[];
  remitos: string[];
}