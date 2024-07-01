import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { loadProducts } from '@app/features/products/store/product.actions';
import { selectAllProducts } from '@app/features/products/store/product.selectors';
import { Product } from '@app/shared/models/product.model';
import { Store } from '@ngrx/store';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-item-autocomplete',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, ReactiveFormsModule],
  templateUrl: './item-autocomplete.component.html',
  styleUrl: './item-autocomplete.component.css'
})
export class ItemAutocompleteComponent {
  @Input()
  control: AbstractControl | null = null;
  @Output() productSelected = new EventEmitter<string>();

  searchControl = new FormControl('');
  products$!: Observable<Product[]>;
  filteredProducts$!: Observable<Product[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadProducts({page:1}));
    this.products$ = this.store.select(selectAllProducts);

    this.filteredProducts$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterProducts(value || ''))
    );
  }

  filterProducts(value: string): Product[] {
    const filterValue = value.toLowerCase();
    let filteredProducts: Product[] = [];
    this.products$.subscribe(products => {
      filteredProducts = products.filter(product => 
        product.designation.toLowerCase().includes(filterValue)
      );
    });
    return filteredProducts;
  }

  selectProduct(product: Product) {
    this.productSelected.emit(product.id || '');
    this.searchControl.setValue(product.designation);
  }

  
}
