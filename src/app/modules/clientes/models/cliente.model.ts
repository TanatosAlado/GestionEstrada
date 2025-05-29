export class Cliente {
  id!: string;
  tipoCliente!: 'personal' | 'empresa';
  nombre!: string;
  usuario!: string;
  contrasena!: string;
  estado!: 'activo' | 'inactivo';

  apellido?: string;
  direccion?: string;
  telefono?: string;
  mail?: string;
  dni?: string;

  razonSocial?: string;
  cuit?: string;

  remitos: any[] = [];
  pagos: any[] = [];
  stockAsociado: any[] = [];

  abonos: { abonoId: string; fechaInicio: Date; }[] = []; // 👈 array para múltiples abonos
  tieneDispenser?: boolean;

  constructor(params: Partial<Cliente> = {}) {
    Object.assign(this, params);
    this.remitos = [];
    this.pagos = [];
    this.stockAsociado = [];
    this.abonos = params.abonos || []; // 👈 asegurarse que exista
  }
}