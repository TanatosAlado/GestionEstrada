import { Repartidor } from "src/app/modules/repartidores/models/repartidor.model";

export interface ProductoCarga {
  codigo: string;     // ej: '10L'
  cantidad: number;
}

export interface Carga {
  id?: string;
  fecha: Date;
  repartidor: string; // solo el ID del repartidor
  productos: ProductoCarga[];
  remitos: string[];
}