import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { RevenueService } from 'src/app/Services/revenue.service';

@Component({
  selector: 'app-dashboard-revenue',
  templateUrl: './dashboard-revenue.component.html',
  styleUrls: ['./dashboard-revenue.component.css']
})
export class DashboardRevenueComponent {
  revenue:number=0;
  users:number=0;
  orders:number=0;

  constructor(private spinner: NgxSpinnerService, private revenueService:RevenueService) {}
  ngOnInit() {
    this.spinner.show();

    this.revenueService.GetTotalRevenue().subscribe({
      next: (response: any) => {
        console.log(response)
        this.revenue = response.totalRevenue;
        this.spinner.hide();
      },
      error: (err: any) => {
        console.log(err);
        this.spinner.hide();
      }
    });

    this.revenueService.GettotalUsers().subscribe({
      next: (response: any) => {
        console.log(response)
        this.users = response.users;
        this.spinner.hide();
      },
      error: (err: any) => {
        console.log(err);
        this.spinner.hide();
      }
    });

    this.revenueService.GettotalOrders().subscribe({
      next: (response: any) => {
        this.orders = response.message;
        this.spinner.hide();
      },
      error: (err: any) => {
        console.log(err);
        this.spinner.hide();
      }
    });

    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }
}
