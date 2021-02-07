import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  { path: 'list', component: ProductListComponent },
  { path: 'create/:hsnCode', component: CreateProductComponent },
  { path: 'create', component: CreateProductComponent },
  { path: '', component: ProductListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
