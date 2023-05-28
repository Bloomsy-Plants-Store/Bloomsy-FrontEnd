import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
private Base_URL = "https://bloomsy.onrender.com/users/"
  constructor(private readonly myClient: HttpClient) { }


  // add product to cart
  // /:id/cart/add
  addProductToCart(id: Number, product_id: Number, price: Number, userToken: any, quantity: number = 1): Observable<any> {
    return this.myClient.post(this.Base_URL + id + "/cart/add", {product_id,price,quantity},{headers: new HttpHeaders().set('x-auth-token', userToken)});
  }

  // get all products in cart
  GetAllProductsInCart(id:Number) {
    return this.myClient.get(this.Base_URL+id+"/cart")
  }

  //delete specific product from cart
  deleteProductFromCart(id:Number , cartItemId:Number, userToken:any) {
    return this.myClient.delete(this.Base_URL + id+"/cart/"+cartItemId,{headers: new HttpHeaders().set('x-auth-token', userToken)});
  }

  // update specific product from cart
  // /:id/cart/:cartItemId
  updateSpecificProduct(id: Number, cartItemId: Number, quantity: Number, userToken:any) {
    return this.myClient.put(this.Base_URL + id + "/cart/" + cartItemId,{quantity} ,{headers: new HttpHeaders().set('x-auth-token', userToken)});
  }

  // delete all products from cart
  deleteAllProductsFromCart(userId: Number, ) {
    return this.myClient.delete(this.Base_URL + userId + "/cart/all",);
  }

}
