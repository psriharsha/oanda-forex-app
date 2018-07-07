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
export class StockDetailComponent implements OnInit {
    @Input() selectedStock: Stock;
    private stockName: String;
    private _ipc: IpcRenderer | undefined;

    constructor(
        private route: ActivatedRoute,
        private service: AppService,
        private location: Location
    ) {
        this.initializeIPC();
    }

    ngOnInit(): void {
        this.getStock();
    }

    getStock(): void {
        const name: string = this.route.snapshot.paramMap.get('name').toUpperCase();
        this.stockName = name;
        this.selectedStock = new Stock();
        this.selectedStock.name = name;
        this.service.getAllStocks([this.selectedStock])
            .subscribe((stocks: any) => {
                this.selectedStock = stocks.instruments[0];
                setInterval(() => { this.refreshData(); }, 1500);
            });
    }

    refreshData() {
        console.log("Invoking Price " + this.selectedStock.name);
        this.service.getStockPrice([this.selectedStock])
            .subscribe((stockQuotes) => {
                let price = stockQuotes.prices[0];
                let oldValue: number = this.selectedStock.bid;
                this.selectedStock.bid = price.bids[0].price;
                this.selectedStock.ask = price.asks[0].price;
                if (oldValue == undefined || oldValue === this.selectedStock.bid)
                    this.selectedStock.direction = 0;
                else if (oldValue > this.selectedStock.bid)
                    this.selectedStock.direction = -1;
                else
                    this.selectedStock.direction = 1;
            });
    }

    removeStock(stock: Stock) {
        window.close();
    }

    initializeIPC() {
        if (window.require) {
            try {
                this._ipc = window.require('electron').ipcRenderer;
            } catch (e) {
                throw e;
            }
        } else {
            this._ipc = undefined;
        }
    }

    popout(stock: Stock) {
        if (this._ipc !== undefined) {
            this._ipc.send('closeDetail', this.selectedStock.name);
        }
    }
}