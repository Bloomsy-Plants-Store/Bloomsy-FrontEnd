import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  private Base_URL = "https://bloomsy.onrender.com/user/order/";
  http: any;

  constructor(private readonly myClient : HttpClient) { }

  GetOrdersByUserID(userID: number) {
    return this.myClient.get(this.Base_URL+"get-orders/"+userID);
  }

  makeOrder(userID: number, total_price: number, products: any) {
    return this.myClient.post(this.Base_URL + userID, { total_price, products });
  }

}

