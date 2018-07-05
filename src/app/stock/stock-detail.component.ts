import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
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
        setInterval(() => { this.refreshData(); }, 1500);
    }

    refreshData(){        
        this.service.getStock(this.stockName)
            .subscribe((stockQuotes) =>{
                console.log("Some Text");
                let infoStock = stockQuotes.prices[0];
                this.selectedStock = new Stock();
                this.selectedStock.ask = infoStock.ask;
                this.selectedStock.bid = infoStock.bid;
                this.selectedStock.name = infoStock.instrument;
                this.selectedStock.direction = 0;
            });
    }
}