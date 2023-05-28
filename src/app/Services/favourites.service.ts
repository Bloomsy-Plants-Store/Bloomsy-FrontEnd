import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  private Base_URL = "https://bloomsy.onrender.com/users/"
  constructor(private readonly myClient: HttpClient) { }


  // add product to favourites
  // /:id/favourites/add
  addProductToFavourites(id: Number, product_id: Number) {
    return this.myClient.post(this.Base_URL + id + "/favourites/add", { product_id });
  }

  // get all products in favourites
  GetAllProductsInFavourites(id:Number) {
    return this.myClient.get(this.Base_URL+id+"/favourites")
  }

  //delete specific product from favourites
  deleteProductFromFavourites(id:Number , favouritesItemId:Number) {
    return this.myClient.delete(this.Base_URL + id+"/favourites/"+favouritesItemId);
  }

  isProductFavorited(id: number, product_id: number) {
    return this.myClient.get(this.Base_URL + id + "/favourites/check/" + product_id);
  }

}
