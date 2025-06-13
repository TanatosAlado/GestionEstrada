import { Component, OnInit } from '@angular/core';
import { PagosService } from '../../services/pagos.service'; 
import { ClienteService } from 'src/app/modules/clientes/services/cliente.service'; 
import { FacturasService } from 'src/app/modules/facturacion/services/facturas.service'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/modules/clientes/models/cliente.model';
import { ResumenFactura } from 'src/app/modules/facturacion/models/resumenFactura.model'; 
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-alta-pagos',
  templateUrl: './alta-pagos.component.html',
  styleUrls: ['./alta-pagos.component.css']
})
export class AltaPagosComponent {


  formPago!: FormGroup;
  clientes: Cliente[] = [];
  facturasCliente: any[] = [];
  montoRestante: number = 0;

  constructor(
    private fb: FormBuilder,
    private pagosService: PagosService,
    private clientesService: ClienteService,
    private facturasService: FacturasService
  ) {}

  ngOnInit(): void {
    this.formPago = this.fb.group({
      clienteId: ['', Validators.required],
      monto: [0, [Validators.required, Validators.min(1)]],
      facturas: this.fb.group({}) // se completará dinámicamente
    });

    this.clientesService.obtenerClientes().subscribe(clientes => {
      this.clientes = clientes;
    });

    this.formPago.get('clienteId')?.valueChanges.subscribe(clienteId => {
      this.cargarFacturasPendientes(clienteId);
    });

    this.formPago.get('monto')?.valueChanges.subscribe(monto => {
      this.recalcularMontosPendientes(monto);
    });
  }

  cargarFacturasPendientes(clienteId: string) {
    this.facturasService.obtenerFacturasPorCliente(clienteId).subscribe(facturas => {
      this.facturasCliente = facturas.filter(f => f.estado !== 'abonada');

      const facturasGroup: any = {};
      this.facturasCliente.forEach(f => {
        facturasGroup[f.id!] = [0]; // Por defecto: 0 asignado
      });

      this.formPago.setControl('facturas', this.fb.group(facturasGroup));
    });
  }

  recalcularMontosPendientes(monto: number) {
    const facturasGroup = this.formPago.get('facturas');
    if (!facturasGroup) return;

    const asignaciones = Object.values(facturasGroup.value || {}).map(Number);
    const totalAsignado = asignaciones.reduce((sum, val) => sum + val, 0);
    this.montoRestante = monto - totalAsignado;
  }

  guardarPago() {
    if (this.formPago.invalid || this.montoRestante < 0) return;

    const clienteId = this.formPago.value.clienteId;
    const clienteNombre = this.clientes.find(c => c.id === clienteId)?.nombre || '';
    const monto = this.formPago.value.monto;
    const asignaciones = this.formPago.value.facturas;

    const facturasAplicadas = Object.entries(asignaciones)
      .filter(([_, val]) => Number(val) > 0)
      .map(([facturaId]) => facturaId);

    const pago = {
      clienteId,
      clienteNombre,
      fecha: Timestamp.now(),
      monto,
      facturaIds: facturasAplicadas
    };

    this.pagosService.registrarPago(pago, asignaciones).then(() => {
      alert('✅ Pago registrado correctamente');
    });
  }
}
