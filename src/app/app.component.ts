import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontEnd';

  isLoginPage!: boolean;
  isSignUpPage!: boolean;
  isResetPasswordPage!: boolean;
  isDashboardPage!: boolean;
  isCheckoutPage!: boolean;
  isErrorPage!: boolean;

  constructor(private router: Router) {
    this.router.events.subscribe((val) => {
      this.isLoginPage = (this.router.url === '/login');
      this.isSignUpPage = (this.router.url === '/register');
      this.isResetPasswordPage = (this.router.url === '/reset-password');
      this.isDashboardPage = this.router.url.startsWith('/dashboard');
      this.isCheckoutPage = (this.router.url==='/checkout');
      this.isErrorPage = (this.router.url==='/error');
    });
  }

}
