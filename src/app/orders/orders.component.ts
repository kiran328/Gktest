import { Component, OnInit } from '@angular/core';

import { OrdersService } from './orders.service';
import { Order } from './Order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  constructor(private orderService: OrdersService) { }

  ngOnInit() {
    this.orderService.getAllOrders()
      .subscribe(orders=>{
        this.orders = orders;
      })
  }

}
