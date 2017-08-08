import { DialogService } from '../services/dialog.service';
import { CancelOrderService } from'../services/cancel-order.service'
import { Observable } from 'rxjs/Rx';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Join } from './../join';
import { OrdersService } from './../orders.service';
import {  Component, 
          OnChanges, OnInit, AfterContentChecked, 
          Input, Output, EventEmitter, ViewContainerRef} from '@angular/core';
import {trigger, state, style, transition, animate, keyframes} from '@angular/core';
import { Order } from '../order';
import { MdDialog, MdDialogRef } from '@angular/material';
import 'rxjs/Rx';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  animations: [
    trigger('movePanel', [
      transition('void => *', [
        animate(0, keyframes([
          style({opacity: 0}),
          style({opacity: 1})
        ]))
      ]),
      transition('* => void', [
        animate(500, keyframes([
          style({transform: 'translateY(150%)', offset: .65}),
          style({transform: 'translateY(-100%)', offset: 1})
        ]))
      ])
    ])
  ]
})
export class OrdersComponent implements OnInit {

  orders$: Order[];
  ordersObj$: Order;
  joinedObj: Join;
  joined = [];
  joinedOrder = [];
  orderSent: boolean;
  emptyList: boolean;
  cols: number;
  ordersKeysArray = [];

  constructor(private ordersService: OrdersService, private af: AngularFire, public dialog: MdDialog) {}

  ngOnInit() {

    this.setScreenSize(); 
    this.getOrdersAsList();
  }

  //Set screen size
  setScreenSize() {
    let mqLarge = matchMedia("(min-width:900px)");
    let mqsmall = matchMedia("(max-width:899px)");
    if (mqLarge.matches) {
      //console.log('large matches');
      this.cols = 4;
    } else if (mqsmall.matches) {
      //console.log('small matches');
      this.cols = 1;
    }
  }

  //Get all orders
  getOrdersAsList() {
    let orderKey;
    let joinedKey;
    let joined = []
    this.ordersService.findAllOrders()    
      .subscribe(orders => {
        this.orders$ = orders
        if(orders.length == 0) {
          this.emptyList = true;
        } else if (orders.length > 0) {
          this.emptyList = false;
        }
      })
  }

  whoJoined(key) {
    let joinedList = [];
    this.ordersService.whoJoined(key)
      .map(res => {
        res.map(joined => {
          joinedList.push(joined.name)
          return joined
        })
        return res
      })
      .subscribe()
      console.log(joinedList);
      if (joinedList.length === 0) {
        alert ('No one joined this order yet.');
      } else {
        alert (joinedList);
      }
  }

  joinDialog(key) {
    let dialogRef = this.dialog.open(DialogService);
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'cancel' || result == null) {return}
      else {
        this.ordersService.joinOrder(key, result);
      }
    });
  }

  cancelOrderDialog(key) {
    let dialogRef = this.dialog.open(CancelOrderService);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 0) { return }
      else if(result === 1) {
        this.ordersService.cancelOrder(key);
      }
    })
  }

  ordered(x, key) {
    console.log(x);
      if(x) {
        this.ordersService.orderSent(key);
      }
      else {
        this.ordersService.undoOrderSent(key);
    }
  }
  
  arrived(x, key) {
    //if (isSent) { 
      if (x) {
        this.ordersService.arrived(key);
      } 
      else {
        this.ordersService.undoArrived(key);
      }
  }

}

