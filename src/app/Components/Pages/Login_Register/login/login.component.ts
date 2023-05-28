import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators,  FormControl  } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/Services/token.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  validationForm: FormGroup;
  validationEmail: FormGroup;
  errorMessage: any;
  resetErrorMessage: any;
  sendEmailMessage: any;
  rememberMe!: FormControl;


  constructor(private fb: FormBuilder, private authService: AuthService, private http: HttpClient, private router: Router ,  private tokenService: TokenService, private spinner: NgxSpinnerService) {
    this.validationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',[ Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d$!%*#?&@]{8,}$/)]],
      rememberMe: [false],
    });
    this.validationEmail = this.fb.group({
      resetEmail: ['', [Validators.required, Validators.email]]
    })
  }

  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 800);
  }

  get email() {
    return this.validationForm.get('email');
  }

  get password() {
    return this.validationForm.get('password');
  }

  get resetEmail() {
    return this.validationEmail.get('resetEmail');
  }

  Login(): void {
    this.spinner.show();
    if (this.validationForm.valid) {
      const email = this.email!.value;
      const password = this.password!.value;
      const rememberMe = this.validationForm.get('rememberMe')!.value;
      this.authService.login(email, password, rememberMe).subscribe({
        next: (response: any) => {
          const token = response.headers.get('x-auth-token');
          this.tokenService.setToken(token);
          const decodedToken: any = jwt_decode(token);
          localStorage.setItem('access_token', JSON.stringify(decodedToken));
          localStorage.setItem('x-auth-token', token);
          this.router.navigate(['/']);
          this.spinner.hide();
        },
        error: (err: any) => {
          if(err.status == 400){
            this.errorMessage = 'Invalid Email or Password';
          }else{
            this.errorMessage = 'Login Failed,Please Try Again';
          }
          this.spinner.hide();
        }
      });
    } else {
      this.errorMessage = 'Invalid Data';
      this.spinner.hide();
    }

    setInterval(() => {
      this.errorMessage = '';
    }, 5000);
  }

  LoginWithGoogle(): void {
    this.spinner.show();
    console.log('Login With Google');
    this.authService.loginWithGoogle().subscribe({
      next: (response: any) => {
        const token = response.headers.get('x-auth-token');
        this.spinner.hide();
      },
      error: (err: any) => {
        this.spinner.hide();
      }
    });
  }

  LoginWithFacebook(): void {
    this.spinner.show();
    console.log('Login With Facebook');
    this.authService.loginWithFacebook().subscribe({
      next: (response: any) => {
        console.log(response);
        const token = response.headers.get('x-auth-token');
        console.log('Token:', token);
        this.spinner.hide();
      },
      error: (err: any) => {
        console.log(err);
        this.spinner.hide();
      }
    });
  }

  sentEmail(){
    this.spinner.show();
    if (this.validationEmail.valid) {
      const resetEmail = this.resetEmail!.value;
      this.authService.forgotPassword(resetEmail).subscribe({
        next: (response: any) => {
          localStorage.setItem('reset-token', response.body.token);
          this.sendEmailMessage = 'An Email is sent Successfully,Please Check your Inbox'
          this.spinner.hide();
        },
        error: (err: any) => {
          if(err.status == 404){
            this.resetErrorMessage = 'Not Found User';
          }else{
            this.resetErrorMessage = 'Failed,Please Try Again';
          }
          this.spinner.hide();
        }
      });
    } else {
      this.resetErrorMessage = 'Invalid Email Format';
      this.spinner.hide();
    }
  }

}