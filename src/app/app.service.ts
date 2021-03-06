import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Stock } from './stock/stock';
declare var $: any

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { OrderRequest } from './order/orderRequest';
import { Trade } from './trade/trade';

@Injectable()
export class AppService {

  headerDict = {
    //'authorization': 'Bearer 286bcbe3df198e65db394a98ca9cf990-f90437ac9e87af5723a3b790f10792a3',
  }

  accountId: String;

  requestOptions = {
    //headers: new Headers(this.headerDict),
  };
  url: string = 'https://api-fxpractice.oanda.com/';
  constructor(private http: Http) {
    this.accountId = sessionStorage.getItem("api-account-id");
    if (sessionStorage.getItem('api-token') != null) {
      this.headerDict = {
        'authorization': 'Bearer ' + sessionStorage.getItem('api-token')
      };

      this.requestOptions = {
        headers: new Headers(this.headerDict)
      };
    }
  }

  getStockPrice(selectedStocks: Stock[]): Observable<any> {

    let currencies = "";
    var stockNames = new Array<String>();
    selectedStocks.forEach(selectedStock => {
      stockNames.push(selectedStock.name);
    });
    currencies = stockNames.join(',');
    // ...using get request
    return this.http.get(this.url + 'v3/accounts/' + this.accountId + '/pricing?instruments=' + currencies, this.requestOptions)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  getAllStocks(selectedStocks: Stock[]): Observable<Stock[]> {
    let currencies = "";
    if (undefined !== selectedStocks) {
      var stockNames = new Array<String>();
      selectedStocks.forEach(stock => {
        stockNames.push(stock.name);
      })
      currencies = "?instruments=" + stockNames.join('&instruments=');
      console.log("Curr curr is " + currencies);
      console.log(selectedStocks);
    }
    return this.http.get(this.url + 'v3/accounts/' + this.accountId + '/instruments' + currencies, this.requestOptions)
      .map((res: Response) => res.json());
  }

  processOrderRequest(orderRequest: OrderRequest): Observable<any> {


    return this.http.post(this.url + 'v3/accounts/' + this.accountId + '/orders', { order: orderRequest }, this.requestOptions)
      .map((res: Response) => res.json());
  }

  getAllTrades(): Observable<Trade[]> {
    return this.http.get(this.url + 'v3/accounts/' + this.accountId + '/trades', this.requestOptions)
      .map((res: Response) => res.json());
  }

  getAccounts(token: String): Observable<any> {
    this.headerDict = {
      'authorization': 'Bearer ' + token,
    };
    this.requestOptions = {
      headers: new Headers(this.headerDict),
    };
    return this.http.get(this.url + 'v3/accounts', this.requestOptions)
      .map((res: Response) => res.json());
  }

}