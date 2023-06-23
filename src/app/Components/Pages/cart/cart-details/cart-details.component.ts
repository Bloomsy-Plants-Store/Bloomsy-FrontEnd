import { Component , OnInit} from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';
import { CheckoutService } from 'src/app/Services/checkout.service';
import { Router } from '@angular/router';


export interface Product {
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export interface MyCartItem {
  product_id: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit{

  constructor(public myService: CartService,
    private checkoutService: CheckoutService,
    private router: Router) {
    this.getAllProductsOnCart();
   }


  displayedColumns: string[] = ['image', 'name', 'price', 'quantity', 'total', 'delete'];

  dataSource: Product[] = [];
  cartItems: MyCartItem[] = [];

  flag : any;
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
    if (localStorage.getItem('access_token') != null) {
      let userId = JSON.parse(localStorage.getItem('access_token')!).UserId;
      this.myService.GetAllProductsInCart(userId).subscribe({
        next: (response: any) => {
          this.dataSource = response.cart;
          // get product details that are needed
          this.getMinimizeProduct(response.cart);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  getMinimizeProduct(cart: any) {
    for (let oneItem of cart) {
      const { product_id, quantity, price } = oneItem;
      const existingItemIndex = this.cartItems.findIndex(item => item.product_id === product_id._id);

      if (existingItemIndex !== -1) {
        // Update the quantity of the existing item
        this.cartItems[existingItemIndex].quantity = quantity;
      } else {
        // Add a new item to the cartItems array
        const cartItem: MyCartItem = {
          product_id: product_id._id,
          quantity: quantity,
          price: price
        };
        this.cartItems.push(cartItem);
      }
    }
  }




  removeCartItem(element: any): void {
    let userId = JSON.parse(localStorage.getItem('access_token')!).UserId;
    let userToken = localStorage.getItem('x-auth-token');
    let productId = element.product_id._id;

    this.myService.deleteProductFromCart(userId, productId, userToken).subscribe({
      next: (response: any) => {
        // Remove the item from cartItems array
        const itemIndex = this.cartItems.findIndex(item => item.product_id === productId);
        if (itemIndex !== -1) {
          this.cartItems.splice(itemIndex, 1);
        }

        // Notify cart update
        this.myService.cartUpdatedSubject.next();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  checkout() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      this.router.navigate(['/login']);
    }
    else {
      this.checkoutService.setCartObject(+this.totalPriceForAllProduct(), this.cartItems, this.flag = "checkout");
      this.router.navigate(['/checkout']);
    }

  }

  updateQuantity(element: any): void {
    let user = JSON.parse(localStorage.getItem('access_token')!).UserId;
    let userToken = localStorage.getItem('x-auth-token');
    let productId = element.product_id._id;
    let quantity = element.quantity;
    this.myService.updateSpecificProduct(user, productId, quantity, userToken)
      .subscribe({
        next: (response: any) => {
          this.myService.cartUpdatedSubject.next();
      },
      error: (err) => {
      console.log(err);
      }
    })
  }



  ngOnInit(): void {
    this.myService.cartUpdatedObservable.subscribe(() => {
      this.getAllProductsOnCart();
    })

  }

   }

