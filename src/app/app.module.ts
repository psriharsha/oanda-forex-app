import { BrowserModule } from '@angular/platform-browser';
import { SplitPaneModule } from 'ng2-split-pane/lib/ng2-split-pane';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { ReplaceStockName } from './stock.pipe';
import { ReplaceStockPrice } from './price.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ReplaceStockName,
    ReplaceStockPrice
  ],
  imports: [
    BrowserModule,
    SplitPaneModule,
    FormsModule,
    HttpModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
