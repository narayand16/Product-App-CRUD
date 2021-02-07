import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from "../storage.service";
import { Product } from "../product.model";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  productForm: FormGroup;
  localStorageKey = 'productList';
  productList: Product[] = [];
  hsnCode = '';

  constructor(private formBuilder: FormBuilder, private router: Router,
    private service: StorageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productList = this.service.getObject(this.localStorageKey) ? this.service.getObject(this.localStorageKey) : [];
    this.route.params.subscribe((params) => {
      console.log(params);
      this.hsnCode = params['hsnCode'];
      if (this.hsnCode) {
        const product = this.productList ? this.productList.filter((item) => item.hsnCode === this.hsnCode)[0] : {};
        this.productForm = this.createProductForm();
        this.productForm.patchValue(product);
      } else {
        this.productForm = this.createProductForm();
      }
    });
  }

  createProductForm() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      hsnCode: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      displayUnit: ['', Validators.required],
      tax: ['', Validators.required ],
      price: ['', [Validators.required]],
      productType: [],
      description: []
    });
  }

  saveProduct() {
    console.log(this.productForm.value);
    const product = this.productForm.value;
    if(this.hsnCode) {
      const foundIndex = this.productList.findIndex((item) => item.hsnCode === this.hsnCode);
      this.productList[foundIndex] = product;
      this.service.setItem(this.localStorageKey, JSON.stringify(this.productList));
    } else {
      this.productList.push(product);
      this.service.setItem(this.localStorageKey, JSON.stringify(this.productList));
    }
    this.router.navigate(['/list']);
  }

  onCancel() {
    this.router.navigate(['/list']);
  }
}
