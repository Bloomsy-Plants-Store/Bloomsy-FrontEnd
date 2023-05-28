import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  errorMessage: any;

  constructor(private fb: FormBuilder, private authService: AuthService, private http: HttpClient, private router: Router, private spinner: NgxSpinnerService ) {
    this.resetPasswordForm = this.fb.group({
      password: ['',[ Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d$!%*#?&@]{8,}$/)]],
    });
  }

  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 800);
  }

  get password() {
    return this.resetPasswordForm.get('password');
  }

  Reset(){
    this.spinner.show();
    if (this.resetPasswordForm.valid) {
      const password = this.password!.value;
      const token = localStorage.getItem('reset-token')!;
      this.authService.resetPassword(password, token).subscribe({
        next: (response: any) => {
          localStorage.removeItem('reset-token')!;
          this.router.navigate(['/login']);
          this.spinner.hide();
        },
        error: (err: any) => {
          if(err.status == 400){
            this.errorMessage = 'Invalid Password';
          }else{
            this.errorMessage = 'Failed,Please Try Again';
          }
          this.spinner.hide();
        }
      });
    }else{
      this.errorMessage = 'Invalid Password Format';
      this.spinner.hide();
    }
  }

}
