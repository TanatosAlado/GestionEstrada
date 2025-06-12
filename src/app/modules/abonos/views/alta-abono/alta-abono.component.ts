import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cliente } from 'src/app/modules/clientes/models/cliente.model';
import { ClienteService } from 'src/app/modules/clientes/services/cliente.service';
import { AbonoCliente } from '../../models/abonoCliente.model';
import { AbonosService } from '../../services/abonos.service';
import { arrayUnion, updateDoc } from 'firebase/firestore';

@Component({
  selector: 'app-alta-abono',
  templateUrl: './alta-abono.component.html',
  styleUrls: ['./alta-abono.component.css']
})
export class AltaAbonoComponent {

  form: FormGroup;
  tipoCliente: 'particular' | 'empresa' = 'particular';
  clientes: Cliente[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AltaAbonoComponent>,
    private clienteService: ClienteService,
    private abonoService: AbonosService,
    @Inject(MAT_DIALOG_DATA) public data: { cliente?: Cliente },
  ) { }

  ngOnInit(): void {

    this.clienteService.obtenerClientes().subscribe(clientes => {
      this.clientes = clientes;
    });

    this.form = this.fb.group({
      clienteId: ['', Validators.required],
      tipo: ['particular', Validators.required],
      bidones12L: [0, [Validators.min(0)]],
      bidones20L: [0, [Validators.min(0)]],
      precioNegociado: [{ value: 0, disabled: true }, [Validators.required, Validators.min(0)]],
      fechaInicio: [new Date(), Validators.required],
      fechaFijacionPrecioHasta: [{ value: null, disabled: true }],
      activo: [true],
      cantidadContratada: [1, [Validators.required, Validators.min(1)]]
    });

    this.form.get('tipo')?.valueChanges.subscribe((tipo) => {
      this.tipoCliente = tipo;
      this.adaptarFormularioPorTipo();
    });

    this.adaptarFormularioPorTipo(); // inicial

    if (this.data?.cliente) {
      this.form.patchValue({ clienteId: this.data.cliente.id });
      this.form.get('clienteId')?.disable();
    }
  }

  adaptarFormularioPorTipo() {
    if (this.tipoCliente === 'particular') {
      this.form.patchValue({
        cantidadBidones: 4,
        precioNegociado: 0, // valor fijo predefinido
        fechaFijacionPrecioHasta: null
      });
      this.form.get('cantidadBidones')?.disable();
      this.form.get('precioNegociado')?.disable();
      this.form.get('fechaFijacionPrecioHasta')?.disable();
    } else {
      this.form.get('cantidadBidones')?.enable();
      this.form.get('precioNegociado')?.enable();
      this.form.get('fechaFijacionPrecioHasta')?.enable();
    }
  }

  async guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const totalBidones = (this.form.value.bidones12L || 0) + (this.form.value.bidones20L || 0);
    if (totalBidones === 0) {
      alert('Debes ingresar al menos un bidón de 12L o 20L.');
      return;
    }
    console.log('Datos:', this.form.value);

    let _clienteID: string = ""
    if(this.data) {
      _clienteID = this.data.cliente?.id;
    }else{
      _clienteID = this.form.value.clienteId;
    }

    const abono: AbonoCliente = {
      clienteId: _clienteID,
      clienteNombre: this.obtenerNombreCliente(this.clientes.find(c => c.id === this.form.value.clienteId)),
      tipo: this.form.value.tipo,
      bidones: {
        '12L': this.form.value.bidones12L || 0,
        '20L': this.form.value.bidones20L || 0
      },
      precioNegociado: this.form.value.precioNegociado,
      fechaInicio: this.form.value.fechaInicio,
      fechaFijacionPrecioHasta: this.form.value.fechaFijacionPrecioHasta || null,
      activo: true,
      cantidadContratada: this.form.value.cantidadContratada
    };

    console.log('Abono a guardar:', abono);
    try {
      const abonoRef = await this.abonoService.crearAbono(abono); // 👈 devuelve ref con ID
      const abonoId = abonoRef.id;
      console.log('id cliente', abono.clienteId);
      // 👇 ahora actualizamos el cliente
      const clienteRef = this.clienteService.getRefClientePorId(abono.clienteId);
      await updateDoc(clienteRef, {
        abonos: arrayUnion({
          abonoId: abonoId,
          fechaInicio: abono.fechaInicio,
          cantidadContratada: abono.cantidadContratada
        })
      });

      this.dialogRef.close(true);
    } catch (error) {
      console.error('Error al guardar abono y asociarlo al cliente:', error);
    }
  }
  cancelar() {

  }

  obtenerNombreCliente(cliente: Cliente): string {
    if (!cliente) return '';

    if (cliente.tipoCliente === 'personal') {
      return `${cliente.nombre} ${cliente.apellido || ''}`.trim();
    }

    return cliente.razonSocial || 'Empresa sin nombre';
  }

}