import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators/map';

import { environment } from 'src/environments/environment';
import { Order } from './Order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getAllOrders() {
    return this.http.get<Order[]>(`${environment.app_url}/getAllOrders`)
      .pipe(
        map(orders=>{
          return orders.map(order=> {
            return {...order, orderDate: new Date(order.orderDate)}
          });
        })
      )
  }
}
