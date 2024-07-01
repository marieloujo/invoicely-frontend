import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ItemAutocompleteComponent } from '../item-autocomplete/item-autocomplete.component';
import { Store } from '@ngrx/store';
import { Product } from '@app/shared/models/product.model';
import { Observable } from 'rxjs';
import { loadProducts } from '@app/features/products/store/product.actions';
import { selectAllProducts } from '@app/features/products/store/product.selectors';

@Component({
  selector: 'app-invoice-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    ItemAutocompleteComponent
  ],
  templateUrl: './invoice-create.component.html'
})
export class InvoiceCreateComponent {

  form: FormGroup;
  products$!: Observable<Product[]>;


  constructor(private store: Store) {
    this.form = new FormGroup({
      items: new FormArray([
        this.createItem()
      ]),
      client: new FormGroup({
        id: new FormControl(''),
        email: new FormControl(''),
        adresse: new FormControl(''),
        last_name: new FormControl(''),
        first_name: new FormControl('')
      }),
      type: new FormControl('')
    });
  }

  ngOnInit() {
    this.store.dispatch(loadProducts({page:1}));
    this.products$ = this.store.select(selectAllProducts);
  }

  createItem(): FormGroup {
    return new FormGroup({
      id: new FormControl(''),
      quantity: new FormControl('')
    });
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  addItem(): void {
    this.items.push(this.createItem());
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  onProductSelected(index: number, productId: string) {
    this.items.at(index).get('id')?.setValue(productId);
  }

}
