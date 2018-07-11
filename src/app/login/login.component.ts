import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
  })
  export class LoginComponent{

    token : String;
    accounts : Array<any>;
    text : String;

    constructor(private service : AppService, private router : Router){
      this.accounts = new Array();
    }

    checkForValidAccounts(){
      this.service.getAccounts(this.token)
        .subscribe((result) => {
          this.accounts = result.accounts;
        })
    }

    selectedAccount(id : String){
      this.service.accountId = id;
      console.log("setting account id to " + id);
      this.router.navigate(['/dashboard']);
      // this.service.getAllStocks([])
      //     .subscribe((result) => {
      //       console.log(result);
      //     });
    }
  }