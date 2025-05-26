import { Timestamp } from 'firebase/firestore';


export interface Produccion {
  id: string;
  fecha: Date;
  operador: string;
  detalle: {
    tipoBidon: '20L' | '12L' | '500cc';
    cantidad: number;
  }[];
}