import { JoinedKeys } from './joinedKeys';
import { Injectable } from '@angular/core';
import { Order } from './order';
import { Join } from './join';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class OrdersService {

  orders$: FirebaseListObservable<Order[]>;
  ordersObj$: FirebaseObjectObservable<Order[]>;
  joinedObj$: FirebaseObjectObservable<Join>;
  joined$: FirebaseListObservable<Join[]>;
  
  constructor( private af: AngularFire ) {

    this.orders$ = af.database.list('orders');
    this.ordersObj$ = af.database.object('orders');
    this.joinedObj$ = af.database.object('joined');
  }

  // Find all orders as list
  findAllOrders(): Observable<Order[]> {
    let date = new Date();
    let date2 = date.getFullYear().toString() + '' + (date.getMonth()+1).toString() + '' + date.getDate().toString();
    return this.af.database.list('orders', {
      query: {
        orderByChild: 'date',
        equalTo: date2
      }
    })
  }

  // Find all orders as object
  findAllOrdersObj(): Observable<Order> {
    return this.af.database.object('orders');
  }

  // Find who joined an order
  whoJoined(key): Observable<Join[]>{
    return this.af.database.list('orders/'+key+'/joined');
  }

  // Create new order
  newOrder(restName, hourOfOrder, name, date) {
    this.orders$.push({
      name: name,
      restName: restName,
      hourOfOrder: hourOfOrder,
      orderSent: false,
      arrived: false,
      status: 'OPEN',
      date: date,
      joined: [],
      viewJoined: false
    });
  }

  // Cancel order
  cancelOrder(key) {
    this.orders$.remove(key);
  }

  // Join order  
  joinOrder(key, name) {
    if (name.length == 0) {
      alert('Please enter your name for joining this order');
      return;
    } else {
      // this.joined$ = this.af.database.list('orders/'+key+'/joined');
      // this.joined$.push({name: name});
      let joined$ = this.af.database.list('orders/'+key+'/joined');
      joined$.push({name:name});
    }
  }
  
  // Set order as Sent
  orderSent(key) {
    this.orders$.update(key, {orderSent:true, status: 'ORDERED'});
  }
  undoOrderSent(key) {
    this.orders$.update(key, {arrived: false, orderSent:false, status: 'OPEN'});
  }

  // Set order as Arrived
  arrived(key) {
    this.orders$.update(key, {arrived:true, orderSent: true, status: 'ARRIVED'});
  }
  undoArrived(key) {
    this.orders$.update(key, {arrived:false, orderSent: true, status: 'ORDERED'});
  }

  // //Set viewJoined (true or false)
  // viewJoined(key) {
  //   this.orders$.update(key, {viewJoined: true});
  // }
  // undoViewJoined(key) {
  //   this.orders$.update(key, {viewJoined: false});
  // }
  
}

