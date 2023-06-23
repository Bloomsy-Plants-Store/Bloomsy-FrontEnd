import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-contact-us-page',
  templateUrl: './contact-us-page.component.html',
  styleUrls: ['./contact-us-page.component.css']
})
export class ContactUsPageComponent {
  constructor(private spinner: NgxSpinnerService) {}
  ngOnInit() {
    this.spinner.show();
    window.scroll(0, 0);

    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }


}
