import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../../models/cliente.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from '../../services/cliente.service';


@Component({
  selector: 'app-alta-cliente',
  templateUrl: './alta-cliente.component.html',
  styleUrls: ['./alta-cliente.component.css']
})
export class AltaClienteComponent {

  clienteForm!: FormGroup;
  cliente: Cliente = new Cliente();
  tipoCliente: 'personal' | 'empresa' = 'personal'; // todo en minúsculas

  constructor(private fb: FormBuilder, private clienteService: ClienteService, private snackBar: MatSnackBar, private dialogRef: MatDialogRef<AltaClienteComponent>) {

  }

  ngOnInit() {
    this.clienteForm = this.fb.group({
      tipoCliente: ['personal', Validators.required],
      usuario: [''],
      contrasena: [''],
      telefono: [''],
      mail: [''],
      nombre: [''],
      apellido: [''],
      razonSocial: [''],
      direccion: [''],
      cuit: [''],
      dni: [''],
      estado: ['activo']
    });

    this.onTipoClienteChange(); // Aplica validadores según el tipo
  }

  onTipoClienteChange() {
    const tipo = this.clienteForm.get('tipoCliente')?.value;

    this.clienteForm.get('apellido')?.clearValidators();
    this.clienteForm.get('dni')?.clearValidators();
    this.clienteForm.get('razonSocial')?.clearValidators();
    this.clienteForm.get('cuit')?.clearValidators();

    if (tipo === 'empresa') {
      this.clienteForm.get('razonSocial')?.setValidators([Validators.required]);
      this.clienteForm.get('cuit')?.setValidators([Validators.required]);
      this.clienteForm.get('nombre')?.clearValidators();
      this.clienteForm.get('apellido')?.clearValidators();
    } else {
      this.clienteForm.get('nombre')?.setValidators([Validators.required]);
      this.clienteForm.get('apellido')?.setValidators([Validators.required]);
      this.clienteForm.get('razonSocial')?.clearValidators();
      this.clienteForm.get('cuit')?.clearValidators();
    }

    Object.keys(this.clienteForm.controls).forEach(key => {
      this.clienteForm.get(key)?.updateValueAndValidity();
    });
  }

  guardarCliente() {
    if (this.clienteForm.invalid) {
      this.clienteForm.markAllAsTouched();
      return;
    }

    //const formData = this.clienteForm.value;
    const cliente = {
      ...this.clienteForm.value,
      remitos: [],
      pagos: [],
      stockAsociado: []
    };


    this.clienteService.agregarCliente(cliente)
      .then(() => {
        this.snackBar.open('Cliente guardado con éxito', 'Cerrar', {
          duration: 3000,
        });
        this.dialogRef.close(true);
      })
      .catch(err => {
        console.error(err);
        this.snackBar.open('Error al guardar el cliente', 'Cerrar', {
          duration: 3000,
        });
      });
  }

  cerrar(): void {
    this.dialogRef.close();
  }

}
