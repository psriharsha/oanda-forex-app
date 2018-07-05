import { Routes } from '@angular/router';
import { StockComponent } from './stock/stock.component';
import { AppComponent } from './app.component';

const appRoutes : Routes= [
    { path: 'stock/:id',      component: StockComponent },
    { path: '',               component: AppComponent    }
  ];