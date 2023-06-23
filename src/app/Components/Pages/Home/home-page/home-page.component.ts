import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit{
  constructor(private spinner: NgxSpinnerService) {}
  ngOnInit() {
    this.spinner.show();
    window.scroll(0, 0);

    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }
}
