import { BrowserModule } from '@angular/platform-browser';
import { SplitPaneModule } from 'ng2-split-pane/lib/ng2-split-pane';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { ReplaceStockName } from './stock/stock.pipe';
import { ReplaceStockPrice } from './price.pipe';
import { StockComponent } from './stock/stock.component';
import { ModalComponent } from './modal.component';

@NgModule({
  declarations: [
    AppComponent,
    StockComponent,
    ReplaceStockName,
    ReplaceStockPrice,
    ModalComponent
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
