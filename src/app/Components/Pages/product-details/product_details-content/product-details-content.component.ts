import { Component, ElementRef, ViewChild } from '@angular/core';
import { CarouselComponent } from 'ngx-owl-carousel-o';
import { ProductsService } from 'src/app/Services/products.service';
import { CartService } from 'src/app/Services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FavouritesService } from 'src/app/Services/favourites.service';


@Component({
  selector: 'app-product-details-content',
  templateUrl: './product-details-content.component.html',
  styleUrls: ['./product-details-content.component.css']
})
export class ProductDetailsComponent {
  quantity: number = 1;
  isFavorited: boolean = false;
  Product: any;
  favourite?:boolean;

  constructor(private elementRef: ElementRef,
    public productService: ProductsService,
    public cartService:CartService,
    public favouritesService: FavouritesService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
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
        },
        error: (err: any) => {
          console.log(err);
          this.spinner.hide();
        }
      });
    });
  }

  addProductToCart(id: any,itemQuantity:number) {
    this.spinner.show();
    console.log(itemQuantity);
    let userId = JSON.parse(localStorage.getItem('access_token')!).UserId;
    let userToken = JSON.parse(localStorage.getItem('x-auth-token')!);
    this.cartService.addProductToCart(userId, id,userToken,itemQuantity).subscribe({
      next: (response: any) => {
        this.spinner.hide();
      },
      error: (err: any) => {
        console.log(err);
        this.spinner.hide();
      }
    });
  }

  addOrRemoveFavourite(productId: any) {
    console.log(this.isFavorited);
    let userId = JSON.parse(localStorage.getItem('access_token')!).UserId;
    if (this.isFavorited) {
      console.log("delete");
      this.favouritesService.deleteProductFromFavourites(userId, productId).subscribe({
        next: (response: any) => {
          this.isFavorited = false;
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    } else {
      console.log("add");
      this.favouritesService.addProductToFavourites(userId, productId).subscribe({
        next: (response: any) => {
          this.isFavorited = true;
        },
        error: (err: any) => {
          console.log(err);
        }
      });
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

  // toggleFavorite(): void {
  //   this.isFavorited = !this.isFavorited;
  // }

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