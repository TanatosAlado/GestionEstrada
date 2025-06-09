import { Component, OnInit } from '@angular/core';
import { FacturasService } from '../../services/facturas.service';

@Component({
  selector: 'app-facturas-lista',
  templateUrl: './facturas-lista.component.html',
  styleUrls: ['./facturas-lista.component.css']
})
export class FacturasListaComponent {

  facturas: any[] = [];

  constructor(private facturasService: FacturasService) { }

  ngOnInit(): void {
    this.facturasService.obtenerFacturas().subscribe(data => {
      this.facturas = data;
      console.log('Facturas obtenidas:', this.facturas);
    });
  }

}
