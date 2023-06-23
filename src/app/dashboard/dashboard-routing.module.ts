import { DashboardPageComponent } from '../Components/Dashboard/dashboard-page/dashboard-page.component';
import { DashboardAllProductsComponent } from '../Components/Dashboard/dashboard-all-products/dashboard-all-products.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardRevenueComponent } from '../Components/Dashboard/dashboard-revenue/dashboard-revenue.component';
import { DashboardTrackOrderComponent } from '../Components/Dashboard/dashboard-track-order/dashboard-track-order.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
    children: [
      { path: '', component: DashboardRevenueComponent  },
      { path: 'all-products', component: DashboardAllProductsComponent },
      {path: 'trackOrder', component: DashboardTrackOrderComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }