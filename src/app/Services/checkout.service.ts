import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CheckoutService {
  private Base_URL = "https://bloomsy.onrender.com/charge/"
  constructor(private readonly myClient: HttpClient) { }

  total: number = 0;
  cartItems = [];

  setCartObject(total: number, cart: any) {
    this.total = total;
    this.cartItems = cart;
  }

  sendDataToStripe(cardN:any, cardM:any , cardY :any, cardCVC :any) {
    return this.myClient.post(this.Base_URL, { cardN, cardM, cardY, cardCVC });
  }

}
