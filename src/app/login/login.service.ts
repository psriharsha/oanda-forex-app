import { Injectable } from '@angular/core';
import { ipcRenderer, IpcRenderer } from 'electron';

import { AppService } from '../app.service';

@Injectable()
export class LoginService {

    _ipc : IpcRenderer | undefined;
    store : undefined;
    constructor(private appService: AppService) {
        this.initializeIPC();
    }
    isLoggedIn() {
        return (sessionStorage.getItem("api-account-id") != null && sessionStorage.getItem('api-token') != null)
    }

    isElectronApp(){
        return this._ipc != undefined;
    }

    login(id: string, token : string) {        
        if (this.isElectronApp()){
            // this.store.set("api-account-id", id);
            // this.store.set("api-token", token);
        }else{
            sessionStorage.setItem("api-account-id", id);
            sessionStorage.setItem("api-token", token);
        }
        this.appService.accountId = id;
        this.appService.headerDict = {
            'authorization': 'Bearer ' + token
        }
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
          this.store = undefined;
        }
      }
}
