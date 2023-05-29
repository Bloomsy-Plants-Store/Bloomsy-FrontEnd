import { Component, ElementRef  , ViewChild} from '@angular/core';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { CheckoutService } from "src/app/Services/checkout.service"
import { OrderService } from "src/app/Services/order.service";
import { CartService } from "src/app/Services/cart.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})


export class CheckoutComponent{

  validationCheckoutForm!: FormGroup;
  @ViewChild('successModal') successModal!: ElementRef;
  errorMessage: any;
  formattedInputValue!: string;
  formattedMonth: string = '';
  sectionVisible = false;
  total: number = 0;
  Items: any = [];
  flag : any;

  constructor(private fb: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private checkoutService: CheckoutService,
    private orderService: OrderService,
    private cartService: CartService,
  ) {
    this.validationCheckoutForm = this.fb.group({
      name: [
      '',
        [Validators.required,
          Validators.pattern(/^[a-zA-Z\s]{3,30}$/)],
      ],
      creditNumber: [
        '',
        [Validators.required,
          Validators.pattern(/^[0-9]{16}$/),
          Validators.minLength(16),
          Validators.maxLength(16)],
      ],
      creditMonth: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(0?[1-9]|1[0-2])$/),
          Validators.minLength(1),
          Validators.maxLength(2)],
      ],
      creditYear: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{2}$/),
          Validators.minLength(2),
          Validators.maxLength(2),
        ]
      ],
      creditCVC: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{3,4}$/),
          Validators.minLength(3),
          Validators.maxLength(4),
        ]
      ]
    })
  }
  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 800);

    this.total = this.checkoutService.total;
    this.Items = this.checkoutService.cartItems;
    this.flag = this.checkoutService.flag;
    console.log(this.total, this.Items, this.flag);
  }
  get inputName() {
    return this.validationCheckoutForm.get('name');
  }
 get inputCreditNumber() {
    return this.validationCheckoutForm.get('creditNumber');
  }
  get inputCreditMonth() {
    return this.validationCheckoutForm.get('creditMonth');
  }
  get inputCreditYear() {
    return this.validationCheckoutForm.get('creditYear');
  }
  get inputCreditCVC() {
    return this.validationCheckoutForm.get('creditCVC');
  }

  formatCreditNumber() {
    const creditNumber = this.validationCheckoutForm.get('creditNumber')?.value;
    this.formattedInputValue =  creditNumber.toString().replace(/\d{4}(?=.)/g, '$& ') ;
  }
  formatMonth() {
    const creditMonth = this.validationCheckoutForm.get('creditMonth')?.value;
    if (creditMonth.length == 1) {
      this.formattedMonth = '0' + creditMonth ;
    }
    else {
      this.formattedMonth = creditMonth;
    }
  }
  clearAllCart() {
    let userId = JSON.parse(localStorage.getItem('access_token')!).UserId
    this.cartService.deleteAllProductsFromCart(userId).subscribe({
      next: (data: any) => {
       this.showModal();
      }, error(err) {
        console.log(err);
      }
    })
  }
  order() {
    console.log("Order")
    let user = JSON.parse(localStorage.getItem('access_token')!).UserId;
    this.orderService.makeOrder(user, this.total, this.Items)
      .subscribe({
        next: (data: any) => {
          console.log("after order service ")
          console.log(data);
          if (this.flag != "buyNow") {
            this.clearAllCart();
          } else {
            this.showModal();
          }
        }, error(err) {
          console.log(err);
        }
    })
  }



  submitCheckout(): void{
    if (this.validationCheckoutForm.valid) {
      const creditNumber = this.validationCheckoutForm.get('creditNumber')?.value;
      const creditMonth = this.validationCheckoutForm.get('creditMonth')?.value;
      const creditYear = this.validationCheckoutForm.get('creditYear')?.value;
      const creditCVC = this.validationCheckoutForm.get('creditCVC')?.value;
      this.checkoutService.sendDataToStripe(creditNumber, creditMonth, creditYear, creditCVC).subscribe({
        next: (data: any) => {
          console.log("after stripe")
          this.order();
        }, error(err) {
          console.log(err);
        },
      })
    }
  }


  showModal(){
    const modal = new bootstrap.Modal(this.successModal.nativeElement);
    modal.show();
  }
  redirectToHome() {
    this.router.navigate(['/']);
  }



}
