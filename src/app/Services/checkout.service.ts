import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../config';



@Injectable({
  providedIn: 'root'
})

export class CheckoutService {
  private Base_URL = `${config.backendUrl}/charge/`
  constructor(private readonly myClient: HttpClient) { }


  total: number = 0;
  cartItems = [];
  flag : any;

  setCartObject(total: number, cart: any, flag : any) {
    this.total = total;
    this.cartItems = cart;
    this.flag = flag;
  }

  sendDataToStripe(cardN:any, cardM:any , cardY :any, cardCVC :any) {
    return this.myClient.post(this.Base_URL, { cardN, cardM, cardY, cardCVC });

  }

}
