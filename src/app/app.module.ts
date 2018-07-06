import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { SplitPaneModule } from 'ng2-split-pane/lib/ng2-split-pane';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { SortablejsModule } from 'angular-sortablejs';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { ReplaceStockName } from './stock/stock.pipe';
import { ReplaceStockPrice } from './price.pipe';
import { StockComponent } from './stock/stock.component';
import { ModalComponent } from './modal.component';
import { StockDetailComponent } from './stock/stock-detail.component';
import { MainComponent } from './main.component';

const appRoutes : Routes= [
  { path: 'stock/:name',      component: StockDetailComponent },
  { path: 'app',               component: MainComponent    },
  { path: '',
    redirectTo: '/app',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  declarations: [
    MainComponent,
    AppComponent,
    StockComponent,
    ReplaceStockName,
    ReplaceStockPrice,
    ModalComponent,
    StockDetailComponent
  ],
  imports: [    
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    SplitPaneModule,
    FormsModule,
    HttpModule,
    SortablejsModule.forRoot({ animation: 150 })
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
