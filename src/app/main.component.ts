import { Component, ViewChild } from '@angular/core';
import { AppService } from './app.service';
import { Stock } from './stock/stock';
import { Price } from './price';
import { OrderRequest } from './order/orderRequest';
import { Trade } from './trade/trade';
import { StockComponent } from './stock/stock.component';

@Component({
  selector: 'main-root',
  templateUrl: './main.component.html',
  styleUrls: ['./app.component.scss']
  
})
export class MainComponent {
  title = "Harsha's App";
  stock : Stock;
  selectedStocks: Stock[];
  stocks: Stock[];
  defaultVolume : number;
  trades: Trade[];
  math: any;
  $ : any;
  showModal : boolean;

  @ViewChild('myModal') myModal;

openModel() {
  this.myModal.nativeElement.className = 'modal fade show';
}
closeModel() {
   this.myModal.nativeElement.className = 'modal hide';
}
  constructor(private appService : AppService){
    this.math = Math;
    this.showModal = true;
      this.selectedStocks = new Array();
      this.trades = new Array();
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
      });
      setInterval(() => { this.refreshData(); }, 1500);
  }
  refreshData(){
      if (this.selectedStocks.length > 0){
          this.appService.getStockPrice(this.selectedStocks).subscribe((stockQuotes : any) => {
            console.log(stockQuotes.prices);
            let prices : any[] = stockQuotes.prices;
            prices.forEach(price => {
              let index = this.selectedStocks.findIndex(function(selectedStock){
                return Object.keys(price).every(function (key) {
                  return price['instrument'] === selectedStock['name'];
                });
              });
              if(index >= 0){
                let oldValue : number = this.selectedStocks[index].bid;
                this.selectedStocks[index].bid = price.bids[0].price;
                this.selectedStocks[index].ask = price.asks[0].price;
                if (oldValue == undefined || oldValue === this.selectedStocks[index].bid)
                    this.selectedStocks[index].direction = 0;
                else if (oldValue > this.selectedStocks[index].bid)
                    this.selectedStocks[index].direction = -1;
                else
                    this.selectedStocks[index].direction = 1;
              }
            });
            
        });
      }
      this.appService.getAllTrades().subscribe((tradesResponse : any) => {
        this.trades = tradesResponse.trades;
      });
      
      for(var j = 0; j <this.trades.length && this.stocks.length > 0; j++){
        let trade = this.trades[j];
        let index = -1;
        for(var i = 0; i < this.selectedStocks.length; i++){
          if(this.selectedStocks[i].name === trade.instrument){
            index = i;
            break;
          }
        }
        if (index < 0){
          index = this.stocks.findIndex((s : Stock) => {
            return s.name === trade.instrument;
          });
          let stock = this.stocks[index];
          if (!stock.isHidden){
            stock.bid = 0;
            stock.ask = 0;
            stock.name = trade.instrument;
            stock.isSelected = true;
            this.selectedStocks.splice(0,0,stock);
            break;
          }
        }
      }
  }

  selectionChanged(stock : Stock){
    if (!stock.isSelected){
      stock.bid = 0;
      stock.ask = 0;
      this.selectedStocks.splice(0,0,stock);
    }else{
      stock.isHidden = true;
      let index = this.selectedStocks.indexOf(stock);
      this.selectedStocks.splice(index, 1);
    }
    stock.isSelected = !stock.isSelected;
    //this.stocks.splice(index,1);
  }

  removeStock(stock : Stock){
    //this.stocks.splice(0,0,stock);
    this.selectionChanged(stock);
  }

  changeVolume(volume : number){
    console.log("Volume Changed... heheheheh");
    this.defaultVolume = volume;
  }

  popout(stock : Stock) {
    console.log(stock.name + " is to be popped out");
  }

}
