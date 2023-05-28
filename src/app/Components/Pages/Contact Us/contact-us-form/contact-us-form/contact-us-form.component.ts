import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-contact-us-form',
  templateUrl: './contact-us-form.component.html',
  styleUrls: ['./contact-us-form.component.css']
})
export class ContactUsFormComponent {
  private mapBtn!: HTMLButtonElement;
  private formBtn!: HTMLButtonElement;
  private contactContainer!: HTMLElement;
  private mapContainer!: HTMLElement;
  contactValidationForm!: FormGroup;
  errorMessage = '';
  @ViewChild('successModal') successModal!: ElementRef;

  constructor(private fb: FormBuilder, private spinner: NgxSpinnerService) {
    this.contactValidationForm = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z\s]{3,30}$/)],
      ],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
      message: [
        '',
        [
          Validators.required,Validators.pattern(/^[a-zA-Z\s]{3,30}$/)
        ],
      ],
    });
  }

  get name() {
    return this.contactValidationForm.get('name');
  }

  get email() {
    return this.contactValidationForm.get('email');
  }

  get phone() {
    return this.contactValidationForm.get('phone');
  }

  get message() {
    return this.contactValidationForm.get('message');
  }
  showModal(){
    const modal = new bootstrap.Modal(this.successModal.nativeElement);
    modal.show();
  }

  sendMessage(name: any, email: any, phone: any, message: any): void{
    this.spinner.show();
    if (this.contactValidationForm.valid) {
      this.showModal();
      this.spinner.hide();
    }else {
      this.errorMessage = 'Invalid Data,Please Try Again';
      this.spinner.hide();
    }

  }

}

