import { NewOrderService } from './../services/new-order.service';
import { OrdersComponent } from './../orders/orders.component';
import { OrdersService } from './../orders.service';
import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  orderModal = false;
  newJoin = false;
  web: boolean;

  constructor(private ordersService: OrdersService, public dialog: MdDialog) { }

  ngOnInit() {
    let mq = matchMedia("(min-width:899px)");
    this.web = mq.matches;
  }

  toggleNewOrder() {
    this.orderModal = !this.orderModal;
  }
  toggleNewJoin() {
    !this.newJoin;
  }

  newOrderDialog() {
    let dialogRef = this.dialog.open(NewOrderService);
    dialogRef.afterClosed().subscribe(); 
  }
  
}