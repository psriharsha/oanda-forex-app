import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { remote, IpcRenderer } from 'electron';
import { Stock } from './stock';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { Location } from '@angular/common';

@Component({
    selector: 'stock-detail-element',
    templateUrl: 'stock-detail.component.html',
    styleUrls: ['../app.component.scss']
  })
  export class StockDetailComponent implements OnInit{
    @Input() selectedStock : Stock;
    private stockName : String;
    private _ipc: IpcRenderer | undefined;

    constructor(
        private route: ActivatedRoute,
        private service : AppService,
        private location : Location
    ){}

    ngOnInit(): void {
        this.getStock();
    }

    getStock() : void {
        const name : string = this.route.snapshot.paramMap.get('name');
        this.stockName = name.toUpperCase();        
        this.selectedStock = new Stock();
        setInterval(() => { this.refreshData(); }, 1500);
    }

    refreshData(){        
        this.service.getStock(this.stockName)
            .subscribe((stockQuotes) =>{
                let price = stockQuotes.prices[0];
                if (undefined == this.selectedStock.bid || this.selectedStock.bid === price.bid)
                  this.selectedStock.direction = 0;
                else if (this.selectedStock.bid > price.bid)
                  this.selectedStock.direction = -1;
                else
                  this.selectedStock.direction = 1;
                this.selectedStock.ask = price.ask;
                this.selectedStock.bid = price.bid;
                this.selectedStock.name = price.instrument;
            });
    }

    removeStock(stock : Stock){
        console.log("Closing " + stock.name);
        if (window.require){
            try{
                this._ipc = window.require('electron').ipcRenderer;
                window.close();
            }catch(e){
                throw e;
            }
        }else{
            console.log("Browser event should close");
        }
    }

    popout(stock : Stock) {
        console.log(stock.name + " is to be popped out");
    }
}