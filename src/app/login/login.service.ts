import { Injectable } from '@angular/core';
import { ipcRenderer, IpcRenderer } from 'electron';

import { AppService } from '../app.service';

@Injectable()
export class LoginService {

    _ipc : IpcRenderer | undefined;
    accountId : string;
    apiToken : string;
    store : undefined;
    constructor(private appService: AppService) {
        this.initializeIPC();
        this.accountId = undefined;
        this.apiToken = undefined;
    }
    isLoggedIn() : Boolean {
        if (this.isElectronApp())
            return (this.apiToken != undefined) && (this.accountId != undefined);
        else
            return (sessionStorage.getItem("api-account-id") != null && sessionStorage.getItem('api-token') != null);
    }

    isElectronApp(){
        return this._ipc != undefined;
    }

    login(id: string, token : string) {        
        if (this.isElectronApp()){
            // this.store.set("api-account-id", id);
            // this.store.set("api-token", token);
            this._ipc.send('login', id, token);
            this._ipc.sendSync('getLoginDetails');
        }else{
            sessionStorage.setItem("api-account-id", id);
            sessionStorage.setItem("api-token", token);
        }
        this.appService.accountId = id;
        this.appService.headerDict = {
            'authorization': 'Bearer ' + token
        }
        this.accountId = id;
        this.apiToken = token;
        console.log("In Login Method");
    }

    initializeIPC() {
        if (window.require) {
          try {
            this._ipc = window.require('electron').ipcRenderer;
            this._ipc.send('getLoginDetails');
            this._ipc.on('loginCredentials', (event, accountId, token) => {
                console.log("Hehe got data");
                this.accountId = accountId;
                this.apiToken = token;
            });
          } catch (e) {
            throw e;
          }
        } else {
          this._ipc = undefined;
          this.store = undefined;
        }
      }
}
