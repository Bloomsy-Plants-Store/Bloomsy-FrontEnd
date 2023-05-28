import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-dashboard-all-products',
  templateUrl: './dashboard-all-products.component.html',
  styleUrls: ['./dashboard-all-products.component.css']
})
export class DashboardAllProductsComponent {
  productForm: FormGroup;
  errorMessage = '';
  successMessage = '';
  formErrorMessage = ''

  constructor(private formBuilder: FormBuilder, private productService: ProductsService, private spinner: NgxSpinnerService) {
    this.productForm = this.formBuilder.group({
      name: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z\s]{3,30}$/)],
      ],
      description: [
        '',
        [Validators.required],
      ],
      price:[
        '',
        [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]
      ],
      discount: ['',
      [Validators.required, Validators.pattern(/^[0-9]+$/)]
      ],
      itemsinStock:['', [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]],
      category: ['', [Validators.required]],
      imageUrl: this.formBuilder.array([],Validators.required),
    });
  }

  get name() {
    return this.productForm.get('name');
  }

  get description() {
    return this.productForm.get('description');
  }

  get price() {
    return this.productForm.get('price');
  }

  get discount() {
    return this.productForm.get('discount');
  }

  get itemsinStock() {
    return this.productForm.get('itemsinStock');
  }

  get category() {
    return this.productForm.get('category');
  }

  get imageUrl() {
    return this.productForm.get('imageUrl');
  }

  onSubmit() {
    this.spinner.show();
    if (this.productForm.valid) {
      const formData = new FormData();
      const token = localStorage.getItem('x-auth-token');
      const files = this.productForm.get('imageUrl')?.value;

      for (let i = 0; i < files.length; i++) {
        formData.append('imageUrl', files[i]);
      }

      formData.append('name', this.productForm.get('name')?.value);
      formData.append('description', this.productForm.get('description')?.value);
      formData.append('price', this.productForm.get('price')?.value);

      let category = this.productForm.get('category')?.value
      for (let i = 0; i < category.length; i++) {
        formData.append('category', category[i]);
      }

      formData.append('itemsinStock', this.productForm.get('itemsinStock')?.value);
      formData.append('discount', this.productForm.get('discount')?.value);
      this.productService.StoreProduct(formData,token).subscribe(
        (response) => {
          this.errorMessage = '';
          this.formErrorMessage = '';
          this.successMessage='This product has been Added Successfully';
          setTimeout(() => {
          this.successMessage = "";
          window.location.reload();
        }, 7000);
          this.spinner.hide();
        },
        (error) => {
          if(error.status == 500){
            this.formErrorMessage = ''
            this.errorMessage = 'Error in Uploading Product Images';
          }
          this.spinner.hide();
        }
      );
    }else {
      this.formErrorMessage = 'Invalid Data, Please Enter all fields';
      this.spinner.hide();
    }
  }

  onFileInputChange(event: any) {
    const files = event.target.files;
    const fileArray = Array.from(files);

    let productImagesControl = this.productForm.get('imageUrl') as FormArray;
    for (let i = 0; i < fileArray.length; i++) {
      productImagesControl.push(new FormControl(fileArray[i]));
    }
  }

}
