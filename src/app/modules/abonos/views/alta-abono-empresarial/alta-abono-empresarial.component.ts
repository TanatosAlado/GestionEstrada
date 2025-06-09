import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/modules/clientes/models/cliente.model';
import { ClienteService } from 'src/app/modules/clientes/services/cliente.service';
import { AbonosService } from '../../services/abonos.service';
import { AbonosClientesService } from '../../services/abonos-clientes.service';
import { Abono } from '../../models/abono.model';
import { AbonoCliente } from '../../models/abonoCliente.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alta-abono-empresarial',
  templateUrl: './alta-abono-empresarial.component.html',
  styleUrls: ['./alta-abono-empresarial.component.css']
})
export class AltaAbonoEmpresarialComponent implements OnInit {
  formAbonoEmpresarial: FormGroup;
  clientes: Cliente[] = [];
  abonosEmpresariales: AbonoCliente[] = [];

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private abonoService: AbonosService,
    private abonosEmpresarialesService: AbonosClientesService,
    private dialogRef: MatDialogRef<AltaAbonoEmpresarialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.formAbonoEmpresarial = this.fb.group({
      clienteId: [null, Validators.required],
      abonoId: [null, Validators.required],
      precioNegociado: [null, [Validators.required, Validators.min(0)]],
      fechaInicio: [null, Validators.required],
      fechaTopeModificacion: [null]
    });

    // this.clienteService.obtenerClientes().subscribe(data => this.clientes = data);
    // this.abonoService.obtenerAbonos().subscribe(data => {
    //   this.abonosEmpresariales = data.filter(a => a.nombre === 'Empresarial');
    // });
  }

  guardar() {
    if (this.formAbonoEmpresarial.invalid) return;

    const nuevoAbono: AbonoCliente = {
      ...this.formAbonoEmpresarial.value,
      id: '', // Firestore genera el ID
      activo: true
    };

    this.abonosEmpresarialesService.crearAbono(nuevoAbono).then(() => {
      this.dialogRef.close(true);
    });
  }

  cancelar() {
    this.dialogRef.close();
  }
}