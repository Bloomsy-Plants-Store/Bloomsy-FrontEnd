import { Component , OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CartService } from 'src/app/Services/cart.service';
import { CheckoutService } from 'src/app/Services/checkout.service';
import { Router } from '@angular/router';


export interface Product {
  name: string;
  price: number;
  quantity: number;
  total: number;
}

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit{

  constructor( public myService: CartService, private checkoutService :CheckoutService, private router:Router) { }


  displayedColumns: string[] = ['image', 'name', 'price', 'quantity', 'total', 'delete'];

  dataSource: Product[] = [];

  decreaseQuantity(element:any) {
    if (element.quantity > 1) {
      element.quantity--;
    }
  }

  increaseQuantity(element:any) {
    element.quantity++;
  }

  totalPriceForAllProduct() {
    let total = 0;
    let totalPrice:Number = 0;
    this.dataSource.forEach((element: any) => {
      total += element.product_id.price * element.quantity;
      totalPrice = parseFloat(total.toFixed(3));
    });
    return totalPrice;
  }




  getAllProductsOnCart() {
    let userId = JSON.parse(localStorage.getItem('access_token')!).UserId;
    this.myService.GetAllProductsInCart(userId).subscribe({
      next: (response: any) => {
        this.dataSource = response.cart;
      },
      error: (err) => {
        console.log(err);
      }
   })
  }

  removeCartItem(element: any): void  {
    let userId = JSON.parse(localStorage.getItem('access_token')!).UserId;
    let userToken = localStorage.getItem('x-auth-token');
    let productId = element.product_id._id;
    console.log(productId);
    this.myService.deleteProductFromCart(userId, productId,userToken).subscribe({
      next: (response: any) => {
        this.getAllProductsOnCart();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  checkout() {
    this.checkoutService.setCartObject(+this.totalPriceForAllProduct(), this.dataSource);

  }

  updateQuantity(element: any): void {
    let user = JSON.parse(localStorage.getItem('access_token')!).UserId;
    let userToken = localStorage.getItem('x-auth-token');
    let productId = element.product_id._id;
    let quantity = element.quantity;
    this.myService.updateSpecificProduct(user, productId, quantity, userToken).subscribe({
      next: (response: any) => {
      },
      error: (err) => {
      console.log(err);
      }
    })
  }



  ngOnInit(): void {
    this.getAllProductsOnCart();
  }

   }

