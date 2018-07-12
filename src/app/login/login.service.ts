import { Injectable } from '@angular/core';
import { AppService } from '../app.service';

@Injectable()
export class LoginService{

    constructor(private appService : AppService){

    }
    isLoggedIn(){
        return (sessionStorage.getItem("api-account-id") != null && sessionStorage.getItem('api-token') != null)
    }
}
