import { AfterViewInit, ChangeDetectorRef, Component, ViewChild,ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsService } from '../../../Services/products.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { connectable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-all-products-table-pagination',
  styleUrls: ['all-products-table-pagination.component.css'],
  templateUrl: 'all-products-table-pagination.component.html',
})
export class AllProductsTablePaginationComponent implements AfterViewInit {
  selectedID:any;
  errorMessage:any;
  successMessage:any;
  uploadErrorMessage:any;
  uploadSuccessMessage:any;
  formErrorMessage:any;
  displayedColumns: string[] = ['name','price', 'category','discount','itemsinStock','action'];
  dataSource = new MatTableDataSource<PeriodicElement>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  editProductForm: FormGroup;
  editProductID: any = '';
  oldCategory:any = [];
  oldImages:any = [];
  productDetails:any = {};

  constructor(private productsService: ProductsService,private changeDetectorRef: ChangeDetectorRef, private fb: FormBuilder, private spinner: NgxSpinnerService) {
    this.editProductForm = this.fb.group({
      productName: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z\s]{3,30}$/)]),
      productDesc: new FormControl('',[Validators.required]),
      productDiscount: new FormControl('',[Validators.required, Validators.pattern(/^[0-9]+$/)]),
      productPrice: new FormControl('',[Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]),
      productItemsInStock: new FormControl('',[Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]),
      productCategory: new FormControl('',[Validators.required]),
      productImages: this.fb.array([])
    });
  }
  get productId(){
    return this.editProductForm.get('productId');
  }
  get productName(){
    return this.editProductForm.get('productName');
  }
  get productDesc(){
    return this.editProductForm.get('productDisc');
  }
  get productDiscount(){
    return this.editProductForm.get('productDiscount');
  }
  get productPrice(){
    return this.editProductForm.get('productPrice');
  }
  get productItemsInStock(){
    return this.editProductForm.get('productItemsInStock');
  }
  get productCategory(){
    return this.editProductForm.get('productCategory');
  }
  get productImages(){
    return this.editProductForm.get('productImages');
  }

  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.fetchAllProducts();
  }

  async fetchAllProducts() {
    try {
      this.spinner.show();
      const data: any = await this.productsService.GetAllProducts().toPromise();
      this.dataSource.data = data.data;
      this.changeDetectorRef.detectChanges();
      this.spinner.hide();
    } catch (error) {
      console.log('Error fetching products:', error);
      this.spinner.hide();
    }
  }

  editElement(element: PeriodicElement) {
    this.spinner.show();
    const productId = element._id;
    this.productsService.GetProductByID(productId).subscribe({
      next: (product: any) => {

        this.editProductForm.setValue({
          productName: product.data.name,
          productDesc: product.data.description,
          productDiscount: Number(product.data.discount),
          productPrice: Number(product.data.price),
          productItemsInStock: Number(product.data.itemsinStock),
          productCategory: product.data.category,
          productImages: []
        });
        this.editProductID = productId;
        this.oldCategory = [];
        this.spinner.hide();
      },
      error: (err:any) => {
        console.log(err);
        this.spinner.hide();
      },
    });
  }

  updateProduct(){
    this.spinner.show();
    if (this.editProductForm.valid) {
      const formData = new FormData();
      const files = this.editProductForm.get('productImages')?.value;

      for (let i = 0; i < files.length; i++) {
        formData.append('imageUrl', files[i]);
      }

      formData.append('name', this.editProductForm.get('productName')?.value);
      formData.append('description', this.editProductForm.get('productDesc')?.value);
      formData.append('price', this.editProductForm.get('productPrice')?.value);

      let category = this.editProductForm.get('productCategory')?.value;
      for (let i = 0; i < category.length; i++) {
        formData.append('category', category[i]);
      }

      formData.append('itemsinStock', this.editProductForm.get('productItemsInStock')?.value);
      formData.append('discount', this.editProductForm.get('productDiscount')?.value);

      this.productsService.UpdateProduct(this.editProductID, formData).subscribe({
        next:(response) => {
          this.uploadErrorMessage = '';
          this.formErrorMessage = '';
          this.uploadSuccessMessage='This product has been Updated Successfully';
          this.fetchAllProducts();
          setTimeout(() => {
          this.uploadSuccessMessage = "";
        }, 7000);
          this.spinner.hide();
        },
        error:(err) => {
          if(err.status == 500){
            this.formErrorMessage = '';
            this.uploadErrorMessage = 'Error in Uploading Product Images';
          }
          this.spinner.hide();
        }
      })

    }else {
      this.formErrorMessage = 'Invalid Data Format,Please Try Again';
      this.spinner.hide();
    }
  }

  onFileInputChange(event: any) {
    const files = event.target.files;
    const fileArray = Array.from(files);

    let productImagesControl = this.editProductForm.get('productImages') as FormArray;
    for (let i = 0; i < fileArray.length; i++) {
      productImagesControl.push(new FormControl(fileArray[i]));
    }
  }

  setSelectedId(id:number)
  {
    this.selectedID=id;
  }

  deletedSelectedProduct() {
    const token = localStorage.getItem('x-auth-token');
    this.productsService.DeleteProductById(this.selectedID,token).subscribe({
      next: (response: any) => {
        console.log(token);
        this.fetchAllProducts();
        this.successMessage='This Product has been Deleted Successfully';
        setTimeout(() => {
          this.successMessage = "";
        }, 3000);
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = 'Deleting this product Failed. Please Try Again';
        setTimeout(() => {
          this.errorMessage = "";
        }, 3000);
      }
    });
  }

  showElement(element: PeriodicElement) {
    this.spinner.show();
    this.productDetails = {
      productId : element._id,
      productName : element.name,
      productPrice : element.price,
      productDiscount : element.discount,
      productDesc : element.description,
      productRate : element.rate,
      productReviewsNum : element.reviews_num,
      productItemsinStock : element.itemsinStock,
      productCategory : element.category,
      productImages: element.imageUrl,
    }
    this.spinner.hide();
  }

  getStarsArray(rate: number): any[] {
    const starsCount = Math.floor(rate);
    const isHalfStar = rate % 1 !== 0;

    const starsArray = Array(starsCount).fill(0);

    if (isHalfStar) {
      starsArray.push(0.5);
    }

    return starsArray;
  }

}


interface PeriodicElement {
  _id:any,
  name:String,
  price:Number,
  imageUrl:[String],
  category:[String],
  rate:Number,
  reviews_num:Number,
  discount:Number,
  bestSelling:Boolean,
  description: String,
  itemsinStock: Number,
  action:any,
}









