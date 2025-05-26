import { Component } from '@angular/core';
import { StockService } from 'src/app/shared/services/stock.service';

@Component({
  selector: 'app-lista-stock',
  templateUrl: './lista-stock.component.html',
  styleUrls: ['./lista-stock.component.css']
})
export class ListaStockComponent {

  stock: any[] = [];

  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.stockService.getStockActual().subscribe(data => {
      this.stock = data;
    });
  }

}
