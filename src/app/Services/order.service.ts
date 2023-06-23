import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { config } from '../config';
@Injectable({
  providedIn: 'root'
})

export class OrderService {


  public orderSubject: Subject<void> = new Subject<void>();
  public orderUpdated: Observable<void> = this.orderSubject.asObservable();
  private Base_URL = `${config.backendUrl}/user/order/`;
  http: any;



  constructor(private readonly myClient : HttpClient) { }

  GetOrdersByUserID(userID: number): Observable<any> {
    return this.myClient.get(this.Base_URL+"get-orders/"+userID);
  }

  makeOrder(userID: number, total_price: number, products: any): Observable<any> {
    console.log(userID,total_price,products)
    return this.myClient.post(this.Base_URL + userID, { total_price, products });
  }

  cancelOrder(userID: number,orderID: any) {
    return this.myClient.post(this.Base_URL + "cancel-order/" + userID, { orderId: orderID });
  }

  confirmOrder(orderID: number,userID: number): Observable<any> {
    return this.myClient.post(this.Base_URL + "confirm-order" , {orderID,userID});
  }
  deliverOrder(orderID: number,userID: number): Observable<any> {
    return this.myClient.post(this.Base_URL + "deliver-order" , {orderID,userID});
  }

  getOrders(): Observable<any> {
    return this.myClient.get<any[]>(this.Base_URL + 'get-pending-orders');
  }

}

