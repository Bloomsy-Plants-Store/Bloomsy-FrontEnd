import { Component, ElementRef, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  validationForm: FormGroup;
  @ViewChild('successModal') successModal!: ElementRef;
  errorMessage = '';
  successMessage ='';

  constructor(private fb: FormBuilder, private authService: AuthService,private router: Router, private spinner: NgxSpinnerService) {
    this.validationForm = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z\s]{3,30}$/)],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d$!%*#?&@]{8,}$/),
        ],
      ],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
    });
  }

  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 800);
  }

  get name() {
    return this.validationForm.get('name');
  }

  get email() {
    return this.validationForm.get('email');
  }

  get password() {
    return this.validationForm.get('password');
  }

  get phone() {
    return this.validationForm.get('phone');
  }

  showModal(){
    const modal = new bootstrap.Modal(this.successModal.nativeElement);
    modal.show();
  }

  register(name: any, email: any, phone: any, password: any): void {
    this.spinner.show();
    if (this.validationForm.valid) {
      this.authService
        .register(name.value, email.value, phone.value, password.value)
        .subscribe({
          next: (response:any) => {
            this.errorMessage = '';
            this.showModal();
            this.spinner.hide();
          },
          error: (err:any) => {
            if(err.status == 400){
              this.errorMessage = 'User Already Exist';
            }else{
              this.errorMessage = 'Registration Failed,Please Try Again';
            }
            this.spinner.hide();
          },
        });
    }else {
      this.errorMessage = 'Invalid Data,Please Try Again';
      this.spinner.hide();
    }
    setInterval(() => {
      this.errorMessage = '';
    }, 5000);
  }

  redirectToLogin() {
    this.spinner.show();
    this.router.navigate(['/login']);
    this.spinner.hide();
  }

}
