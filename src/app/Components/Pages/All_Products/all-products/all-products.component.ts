import { Component } from '@angular/core';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class ALlProductsComponent {
    ngOnInit() {
    window.scroll(0, 0);
  }
}
