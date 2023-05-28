import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  private Base_URL = "https://bloomsy.onrender.com/api/products/";
  http: any;

  constructor(private readonly myClient : HttpClient) { }


  GetAllProducts(){
    return this.myClient.get(this.Base_URL);
  }
  GetTopRating(){
    return this.myClient.get(this.Base_URL+"topRating?limit=8");
  }
  GetBestSelling(){
    return this.myClient.get(this.Base_URL+"bestSelling?limit=4");
  }
  StoreProduct(data: FormData, token:any): Observable<any> {
    return this.myClient.post(this.Base_URL + "store", data, {headers: new HttpHeaders().set('x-auth-token', token)});
  }

  GetProductByID(productId: number) {
    return this.myClient.get(this.Base_URL+productId);
  }
  UpdateProduct(productId: number, data: any): Observable<any> {
    console.log(data)
    return this.myClient.put(this.Base_URL + "update/" + productId, data);
  };

  DeleteProductById(id:any, token:any){
    return this.myClient.delete(this.Base_URL+id, {headers: new HttpHeaders().set('x-auth-token', token)});
  }

  getProductsByCategory(category: string): Observable<any> {
    return this.myClient.get(this.Base_URL +"product-category/"+ category);
  }
  getProductsByPrice(priceObject: string): Observable<any> {
    console.log("service")
    return this.myClient.get(this.Base_URL +`filter/product-price?object=${encodeURIComponent(JSON.stringify(priceObject))}`);
  }
  getEachCatgory(): Observable<any> {
    return this.myClient.get(this.Base_URL +`/All/Categories/Count`);
  }
}

