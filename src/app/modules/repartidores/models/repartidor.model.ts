import { StockItem } from '../../../shared/models/stockItem.model'

export class Repartidor {
  id?: string;
  nombre?: string;
  apellido?: string;
  telefono?: string;
  mail?: string;
  stock: StockItem[] = [];

  constructor(params: Partial<Repartidor> = {}) {
    Object.assign(this, params);
    this.stock = this.stock || [];
  }

}