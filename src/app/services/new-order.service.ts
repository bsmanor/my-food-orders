import { OrdersService } from './../orders.service';
import { Injectable, Component } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';

@Injectable()

@Component({
  selector: 'new-order-dialog',
  templateUrl: './new-order-dialog.html',
})

export class NewOrderService {

  constructor(public ordersService: OrdersService ,public dialogRef: MdDialogRef<NewOrderService>) { }

  newOrder(restName, hourOfOrder, name) {
    let date = new Date();
    let date2 = date.getFullYear() + '' + (date.getMonth()+1) + '' + date.getDate();
    this.ordersService.newOrder(restName, hourOfOrder, name, date2);
  }

}

