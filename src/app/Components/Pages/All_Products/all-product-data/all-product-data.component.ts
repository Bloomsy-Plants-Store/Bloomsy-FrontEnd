import {
  Component,
  ElementRef,
  OnInit,
  Input,
  SimpleChanges,
} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductsService } from 'src/app/Services/products.service';
import { CartService } from 'src/app/Services/cart.service';
import { Router } from '@angular/router';
import { CartDetailsComponent } from '../../../Pages/cart/cart-details/cart-details.component';
import { FavouritesService } from 'src/app/Services/favourites.service';
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
  favoritesMap: Map<string, boolean> = new Map<string, boolean>();

  @Input() FiltercategoryName: any;
  @Input() FilterPriceRange: any;

  constructor(
    private elementRef: ElementRef,
    public myService: ProductsService,
    public myCartService: CartService,
    private spinner: NgxSpinnerService,
    private router: Router,
    public favouritesService: FavouritesService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.FiltercategoryName) {
      if(this.FiltercategoryName==="ALL Products")
      {
        this.DefaultAllProducts();
      }
      this.FilterByCategory();
    }

    if (  changes['FilterPriceRange'] &&
      !changes['FilterPriceRange'].firstChange) {
      this.FilterByPrice();
    }
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
   this.DefaultAllProducts()
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
          this.spinner.hide();
        },
        error: (err: any) => {
          console.log(err);
          this.spinner.hide();
        },
      });
  }

  addOrRemoveFavourite(productId: any) {
    console.log(this.isFavorited);
    let userId = JSON.parse(localStorage.getItem('access_token')!).UserId;
    const isFavorited = this.favoritesMap.get(productId) || false;

    if (isFavorited) {
      console.log("delete");
      this.favouritesService.deleteProductFromFavourites(userId, productId).subscribe({
        next: (response: any) => {
          this.favoritesMap.set(productId, false);
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    } else {
      console.log("add");
      this.favouritesService.addProductToFavourites(userId, productId).subscribe({
        next: (response: any) => {
          this.favoritesMap.set(productId, true);
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    }
  }

  checkProductInFavourites() {
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
