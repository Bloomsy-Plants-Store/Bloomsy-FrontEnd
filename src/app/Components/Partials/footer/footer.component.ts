import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  validEmail=false;
  validationForm = new FormGroup({
    email: new FormControl(null, [Validators.required,Validators.email]),
  })
  checkEmail()
  {
    let alert_div=document.querySelector(".email-alert")!;
    console.log(alert_div)
    let alert_text=alert_div.querySelector("#text")!;
    alert_div.classList.remove("d-none");
    if (this.validationForm.valid) {

      alert_div.classList.add("success_border","mt-3","px-2");
      alert_text.classList.add("success_msg");
      alert_text.classList.remove("text-danger");

      alert_text.innerHTML="Thank you for your message. It has been sent.";
    }
    else{
      alert_div.classList.remove("success_border","mt-3","px-2");
      alert_text.classList.remove("success_msg");
      alert_text.classList.add("text-danger");
      alert_text.innerHTML="This Field is Required";
    }
  }

}
