import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { RouterModule } from '@angular/router';
import { DashboardPageComponent } from '../Components/Dashboard/dashboard-page/dashboard-page.component';
import { DashboardAllProductsComponent } from '../Components/Dashboard/dashboard-all-products/dashboard-all-products.component';
import { DashboardSidebarComponent } from '../Components/Dashboard/dashboard-sidebar/dashboard-sidebar.component';
import { DashboardRevenueComponent } from '../Components/Dashboard/dashboard-revenue/dashboard-revenue.component';
import { AllProductsTablePaginationComponent } from '../Components/Dashboard/all-products-table-pagination/all-products-table-pagination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';
import { DashboardHomeComponent } from '../Components/Dashboard/dashboard-home/dashboard-home.component';


@NgModule({
  declarations: [
    DashboardPageComponent,
    DashboardSidebarComponent,
    DashboardAllProductsComponent,
    AllProductsTablePaginationComponent,
    DashboardRevenueComponent,
    DashboardHomeComponent
  ],
  exports: [
    DashboardPageComponent,
    DashboardSidebarComponent,
    DashboardAllProductsComponent,
    AllProductsTablePaginationComponent,
    DashboardRevenueComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    DashboardRoutingModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    RouterModule.forChild([
      { path: '', component: DashboardPageComponent }
    ])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class DashboardModule { }
