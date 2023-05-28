import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
private Base_URL = "https://bloomsy.onrender.com/users/"
  constructor(private readonly myClient: HttpClient) { }
  public cartUpdatedSubject: Subject<void> = new Subject<any>();
  public cartUpdatedObservable: Observable<void> = this.cartUpdatedSubject.asObservable();

  // add product to cart
  // /:id/cart/add
  addProductToCart(id: Number, product_id: Number, price: Number, userToken: any, quantity: number = 1): Observable<any> {
    return this.myClient.post(this.Base_URL + id + "/cart/add", {product_id,price,quantity},{headers: new HttpHeaders().set('x-auth-token', userToken)});
  }

  // get all products in cart
  GetAllProductsInCart(id:Number): Observable<any> {
    return this.myClient.get(this.Base_URL+id+"/cart")
  }

  //delete specific product from cart
  deleteProductFromCart(id:Number , cartItemId:Number, userToken:any): Observable<any> {
    return this.myClient.delete(this.Base_URL + id+"/cart/"+cartItemId,{headers: new HttpHeaders().set('x-auth-token', userToken)});
  }

  // update specific product from cart
  // /:id/cart/:cartItemId
  updateSpecificProduct(id: Number, cartItemId: Number, quantity: Number, userToken:any): Observable<any> {
    return this.myClient.put(this.Base_URL + id + "/cart/" + cartItemId,{quantity} ,{headers: new HttpHeaders().set('x-auth-token', userToken)});
  }

  // delete all products from cart
  deleteAllProductsFromCart(userId: Number, ): Observable<any> {
    return this.myClient.delete(this.Base_URL + userId + "/cart/all",);
  }

}
