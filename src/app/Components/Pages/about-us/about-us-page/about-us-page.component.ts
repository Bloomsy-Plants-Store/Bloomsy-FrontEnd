import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-about-us-page',
  templateUrl: './about-us-page.component.html',
  styleUrls: ['./about-us-page.component.css']
})
export class AboutUsPageComponent {
  constructor(private spinner: NgxSpinnerService) {}
  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }
}
