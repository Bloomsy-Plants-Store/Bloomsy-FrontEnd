
import { Component, ElementRef, OnInit } from '@angular/core';
import { OrderService } from 'src/app/Services/order.service';
import { ProductsService } from 'src/app/Services/products.service';
import { CartService } from 'src/app/Services/cart.service';
import { FavouritesService } from 'src/app/Services/favourites.service';
@Component({
  selector: 'app-profile-content',
  templateUrl: './profile-content.component.html',
  styleUrls: ['./profile-content.component.css']
})
export class ProfileContentComponent {
  Orders: any;
  ordersNumber: any
  FavouriteNumber: any
  ordersProducts: any
  favourites: any[] = []
  customOrders: any[] = []
  customOrder: any[] = []
  clickedOrderProducts: any[] = []
  clickedOrder: { [key: string]: any } = {}
  currentPage = 1; // Current page number
  itemsPerPage = 12; // Number of items to display per page
  totalItems = 0;
  selectedOrder: any;
  orderStatus: any;
  userId: any | null = null;
  userName: any;
  constructor(private elementRef: ElementRef, public favouritesService: FavouritesService, public orderService: OrderService, public productService: ProductsService, public myCartService: CartService) { }

  ngOnInit(): void {
    let accessToken = localStorage.getItem('access_token');
    let custom: { [key: string]: any } = {};
    let customFavourite: { [key: string]: any } = {};
    if (accessToken) {
      this.userId = JSON.parse(accessToken).UserId;
      this.userName = JSON.parse(accessToken).UserName
    }
    this.orderService.GetOrdersByUserID(this.userId).subscribe({
      next: (response: any) => {
        this.Orders = response.orders;
        this.ordersNumber = this.Orders.length
        this.totalItems = this.Orders.length;
        this.Orders.forEach((element: Order) => {
          let products = element.products
          console.log(products);
          products.forEach(product => {
            this.productService.GetProductByID(product.product_id).subscribe({
              next: (response: any) => {
                custom['total_price'] = element.total_price
                custom['_id'] = element._id
                custom['items'] = element.products.length
                custom['imageUrl'] = response.data.imageUrl
                this.customOrder.push(custom)
                let or = this.customOrder
                const uniqueOrders: Order[] = [];
                const idSet = new Set<string>();
                or.forEach(order => {
                  if (!idSet.has(order._id)) {
                    idSet.add(order._id);
                    uniqueOrders.push(order);
                  }
                });
                this.customOrders = uniqueOrders
                console.log(this.customOrders);
                custom = {}
              },
              error: (err) => {
                console.log(err);
              }
            })
          })
        });
      },
      error: (err) => {
        console.log(err);
      }
    })
    // favourites
    this.getAllProductsInFavourites()
  }

  getAllProductsInFavourites() {
    this.favouritesService.GetAllProductsInFavourites(this.userId).subscribe({
      next: (response: any) => {
        this.favourites = response.favourites
        this.FavouriteNumber = this.favourites.length
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getUpperBound(): number {
    const upperBound = (this.currentPage - 1) * this.itemsPerPage + this.itemsPerPage;
    return Math.min(upperBound, this.totalItems);
  }

  deleteFromFavourite(product: any) {
    this.favouritesService.deleteProductFromFavourites(this.userId, product._id).subscribe({
      next: (response: any) => {
        this.getAllProductsInFavourites()
      },
      error: (err) => {
        console.log(err);
      }
    })

  }

  changeTabContent(order: any) {
    this.clickedOrderProducts = []
    this.clickedOrder = (this.Orders).find((orderr: Order) => { return orderr._id == order._id });
    console.log(this.clickedOrder);

    let custom: { [key: string]: any } = {};
    (this.clickedOrder['products']).forEach((product: any) => {
      this.productService.GetProductByID(product.product_id).subscribe({
        next: (response: any) => {
          custom = response.data
          custom['quantity'] = product.quantity
          console.log(custom)
          this.clickedOrderProducts.push(custom)
          custom = {}
        },
        error: (err) => {
          console.log(err);
        }
      })

    })
    this.selectedOrder = order;
    const ordersTab = document.getElementById('ex-with-icons-tabs-1');
    const tab = document.getElementById('ex-with-icons-tabs-4');
    if (ordersTab) {
      ordersTab.classList.remove('show', 'active');
      tab?.classList.add('show', 'active')
    }
  }
  returnTabContent() {
    const ordersTab = document.getElementById('ex-with-icons-tabs-1');
    const tab = document.getElementById('ex-with-icons-tabs-4');
    if (ordersTab) {
      ordersTab.classList.add('show', 'active');
      tab?.classList.remove("show", "active")
    }
  }
  handleFavorite() {
    const tab = document.getElementById('ex-with-icons-tabs-4');
    tab?.classList.remove("show", "active")
  }
  getStatusColor(): string {
    switch (this.clickedOrder['status']) {
      case 'pending':
        return '#207bd6'; // Blue color for active status
      case 'canceled':
        return '#ff0000'; // Red color for cancelled status
      case 'delivered':
        return '#4BB543';
      default:
        return '#000000'; // Default color if status is not recognized
    }
  }

  cancelOrder() {
    this.orderService.cancelOrder(this.userId,this.clickedOrder["_id"]).subscribe({
      next: (response: any) => {
        this.clickedOrder['statuts'] = 'canceled';
        window.location.reload()
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}

interface Order {
  products: any[];
  total_price: number;
  _id: any;
  // Other properties of the product
}

interface Favourites {
  products: any[];
  total_price: number;
  _id: any;
  // Other properties of the product
}
