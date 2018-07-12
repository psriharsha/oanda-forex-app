import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styles: [`
    body{
        background-image: url('../assets/background.jpg');
        background-repeat: repeat;
    }`]
  })
  export class LoginComponent{

    token : String;
    accounts : Array<any>;
    text : String;

    constructor(private service : AppService, private router : Router){
      sessionStorage.clear();
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
      this.service.headerDict = {
        'authorization' : 'Bearer ' + sessionStorage.getItem('api-token')
      }
      sessionStorage.setItem("api-account-id", this.service.accountId.toString());
      sessionStorage.setItem("api-token", this.token.toString());
      this.router.navigate(['/dashboard']);
      // this.service.getAllStocks([])
      //     .subscribe((result) => {
      //       console.log(result);
      //     });
    }
  }