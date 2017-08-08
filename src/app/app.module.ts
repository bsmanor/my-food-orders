import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { firebaseConfig } from './../environments/firebase.config';
import { AngularFireModule } from 'angularfire2';

import { OrdersService } from './orders.service';
import { AppComponent } from './app.component';
import { DialogService } from './services/dialog.service';
import { CancelOrderService } from'./services/cancel-order.service';
import { NewOrderService } from './services/new-order.service';
import { JoinedService } from './services/joined.service';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { NewOrderComponent } from './new-order/new-order.component';
import { OrdersComponent } from './orders/orders.component';
import { TitleComponent } from './title/title.component';


@NgModule({

  declarations: [
    AppComponent,
    NewOrderComponent,
    OrdersComponent,
    TitleComponent,
    DialogService,
    CancelOrderService,
    NewOrderService,
    JoinedService
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    [MaterialModule.forRoot()],
    BrowserAnimationsModule
  ],
  exports: [
    
  ],
  entryComponents: [
    DialogService, 
    CancelOrderService,
    NewOrderService
  ],
  providers: [OrdersService, DialogService, CancelOrderService, NewOrderService, JoinedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
