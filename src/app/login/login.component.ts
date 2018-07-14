import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

import { LoginService } from './login.service';

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

    constructor(private appService : AppService,
                private loginService : LoginService,
                private router : Router){
      sessionStorage.clear();
      this.accounts = new Array();
    }

    checkForValidAccounts(){
      this.appService.getAccounts(this.token)
        .subscribe((result) => {
          this.accounts = result.accounts;
        })
    }

    selectedAccount(id : String){
      this.loginService.login(id.toString(), this.token.toString());
      this.router.navigate(['/dashboard']);
      // this.service.getAllStocks([])
      //     .subscribe((result) => {
      //       console.log(result);
      //     });
    }
  }