import { Component, OnInit } from '@angular/core';
import { AbonoGeneral } from '../../models/abonoGeneral.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AbonosService } from '../../services/abonos.service';

@Component({
  selector: 'app-alta-abono-general',
  templateUrl: './alta-abono-general.component.html',
  styleUrls: ['./alta-abono-general.component.css']
})
export class AltaAbonoGeneralComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AltaAbonoGeneralComponent>,
    private abonosService: AbonosService // tu servicio para guardar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      descripcion: ['', Validators.required],
      tipoCliente: ['particular', Validators.required],
      bidones12L: [0],
      bidones20L: [0],
      cantidadContratada: [null],
      precio: [null, [Validators.required, Validators.min(0)]],
      activo: [true]
    });
  }

  async guardar() {
    const totalBidones = (this.form.value.bidones12L || 0) + (this.form.value.bidones20L || 0);
    if (totalBidones === 0) {
      alert('Debes ingresar al menos un bidón de 12L o 20L.');
      return;
    }

    const abono: AbonoGeneral = {
      descripcion: this.form.value.descripcion,
      tipoCliente: this.form.value.tipoCliente,
      bidones: {
        '12L': this.form.value.bidones12L || 0,
        '20L': this.form.value.bidones20L || 0
      },
      cantidadContratada: this.form.value.cantidadContratada,
      precio: this.form.value.precio,
      activo: this.form.value.activo
    };

    try {
      await this.abonosService.crearAbonoGeneral(abono);
      this.dialogRef.close(true);
    } catch (err) {
      console.error('Error al guardar abono general', err);
    }
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}
