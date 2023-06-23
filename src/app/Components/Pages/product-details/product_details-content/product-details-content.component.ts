import { Component, ElementRef, ViewChild } from '@angular/core';
import { CarouselComponent } from 'ngx-owl-carousel-o';
import { ProductsService } from 'src/app/Services/products.service';
import { CartService } from 'src/app/Services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FavouritesService } from 'src/app/Services/favourites.service';
import { Router } from '@angular/router';
import { CheckoutService } from 'src/app/Services/checkout.service';
import * as bootstrap from 'bootstrap';

export interface MyCartItem {
  product_id: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-product-details-content',
  templateUrl: './product-details-content.component.html',
  styleUrls: ['./product-details-content.component.css']
})
export class ProductDetailsComponent {
  quantity: number = 1;
  isFavorited: boolean = false;
  Product: any;
  @ViewChild('addToFavouriteModal') addToFavouriteModal!: ElementRef;
  @ViewChild('removeFromFavouriteModal') removeFromFavouriteModal!: ElementRef;
  favourite?:boolean;
  flag: any;
  cartItems: MyCartItem[] = [];

  constructor(private elementRef: ElementRef,
    public productService: ProductsService,
    public cartService:CartService,
    public favouritesService: FavouritesService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private router: Router,
    private checkoutService: CheckoutService,
    ) { }

  @ViewChild('carousel') carousel?: CarouselComponent;

  ngOnInit(): void {
    this.spinner.show();
    this.route.params.subscribe((params) => {
      const productId = params['id'];
      this.productService.GetProductByID(productId).subscribe({
        next: (response: any) => {
          this.Product = response.data;
          this.spinner.hide();
          // Check if the product is favorited
          if (localStorage.getItem('access_token') != null) {
            let userId = JSON.parse(localStorage.getItem('access_token')!).UserId;
            this.favouritesService.isProductFavorited(userId, productId).subscribe({
              next: (response: any) => {
                console.log(response);
                this.isFavorited = response.exists;
              },
              error: (err: any) => {
                console.log(err);
              }
            });
          }
        },
        error: (err: any) => {
          console.log(err);
          this.spinner.hide();
        }
      });
    });
  }

  showAddToFavouriteModal(){
    const modal = new bootstrap.Modal(this.addToFavouriteModal.nativeElement);
    modal.show();
  }

  showRemoveFromFavouriteModal(){
    const modal = new bootstrap.Modal(this.removeFromFavouriteModal.nativeElement);
    modal.show();
  }
  
  // add product to cart
  addProductToCart(id: any, price: any) {
    this.spinner.show();
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      // Redirect to login page
      this.router.navigate(['/login']);
      return;
    }
    const userId = JSON.parse(accessToken).UserId;
    if (!userId) {
      // Invalid access token, redirect to login page
      this.router.navigate(['/login']);
      return;
    }
    let userToken = localStorage.getItem('x-auth-token');
    this.cartService
      .addProductToCart(userId, id, price, userToken, this.quantity)
      .subscribe({
        next: (response: any) => {
          this.cartService.cartUpdatedSubject.next();
          this.spinner.hide();
        },
        error: (err: any) => {
          console.log(err);
          this.spinner.hide();
        },
      });
  }

  addOrRemoveFavourite(productId: any) {
    this.spinner.show();
    if (localStorage.getItem('access_token')) {
      let userId = JSON.parse(localStorage.getItem('access_token')!).UserId;
      if (this.isFavorited) {
        this.favouritesService.deleteProductFromFavourites(userId, productId).subscribe({
          next: (response: any) => {
            this.isFavorited = false;
            this.spinner.hide();
            this.showRemoveFromFavouriteModal();
          },
          error: (err: any) => {
            console.log(err);
            this.spinner.hide();
          }
        });
      } else {
        console.log("add");
        this.favouritesService.addProductToFavourites(userId, productId).subscribe({
          next: (response: any) => {
            this.isFavorited = true;
            this.spinner.hide();
            this.showAddToFavouriteModal();
          },
          error: (err: any) => {
            console.log(err);
            this.spinner.hide();
          }
        });
      }
    } else {
      this.router.navigate(['/login']);
    }

  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  totalPriceForAllProduct() {
    let totalPrice = 0;
      totalPrice +=  this.Product.price * this.quantity;
    return totalPrice;
  }

  GitProductToCheck(data: any) {
      const cartItem: MyCartItem = {
        product_id: data._id,
        quantity: this.quantity,
        price: data.price
      };
      this.cartItems.push(cartItem);
  }

  checkout() {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        this.router.navigate(['/login']);
      }
      else {

    if (JSON.parse(localStorage.getItem('access_token')!)) {
      let id = JSON.parse(localStorage.getItem('access_token')!).UserId;
      this.GitProductToCheck(this.Product);
      this.checkoutService.setCartObject(+this.totalPriceForAllProduct(),
      this.cartItems, this.flag = "buyNow");
    }
        this.router.navigate(['/checkout']);
      }

  }

  getStarsArray(rate: number): any[] {
    const starsCount = Math.floor(rate);
    const isHalfStar = rate % 1 !== 0;

    const starsArray = Array(starsCount).fill(0);

    if (isHalfStar) {
      starsArray.push(0.5);
    }
    return starsArray;
  }


}
