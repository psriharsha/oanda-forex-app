import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { AppService } from '../app.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
  })
  export class LoginComponent{

    token : String;
    accounts : Array<any>;

    constructor(private service : AppService){
      this.accounts = new Array();
    }

    checkForValidAccounts(){
      this.service.getAccounts(this.token)
        .subscribe((result) => {
          this.accounts = result.accounts;
        })
    }
  }