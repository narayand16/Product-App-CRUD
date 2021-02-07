import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  headers = ['#', 'Product Name', 'HSN code', 'Product Price', 'Display Unit', 'Tax', 'Action'];
  storageKey = "productList";
  products: Product[] = [];
  searchTxt: string;
  config: any;

  constructor(private router: Router, private service: StorageService) { }

  ngOnInit(): void {
    this.products = this.getProductsFromLocalStorage() || [];
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.products.length
    };
    // tried implementing debounce time for search
    const debounce = function (fn: Function, delay) {
      let timer;
      return function () {
        let context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
          fn.apply(context, args)
        }, delay);
      }
    }
    const search = debounce(this.filterProducts, 1000);

  }

  addProduct() {
    this.router.navigate(['/create']);
  }

  removeProduct(i) {
    this.products.splice(i, 1);
    this.service.setItem(this.storageKey, JSON.stringify(this.products));
  }

  editProduct(item) {
    this.router.navigate([`create/${item.hsnCode}`])
  }

  search(event) {
    this.searchTxt = event.target.value;
    if (event.target.id == 'name') {
      if (this.searchTxt.length >= 3) {
        this.products = this.filterProducts(this.searchTxt, 'name')
      } else {
        this.products = this.getProductsFromLocalStorage() || [];
      }
    } else if (event.target.id == 'price') {
      this.products = this.searchTxt && this.searchTxt.length ? this.filterProducts(this.searchTxt, 'price') :
        this.getProductsFromLocalStorage();
    } else {
      this.products = this.getProductsFromLocalStorage();
    }
  }

  filterProducts(query: string, param: string) {
    if (this.products.length == 0) {
      this.products = this.getProductsFromLocalStorage();
    }
    return param == 'name' ? this.products.filter((item) => item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())) :
      this.products.filter((item) => item.price === (query));
  }

  getProductsFromLocalStorage() {
    return this.service.getObject(this.storageKey);
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

}
