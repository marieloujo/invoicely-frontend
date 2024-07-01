import { Component } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-product-index',
  standalone: true,
  imports: [ProductListComponent],
  templateUrl: './product-index.component.html'
})
export class ProductIndexComponent {

}
