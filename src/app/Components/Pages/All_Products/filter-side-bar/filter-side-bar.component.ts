import { Component, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild,SimpleChanges } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { LabelType, Options } from '@angular-slider/ngx-slider';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductsService } from 'src/app/Services/products.service';
@Component({
  selector: 'app-filter-side-bar',
  templateUrl: './filter-side-bar.component.html',
  styleUrls: ['./filter-side-bar.component.css'],
})

export class FilterSideBarComponent implements OnInit {
  categories:any
  minValue: number = 50;
  maxValue: number = 1500;
  finalMinValue: number | undefined;
  finalMaxValue: number | undefined;
  selectedOption: string | undefined;
  activeItem: any = null;
  FiltercategoryName: any;
  // sortOptions: string[] = ['Default sorting','Sort by average rating', 'Sort by price: low to high', 'Sort by price: high to low'];
  @Output() myPriceEvent = new EventEmitter();

  constructor(private spinner: NgxSpinnerService, public myService: ProductsService,private renderer: Renderer2) {}

  ngOnInit(): void {
    this.spinner.show();
    this.myService.getEachCatgory().subscribe({
      next: (response: any) => {
        this.categories = response.data;
        this.spinner.hide();
        this.myService.categoryObserver$.subscribe((value: any) => {
          this.FiltercategoryName = value;
          this.activeCategory(this.FiltercategoryName);
        });
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
      },
    });

  }

  options: Options = {
    floor: this.minValue,
    ceil: this.maxValue,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          this.minValue = value;
          return "<b>Min price:</b> EGP" + value;
        case LabelType.High:
          this.maxValue = value;
          return "<b>Max price:</b> EGP" + value;
        default:
          return "$" + value;
      }
    }
  };

  @ViewChild('sidenav', { static: true })
  sidenav!: MatSidenav;

  openSidenav() {
    this.spinner.show();
    this.sidenav.open();
    this.spinner.hide();
  }

  closeSidenav() {
    this.spinner.show();
    this.sidenav.close();
    this.spinner.hide();
  }

  HandleEvent() {
    const price_range={
      min:this.minValue,
      max:this.maxValue
    }
    console.log(price_range);

    this.handleContainerClick("ALL Products");
    this.myService.updatePrice(price_range);

  }



  HandleCatgoryEvent(categoryName: string) {
    this.myService.updateCategory(categoryName);
  }

  handleContainerClick(categoryName: string) {
    this.HandleCatgoryEvent(categoryName);
    this.activeCategory(categoryName);
  }

  activeCategory(categoryName:string)
  {
    this.resetSliderValues();
    if(categoryName=="ALL Products" && this.activeItem)
    { this.activeItem.classList.remove('active');}
    else{
      const myDiv = document.querySelector(`#${this.removeSpaces(categoryName)}`);
      if (myDiv instanceof HTMLElement) {
        console.log(myDiv)
        if (this.activeItem) {
          this.activeItem.classList.remove('active');
        }
        this.activeItem = myDiv;
        this.activeItem.classList.add('active');
      }
    }
  }
  removeSpaces(name: string): string {
    return name.replace(/\s/g, '');
  }
  resetSliderValues() {
    this.minValue = 50;
    this.maxValue = 1500;
  }
}
