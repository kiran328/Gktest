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
  loading: boolean;
  error: string;
  constructor(private orderService: OrdersService) { }

  ngOnInit() {
    this.loading = true;
    this.orderService.getAllOrders()
      .subscribe(orders=>{
        this.loading = false;
        this.orders = orders;
      },err=>{
        this.error = "Something has went wrong";
        this.loading = false;
      })
  }

}
