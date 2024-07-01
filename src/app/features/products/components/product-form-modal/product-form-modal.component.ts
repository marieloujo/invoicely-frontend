import { AsyncPipe, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormButtonComponent } from '@app/shared/components/form-button/form-button.component';
import { FormErrorComponent } from '@app/shared/components/form-error/form-error.component';
import { ModalComponent } from '@app/shared/components/modal/modal.component';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { addProduct, showLoader, updateProduct } from '../../store/product.actions';
import { Product } from '@app/shared/models/product.model';
import { selectLoading, selectProductError } from '../../store/product.selectors';

@Component({
  selector: 'app-product-form-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    AsyncPipe,
    ModalComponent,
    FormErrorComponent,
    FormButtonComponent
  ],
  templateUrl: './product-form-modal.component.html'
})
export class ProductFormModalComponent {
  private subscription: Subscription = new Subscription;

  @Input() product: Product | null = null;
  @Input() isEditMode = false;

  @Output() closeEditModeEvent = new EventEmitter<boolean>();

  loading: boolean = false;
  buttonTitle: string = 'Ajouter';
  formTitle: string = 'Ajouter Product';

  productForm = new FormGroup({
    designation: new FormControl(this.product?.designation, [Validators.required]),
    lower_limit: new FormControl(this.product?.lower_limit, [Validators.required]),
    stock: new FormControl(this.product?.stock, [Validators.required]),
    prix: new FormControl(this.product?.price?.unit_price_excl, [Validators.required]),
  })

  error$: Observable<string>;
  loading$: Observable<boolean>;


  constructor(private store: Store) {
    this.error$ = this.store.select(selectProductError);
    this.loading$ = this.store.select(selectLoading);
    this.subscription = this.loading$.subscribe(loading => {
      this.loading = loading;
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
      this.productForm.patchValue({
        designation: this.product.designation,
        lower_limit: this.product.lower_limit,
        stock: this.product.stock,
        prix: this.product.price?.unit_price_excl
      });
    }
    if (changes['isEditMode']) {
      this.buttonTitle = this.isEditMode ? 'Enregistrer les modifications' : 'Ajouter';
      this.formTitle = this.isEditMode ? 'Modifier Product' : 'Ajouter Product';
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.store.dispatch(showLoader());

      const product = {
        designation: this.productForm.value.designation || '',
        lower_limit: this.productForm.value.lower_limit,
        stock: this.productForm.value.stock,
        prix: this.productForm.value.prix || '',
        id: null,
        slug: null,
        price: null
      }

      if (this.isEditMode && this.product) {
        this.store.dispatch(updateProduct({ product: { ...product, id: this.product.id } }));
      } else {
        this.store.dispatch(addProduct({ product: product }));
      }
      this.reset()
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  reset() {
    this.closeEditMode()
  }

  closeEditMode() {
    this.closeEditModeEvent.emit(false)
  }

}
