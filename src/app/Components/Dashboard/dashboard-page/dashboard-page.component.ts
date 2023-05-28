import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent {
  constructor(private spinner: NgxSpinnerService) {}
  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 800);
  }

}
