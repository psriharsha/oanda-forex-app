import { Component, Input } from '@angular/core';
import { Stock } from './stock';

@Component({
    selector: 'stock-element',
    templateUrl: './stock.component.html'
  })
  export class StockComponent {
      @Input('stock') selectedStock : Stock;

      constructor(){
      }
  }