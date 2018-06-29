import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Stock } from './stock';
import { Price } from './price';
import { OrderRequest } from './order/orderRequest';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "Harsha's App";
  stock : Stock;
  selectedStocks: Stock[];
  stocks: Stock[];
  defaultVolume : number;
  constructor(private appService : AppService){
      this.selectedStocks = new Array();
      this.appService.getAllStocks().subscribe((stocks : any) => {
        this.stocks = stocks.instruments;
        this.stocks.forEach((s : Stock) => {
          if (s.type !== "CURRENCY"){
            let index = this.stocks.indexOf(s);
            this.stocks.splice(index,1);
          }
        })
        // if (this.stocks.length > 0){
        //   this.stock = this.stocks[0];
        // }
        this.defaultVolume = 100;
        setInterval(() => { this.refreshData(); }, 1500);
        console.log(stocks.instruments);
      });
  }
  refreshData(){
      if (this.selectedStocks.length > 0){
          this.appService.getStockPrice(this.selectedStocks).subscribe((stockQuotes : any) => {
            console.log(stockQuotes);
            let prices : any[] = stockQuotes.prices;
            prices.forEach(price => {
              let index = this.selectedStocks.findIndex(function(selectedStock){
                return Object.keys(price).every(function (key) {
                  return price['instrument'] === selectedStock['name'];
                });
              });
              if(index >= 0){
                if (this.selectedStocks[index].bid < price.bid)
                  this.selectedStocks[index].direction = 1;
                else if (this.selectedStocks[index].bid > price.bid)
                  this.selectedStocks[index].direction = -1;
                else
                  this.selectedStocks[index].direction = 0;
                this.selectedStocks[index].bid = price.bid;
                this.selectedStocks[index].ask = price.ask;
              }
            });
            
        });
      }
  }

  selectionChanged(stock : Stock){
    stock.bid = 0;
    stock.ask = 0;
    this.selectedStocks.splice(0,0,stock);
    let index = this.stocks.indexOf(stock);
    this.stocks.splice(index,1);
  }

  removeStock(stock : Stock){
    this.stocks.splice(0,0,stock);
    let index = this.selectedStocks.indexOf(stock);
    this.selectedStocks.splice(index,1);
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

}
