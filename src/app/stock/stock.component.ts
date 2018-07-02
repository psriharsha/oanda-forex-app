import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Stock } from './stock';

@Component({
    selector: 'stock-element',
    templateUrl: './stock.component.html'
  })
  export class StockComponent implements OnChanges{
      @Input('stock') selectedStock : Stock;
      @Input('volume') defaultVolume : number;
      @Output() remove = new EventEmitter<Stock>();
      @Output() volumeChange = new EventEmitter<number>();

      constructor(){
      }

      removeStock(){
          this.remove.emit(this.selectedStock);
      }

      ngOnChanges(){
        if (this.defaultVolume < 1)
            this.defaultVolume = 1;
        this.volumeChange.emit(this.defaultVolume);
      }
  }