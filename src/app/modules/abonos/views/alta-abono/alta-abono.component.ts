import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbonosService } from '../../services/abonos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-alta-abono',
  templateUrl: './alta-abono.component.html',
  styleUrls: ['./alta-abono.component.css']
})
export class AltaAbonoComponent {

  abonoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private abonoService: AbonosService,
    private snackBar: MatSnackBar
  ) {
    this.abonoForm = this.fb.group({
      nombre: ['', Validators.required],
      cantidadBidones: [1, [Validators.required, Validators.min(1)]],
      precioMensual: [0, [Validators.required, Validators.min(0)]],
      incluyeDispenser: [false],
    });
  }

  guardarAbono() {
    if (this.abonoForm.invalid) return;

    const nuevoAbono = {
      ...this.abonoForm.value,
      activo: true,
    };

    this.abonoService.crearAbono(nuevoAbono).then(() => {
      this.snackBar.open('Abono creado correctamente', 'Cerrar', { duration: 3000 });
      this.abonoForm.reset({ incluyeDispenser: false, cantidadBidones: 1, precioMensual: 0 });
    });
  }

}
