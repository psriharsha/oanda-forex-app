import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { OrderRequest } from '../order/orderRequest';
import { Stock } from './stock';
import { AppService } from '../app.service';

@Component({
    selector: 'stock-element',
    templateUrl: './stock.component.html'
  })
  export class StockComponent implements OnChanges{
      @Input('stock') selectedStock : Stock;
      @Input('volume') defaultVolume : number;
      @Output() remove = new EventEmitter<Stock>();
      @Output() volumeChange = new EventEmitter<number>();

      constructor(private appService : AppService){
      }

      removeStock(){
          this.remove.emit(this.selectedStock);
      }

      orderStock(stock : Stock, direction : number){
        let newBuyOrder : OrderRequest = new OrderRequest();
        newBuyOrder.units = this.defaultVolume * direction;
        newBuyOrder.instrument = stock.name;
        //console.log(newBuyOrder);
        this.appService.processOrderRequest(newBuyOrder).subscribe((response : any) => {
            console.log(response);
        });
      }

      ngOnChanges(){
        if (this.defaultVolume < 1)
            this.defaultVolume = 1;
        this.volumeChange.emit(this.defaultVolume);
      }
  }