import { Component, EventEmitter,Output, ElementRef, Renderer2, SimpleChanges, Input} from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductsService } from 'src/app/Services/products.service';
@Component({
  selector: 'app-all-products-header',
  templateUrl: './all-products-header.component.html',
  styleUrls: ['./all-products-header.component.css']
})
export class AllProductsHeaderComponent {
  isActive = false;
  HeaderName = "ALL Products";
  previousImgElementId: string | null | undefined = null;
  previousTitleElementId: string | null | undefined = null;

  constructor(private elementRef: ElementRef, private renderer: Renderer2,public myService: ProductsService,
    private spinner: NgxSpinnerService) { }

  @Output() myEvent = new EventEmitter();
  @Input() FiltercategoryName: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.FiltercategoryName) {
      this.HeaderName=this.FiltercategoryName
      this.handleImgContainerClick(this.removeSpaces(this.FiltercategoryName))
      this.handleTitleContainerClick(this.removeSpaces(this.FiltercategoryName))
    }
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.handleImgContainerClick(this.removeSpaces(this.HeaderName))
    this.handleTitleContainerClick(this.removeSpaces(this.HeaderName))
  }
  HandleEvent(categoryName: string) {
    this.HeaderName = categoryName;
    this.myEvent.emit(categoryName);
  }
  handleContainerClick(event: MouseEvent, categoryName: string) {
    const clickedElement = event.target as HTMLElement;
    const isImgContainer = clickedElement.classList.contains('category-img');
    const isTitleElement = clickedElement.tagName === 'A' && clickedElement.parentElement?.classList.contains('category-title');

    if (isImgContainer || isTitleElement) {
      this.HandleEvent(categoryName);
      this.handleImgContainerClick(this.removeSpaces(categoryName))
      this.handleTitleContainerClick(this.removeSpaces(categoryName))
    }
  }
  removeSpaces(name: string): string {
    return name.replace(/\s/g, '');
  }

  handleImgContainerClick(catgory_id: string){
    const elementId = `img-active-${catgory_id}`;
    // Remove style from previously clicked element
    if (this.previousImgElementId) {
      this.removeStyleFromImgElement(this.previousImgElementId);
    }
    // Apply style to the newly clicked element
    if (elementId) {
      this.addStyleToImgElement(elementId);
      this.previousImgElementId = elementId;
    }
  }

  handleTitleContainerClick(catgory_id: string){
    const elementId = `title-active-${catgory_id}`;

    // Remove style from previously clicked element
    if (this.previousTitleElementId) {
      this.removeStyleFromTitleElement(this.previousTitleElementId);
    }

    // Apply style to the newly clicked element
    if (elementId) {
      this.addStyleToTitleElement(elementId);
      this.previousTitleElementId = elementId;
    }
  }

  addStyleToImgElement(elementId: string) {
    const style = this.renderer.createElement('style');
    const styleId = `custom-img-style-${elementId}`; // Generate a unique style id
    style.setAttribute('id', styleId);
    const css = `#${elementId}::before {
      position: absolute;
      content: "";
      width: calc(100% + 11px);
      height: calc(100% + 11px);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      border-radius: 50%;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      -ms-border-radius: 50%;
      -o-border-radius: 50%;
      border: 1px solid #224229;
    }`;

    this.renderer.appendChild(style, this.renderer.createText(css));
    this.renderer.appendChild(document.head, style);
  }

  removeStyleFromImgElement(elementId: string) {
    const styleId = `custom-img-style-${elementId}`;
    const styleElement = this.renderer.selectRootElement(`#${styleId}`);
    this.renderer.removeChild(this.renderer.parentNode(this.elementRef.nativeElement), styleElement);
  }

  addStyleToTitleElement(elementId: string) {
    const style = this.renderer.createElement('style');
    const styleId = `custom-title-style-${elementId}`; // Generate a unique style id
    style.setAttribute('id', styleId);
    console.log("fn"+elementId)
    const css = `#${elementId}::before {
      content: "";
      position: absolute;
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      height: 1.5px;
      background-color: #313232;
      transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
      -webkit-transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
      -moz-transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
      -ms-transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
      -o-transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
      }`;

    this.renderer.appendChild(style, this.renderer.createText(css));
    this.renderer.appendChild(document.head, style);
  }

  removeStyleFromTitleElement(elementId: string) {
    const styleId = `custom-title-style-${elementId}`;
    const styleElement = this.renderer.selectRootElement(`#${styleId}`);
    this.renderer.removeChild(this.renderer.parentNode(this.elementRef.nativeElement), styleElement);
  }

  customOptions: OwlOptions = {
    margin: 5,
    items: 3,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4,
      }
    },
    nav: true
  }
  categories = [
    {
      id:"0",
      name: "ALL Products",
      img_src: "../assets/images/All-Products.jpg"
    },
    {
      id:"1",
      name: "Low Maintenance",
      img_src: "https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/categories-11.jpg"
    },
    {
      id:"2",
      name: "Indoor Plants",
      img_src: "https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/categories-10.jpg"
    },
    {
      id:"3",
      name: "Ceramic Pots",
      img_src: "https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/categories-8.jpg"
    },
    {
      id:"4",
      name: "Air Purifying",
      img_src: "https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/categories-7.jpg"
    },
    {
      id:"5",
      name: "Plant Bundle",
      img_src: "https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/categories-12.jpg"
    }
  ]
  ngOnDestroy() {
    this.myEvent.unsubscribe();
  }
}
