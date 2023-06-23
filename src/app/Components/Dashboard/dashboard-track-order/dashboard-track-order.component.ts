
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {OrderService} from 'src/app/Services/order.service'
import { CheckoutService } from 'src/app/Services/checkout.service';


@Component({
  selector: 'app-dashboard-track-order',
  templateUrl: './dashboard-track-order.component.html',
  styleUrls: ['./dashboard-track-order.component.css']
})
export class DashboardTrackOrderComponent implements OnInit {
  pending: any[] = [];
  delivers: any[] = [];
  confirmed: any[] = [];

  constructor(
    private orderService: OrderService,
    private checkOutService: CheckoutService
    ) { this.getOrders(); }

    ngOnInit(): void {
      this.orderService.orderUpdated.subscribe(() => {
        console.log('Order updated. Getting orders...');
        this.getOrders();
      });


    }

  getOrders() {
    this.orderService.getOrders().subscribe(
      (orders: any[]) => {
        let counter = 1;
        orders.forEach(order => {
          const mappedOrder = {
            orderId: order._id,
            userName: order.userName,
            total: order.total,
            userId: order.userId,
            counter: counter++,
            status: order.status
          };
          if (order.status === 'pending') {
            this.pending.push(mappedOrder);
          } else if (order.status === 'delivered') {
            this.delivers.push(mappedOrder);
          } else if (order.status === 'confirmed') {
            this.confirmed.push(mappedOrder);
          }
        });
      },
      (error: any) => {
        console.error('Failed to retrieve orders', error);
      }
    );
  }





  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      // Move item within the same list
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {

      const order :any= event.previousContainer.data[event.previousIndex];
      const status = event.container.id;

      if (status === 'cdk-drop-list-1') {
        this.confirmOrder(order['orderId'], order['userId']);
      }
      else if (status === 'cdk-drop-list-2') {
        this.deliverOrder(order['orderId'], order['userId']);
      }
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }


  confirmOrder(orderId: any, userId:any) {
    this.orderService.confirmOrder(orderId,userId).subscribe({
        next:() => {
          console.log('Order confirmed successfully');
        },
        error:(error: any) => {
          console.error('Failed to confirm order', error);
        }
      }

    );
  }

  deliverOrder(orderId: any, userId:any) {
    this.orderService.deliverOrder(orderId,userId).subscribe(
      {
        next:() => {
          console.log('Order delivered successfully');
        },
        error:(error: any) => {
          console.error('Failed to delivered order', error);
        }
      }
    );
  }
}

