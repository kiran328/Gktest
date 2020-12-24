import { Customer } from "../customer/customer.model";

export class Order {
    orderID: number;
    customer: Customer;
    orderDetail: string;
    orderDate: Date;
    orderAmount: number;
}