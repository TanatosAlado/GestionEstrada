import { AbonoCliente } from "../../abonos/models/abonoCliente.model";
import { AbonoGeneral } from "../../abonos/models/abonoGeneral.model";

export interface ResumenFactura {
  clienteId: string;
  clienteNombre?: string;
  abono: AbonoGeneral | AbonoCliente | null;
  productos: {
    tipo: string;           // ej: 'bidon'
    capacidad: number;      // ej: 12
    cantidad: number;       // total en los remitos
    cubiertosPorAbono: number;
    excedente: number;
    precioUnitario: number;
    subtotal: number;
  }[];
  total: number;
}