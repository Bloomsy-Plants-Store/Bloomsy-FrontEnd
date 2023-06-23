import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './Components/Pages/Home/home-page/home-page.component';
import { NavbarComponent } from './Components/Partials/navbar/navbar.component';
import { BannersComponent } from './Components/Pages/Home/banners/banners.component';
import { HeaderComponent } from './Components/Pages/Home/header/header.component';
import { SampleProductsComponent } from './Components/Pages/Home/sample-products/sample-products.component';
import { ReviewComponent } from './Components/Pages/Home/review/review.component';
import { AboutComponent } from './Components/Pages/Home/about/about.component';
import { SupportComponent } from './Components/Pages/Home/support/support.component';
import { FooterComponent } from './Components/Partials/footer/footer.component';
import { ScrollTopComponent } from './Components/Pages/Home/scroll-top/scroll-top.component';
import { RegisterComponent } from './Components/Pages/Login_Register/register/register.component';
import { ContactUsBannerComponent } from './Components/Pages/Contact Us/contact-us-banner/contact-us-banner/contact-us-banner.component';
import { ContactUsPageComponent } from './Components/Pages/Contact Us/contact-us-page/contact-us-page.component';
import { ContactUsFormComponent } from './Components/Pages/Contact Us/contact-us-form/contact-us-form/contact-us-form.component';
import { AboutUsHeaderComponent } from './Components/Pages/about-us/about-us-header/about-us-header.component';
import { ALlProductsComponent } from './Components/Pages/All_Products/all-products/all-products.component';
import { AllProductsHeaderComponent } from './Components/Pages/All_Products/all-products-header/all-products-header.component';
import { LoginComponent } from './Components/Pages/Login_Register/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResetPasswordComponent } from './Components/Pages/Login_Register/reset-password/reset-password.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProductDetailsComponent } from './Components/Pages/product-details/product_details-content/product-details-content.component';
import { AboutUsBriefComponent } from './Components/Pages/about-us/about-us-brief/about-us-brief.component';
import { AboutUsGalleryComponent } from './Components/Pages/about-us/about-us-gallery/about-us-gallery.component';
import { AboutUsInfoComponent } from './Components/Pages/about-us/about-us-info/about-us-info.component';
import { AboutUsReviewComponent } from './Components/Pages/about-us/about-us-review/about-us-review.component';
import { AboutUsPageComponent } from './Components/Pages/about-us/about-us-page/about-us-page.component';
import { CheckoutComponent } from './Components/Pages/checkout/checkout.component';
import { FilterSideBarComponent } from './Components/Pages/All_Products/filter-side-bar/filter-side-bar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { AllProductDataComponent } from './Components/Pages/All_Products/all-product-data/all-product-data.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {NgxPaginationModule} from 'ngx-pagination';
import { ProductDetailsHeaderComponent } from './Components/Pages/product-details/product-details-header/product-details-header.component';
import { ProductDetailsPageComponent } from './Components/Pages/product-details/product-details-page/product-details-page.component';
import { CartHeaderComponent } from './Components/Pages/cart/cart-header/cart-header.component';
import { CartDetailsComponent } from './Components/Pages/cart/cart-details/cart-details.component';
import { CartHomeComponent } from './Components/Pages/cart/cart-home/cart-home.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { ProfileComponent } from './Components/Pages/profile/profile.component';
import { ProfileHeaderComponent } from './Components/Pages/profile/profile-header/profile-header.component';
import { ProfileContentComponent } from './Components/Pages/profile/profile-content/profile-content.component';
import { Error404Component } from './Components/Pages/error/error404/error404.component';
import { ChatbotComponent } from './Components/chatbot/chatbot.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DashboardTrackOrderComponent } from './Components/Dashboard/dashboard-track-order/dashboard-track-order.component';
interface NgxSpinnerConfig {
  type?: string;
}
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    BannersComponent,
    HeaderComponent,
    SampleProductsComponent,
    ReviewComponent,
    SupportComponent,
    AboutComponent,
    ScrollTopComponent,
    FooterComponent,
    RegisterComponent,
    ContactUsPageComponent,
    LoginComponent,
    ContactUsBannerComponent,
    ContactUsFormComponent,
    AboutUsHeaderComponent,
    ALlProductsComponent,
    AllProductsHeaderComponent,
    ResetPasswordComponent,
    ProductDetailsComponent,
    AboutUsBriefComponent,
    AboutUsGalleryComponent,
    AboutUsInfoComponent,
    AboutUsReviewComponent,
    AboutUsPageComponent,
    FilterSideBarComponent,
    AllProductDataComponent,
    ProductDetailsHeaderComponent,
    ProductDetailsPageComponent,
    CheckoutComponent,
    CartHeaderComponent,
    CartDetailsComponent,
    CartHomeComponent,
    ProfileComponent,
    ProfileHeaderComponent,
    ProfileContentComponent,
    Error404Component,
    ChatbotComponent,
    DashboardTrackOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    MatSidenavModule,
    MatButtonModule,
    NgxSliderModule,
    BsDropdownModule.forRoot(),
    NgxPaginationModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    NgxSpinnerModule,
    DragDropModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

