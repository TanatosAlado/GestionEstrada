export interface TipoAbono {
  id: string; // ID Firebase
  nombre: string;
  tipo: 'particular' | 'empresa';
  bidonesPorSemana: number;
  precioBase: number;
  frecuencia: 'semanal' | 'mensual'; // por ahora solo semanal
}