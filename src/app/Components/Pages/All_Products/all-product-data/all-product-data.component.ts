import {
  Component,
  ElementRef,
  OnInit,
  Input,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductsService } from 'src/app/Services/products.service';
import { CartService } from 'src/app/Services/cart.service';
import { Router } from '@angular/router';
import { CartDetailsComponent } from '../../../Pages/cart/cart-details/cart-details.component';
import { FavouritesService } from 'src/app/Services/favourites.service';
import * as bootstrap from 'bootstrap';
@Component({
  selector: 'app-all-product-data',
  templateUrl: './all-product-data.component.html',
  styleUrls: ['./all-product-data.component.css'],
})
export class AllProductDataComponent implements OnInit {
  Products: any;
  currentPage = 1; // Current page number
  itemsPerPage = 12; // Number of items to display per page
  totalItems = 0;
  isFavorited: boolean = false;
  @ViewChild('addToFavouriteModal') addToFavouriteModal!: ElementRef;
  @ViewChild('removeFromFavouriteModal') removeFromFavouriteModal!: ElementRef;
  favoritesMap: Map<string, boolean> = new Map<string, boolean>();
  FiltercategoryName: any;
  PriceFlag=false;

  FilterPriceRange: any;

  constructor(
    private elementRef: ElementRef,
    public myService: ProductsService,
    public myCartService: CartService,
    private spinner: NgxSpinnerService,
    private router: Router,
    public favouritesService: FavouritesService,
  ) {   this.DefaultAllProducts()
  }

  showAddToFavouriteModal(){
    const modal = new bootstrap.Modal(this.addToFavouriteModal.nativeElement);
    modal.show();
  }

  showRemoveFromFavouriteModal(){
    const modal = new bootstrap.Modal(this.removeFromFavouriteModal.nativeElement);
    modal.show();
  }

  FilterByCategory()
  {
    this.spinner.show();
    this.myService.getProductsByCategory(this.FiltercategoryName).subscribe({
      next: (response: any) => {
        this.Products = response.data;
        this.totalItems = this.Products.length;
        this.checkProductInFavourites();
        this.spinner.hide();
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
      },
    });
  }

  FilterByPrice(){
    this.myService.getProductsByPrice(this.FilterPriceRange).subscribe({
      next: (response: any) => {
        this.Products = response.data;
        console.log(this.Products)
        this.totalItems = this.Products.length;
        console.log(this.totalItems)
        this.checkProductInFavourites();
        this.spinner.hide();
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
      },
    });
  }

  DefaultAllProducts()
  {
    this.spinner.show();
    this.myService.GetAllProducts().subscribe({
      next: (response: any) => {
        this.Products = response.data;
        console.log(this.Products);
        this.totalItems = this.Products.length;
        this.checkProductInFavourites();
        this.spinner.hide();
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
      },
    });
  }

  ngOnInit(): void {
    let prevCategoryValue:any;
    let prevPriceValue: any;

    this.myService.categoryObserver$.subscribe((value: any) => {
      console.log("prevCategoryValue",prevCategoryValue)
      if (value !== prevCategoryValue) {
        this.FiltercategoryName = value;
        if (this.FiltercategoryName === "ALL Products") {
          this.DefaultAllProducts();
        } else {
            this.FilterByCategory();
        }
      }
      prevCategoryValue = value;
    });

    this.myService.priceObserver$.subscribe((value: any) => {
      if (value !== prevPriceValue &&this.FiltercategoryName === "ALL Products") {
        this.FilterPriceRange = value;
        this.FilterByPrice();
      }
      prevPriceValue = value;
    });
  }

  getUpperBound(): number {
    const upperBound =
      (this.currentPage - 1) * this.itemsPerPage + this.itemsPerPage;
    return Math.min(upperBound, this.totalItems);
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
    this.myCartService
      .addProductToCart(userId, id, price, userToken)
      .subscribe({
        next: (response: any) => {
          this.myCartService.cartUpdatedSubject.next();
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
    let userId = JSON.parse(localStorage.getItem('access_token')!).UserId;
    const isFavorited = this.favoritesMap.get(productId) || false;

    if (isFavorited) {
      this.favouritesService.deleteProductFromFavourites(userId, productId).subscribe({
        next: (response: any) => {
          this.favoritesMap.set(productId, false);
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
          this.favoritesMap.set(productId, true);
          this.spinner.hide();
          this.showAddToFavouriteModal();
        },
        error: (err: any) => {
          console.log(err);
          this.spinner.hide();
        }
      });
    }
  }

  checkProductInFavourites() {
     if (localStorage.getItem('access_token') != null) {
      let userId = JSON.parse(localStorage.getItem('access_token')!).UserId;
      this.Products.forEach((element: any) => {
        this.favouritesService.isProductFavorited(userId, element._id).subscribe({
          next: (response: any) => {
            this.favoritesMap.set(element._id, response.exists);
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      });
    }

  }
}
