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
  selectedOption: string | undefined;
  activeItem: any = null;
  // sortOptions: string[] = ['Default sorting','Sort by average rating', 'Sort by price: low to high', 'Sort by price: high to low'];
  @Output() myPriceEvent = new EventEmitter();
  @Output() myCatgoryEvent = new EventEmitter();

  constructor(private spinner: NgxSpinnerService, public myService: ProductsService,private renderer: Renderer2) {}
  @Input() FiltercategoryName: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.FiltercategoryName) {
      this.activeCategory(this.FiltercategoryName);
    }
  }
  ngOnInit(): void {
    this.spinner.show();
    this.myService.getEachCatgory().subscribe({
      next: (response: any) => {
        this.categories = response.data;
        this.spinner.hide();
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
      },
    });
  }

  options: Options = {
    floor: this.minValue,  //the minimum value of the slider
    ceil: this.maxValue, //the maximum value of the slider
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          this.minValue=value;
          return "<b>Min price:</b> $" + value;
        case LabelType.High:
          this.maxValue=value;
          return "<b>Max price:</b> $" + value;
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
    this.handleContainerClick("ALL Products");
    this.myPriceEvent.emit(price_range);
  }



  HandleCatgoryEvent(categoryName: string) {
    this.myCatgoryEvent.emit(categoryName);
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
