import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from 'src/app/modules/clientes/models/cliente.model';
import { ClienteService } from 'src/app/modules/clientes/services/cliente.service';
import { RemitosService } from 'src/app/modules/remitos/services/remitos.service';

@Component({
  selector: 'app-generar-remitos',
  templateUrl: './generar-remitos.component.html',
  styleUrls: ['./generar-remitos.component.css']
})
export class GenerarRemitosComponent implements OnInit {
  clientes: Cliente[] = [];
  clientesFiltrados: Cliente[] = [];
  productosCarga: {
    id: string;
    descripcion: string;
    cantidadOriginal: number; // Total original
    //cantidadDisponible: number;
    cantidadAsignada: number; // Cantidad asignada en el remito
  }[] = [];

  formRemito!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private remitosService: RemitosService,
    private dialogRef: MatDialogRef<GenerarRemitosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      carga: {
        id: string; // ✅ Agregá el id acá
        productos: {
          cantidad: number,
          descripcion: string,
          id: string,
          cantidadAsignada: number
        }[];
      }
    }
  ) { }

  ngOnInit(): void {
    this.clienteService.obtenerClientes().subscribe(clientes => {
      this.clientes = clientes;
      this.clientesFiltrados = clientes;
    });

    this.productosCarga = this.data.carga.productos.map(p => ({
      id: p.id,
      descripcion: p.descripcion,
      cantidadOriginal: p.cantidad,
      cantidadAsignada: p.cantidadAsignada ?? 0 // por si faltara
    }));

    const controlsConfig: any = {
      clienteId: ['', Validators.required]
    };

    this.productosCarga.forEach(p => {
      const disponible = p.cantidadOriginal - p.cantidadAsignada;
      const controlName = this.controlName(p.id);
      controlsConfig[controlName] = [
        0,
        [Validators.required, Validators.min(0), Validators.max(disponible)]
      ];
    });


    this.formRemito = this.fb.group(controlsConfig);

    this.formRemito.get('clienteId')?.valueChanges.subscribe(value => {
      if (typeof value === 'string') {
        this.clientesFiltrados = this._filterClientes(value);
      } else {
        this.clientesFiltrados = this.clientes;
      }
    });
  }

  controlName(id: string): string {
    return `prod_${id}`;
  }

  mostrarNombreCliente(clienteId: string): string {
    const cliente = this.clientes.find(c => c.id === clienteId);
    return cliente ? cliente.nombre : '';
  }

  get puedeGuardar(): boolean {
    const clienteValido = this.formRemito.get('clienteId')?.valid;

    const algunProductoAsignado = this.productosCarga.some(p => {
      const control = this.formRemito.get(this.controlName(p.id));
      return control && control.valid && control.value > 0;
    });

    return clienteValido && algunProductoAsignado;
  }

  getDisponible(producto: { id: string; cantidadOriginal: number }): number {
    const control = this.formRemito.get(this.controlName(producto.id));
    const asignado = control?.value || 0;
    return producto.cantidadOriginal - asignado;
  }

  onGuardar() {
    if (!this.puedeGuardar) return;

    const clienteId = this.formRemito.get('clienteId')?.value;

    const productos = this.productosCarga
      .map(p => ({
        codigo: p.id,
        descripcion: p.descripcion,
        cantidad: this.formRemito.get(this.controlName(p.id))?.value || 0
      }))
      .filter(p => p.cantidad > 0);

    const remito = {
      clienteId,
      productos,
      fecha: new Date()
    };

    this.remitosService.generarRemitoCliente(remito, this.data.carga.id) // Pasar el ID de la carga
      .then(() => {
        // 🔁 Actualizar cantidades disponibles
        productos.forEach(p => {
          const prod = this.productosCarga.find(pc => pc.id === p.codigo);
          if (prod) {
            prod.cantidadAsignada += p.cantidad;

            // Si querés actualizar los validadores por si se genera otro remito sin cerrar el modal:
            const control = this.formRemito.get(this.controlName(prod.id));
            if (control) {
              control.setValidators([
                Validators.required,
                Validators.min(0),
                Validators.max(prod.cantidadOriginal - prod.cantidadAsignada)
              ]);
              control.updateValueAndValidity();
            }
          }
        });

        // ✅ Volver a crear el form con las nuevas cantidades
        const controlsConfig: any = {
          clienteId: ['', Validators.required]
        };

        this.productosCarga.forEach(p => {
          const controlName = this.controlName(p.id);
          controlsConfig[controlName] = [
            0,
            [Validators.required, Validators.min(0), Validators.max(p.cantidadOriginal - p.cantidadAsignada)]
          ];
        });

        this.formRemito = this.fb.group(controlsConfig);

        // Reasignar filtro cliente
        this.formRemito.get('clienteId')?.valueChanges.subscribe(value => {
          if (typeof value === 'string') {
            this.clientesFiltrados = this._filterClientes(value);
          } else {
            this.clientesFiltrados = this.clientes;
          }
        });
      })
      .catch(err => {
        console.error('Error al guardar remito:', err);
      });
  }

  onCancelar() {
    this.dialogRef.close();
  }

  private _filterClientes(value: string): Cliente[] {
    const filterValue = value.toLowerCase();
    return this.clientes.filter(c => c.nombre.toLowerCase().includes(filterValue));
  }
}
