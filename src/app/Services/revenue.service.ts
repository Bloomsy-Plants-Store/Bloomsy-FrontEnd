import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RevenueService {

  private Base_URL = "https://bloomsy.onrender.com/";
  http: any;

  constructor(private readonly myClient : HttpClient) { }

  GettotalOrders() {
    return this.myClient.get(this.Base_URL+"total-orders/");
  }

  GetTotalRevenue() {
    return this.myClient.get(this.Base_URL+"revenue/");
  }

  GettotalUsers() {
    return this.myClient.get(this.Base_URL+"total-users/");
  }

}
