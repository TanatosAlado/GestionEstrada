import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Abono } from '../../models/abono.model';
import { AbonoCliente } from '../../models/abonoCliente.model'; 
import { ClienteService } from 'src/app/modules/clientes/services/cliente.service';
import { AbonosService } from '../../services/abonos.service';
//import { AbonosClientesService } from '../../services/abonos-clientes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AbonosClientesService } from '../../services/abonos-clientes.service';

@Component({
  selector: 'app-asignar-abono-cliente',
  templateUrl: './asignar-abono-cliente.component.html',
  styleUrls: ['./asignar-abono-cliente.component.css']
})
export class AsignarAbonoClienteComponent {


  form: FormGroup;
  abonos: AbonoCliente[] = [];
  clientes: any[] = []; // Asegurate de tener un modelo para clientes si querés tipar mejor

  constructor(
    private fb: FormBuilder,
    private abonoService: AbonosService,
    private clientesService: ClienteService,
    private abonosClientesService: AbonosClientesService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      clienteId: ['', Validators.required],
      abonoId: ['', Validators.required],
      precioNegociado: [0, [Validators.required, Validators.min(0)]],
      fechaInicio: [new Date(), Validators.required],
      fechaTopeActualizacion: [null],
      activo: [true]
    });
  }

  ngOnInit(): void {
    this.abonoService.obtenerAbonos().subscribe((abonos) => {
      this.abonos = abonos;
    });

    this.clientesService.obtenerClientes().subscribe((clientes) => {
      this.clientes = clientes;
    });
  }

  guardarAsignacion() {
    if (this.form.invalid) return;

    const data: AbonoCliente = {
      ...this.form.value,
      id: '', // Firebase lo genera
    };

    this.abonosClientesService.crearAsignacion(data).then(() => {
      this.snackBar.open('Abono asignado al cliente', 'Cerrar', { duration: 3000 });
      this.form.reset({ activo: true, precioNegociado: 0, fechaInicio: new Date() });
    });
  }
}
