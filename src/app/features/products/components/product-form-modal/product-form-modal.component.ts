import { AsyncPipe, NgIf } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormButtonComponent } from '@app/shared/components/form-button/form-button.component';
import { FormErrorComponent } from '@app/shared/components/form-error/form-error.component';
import { ModalComponent } from '@app/shared/components/modal/modal.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addProduct, showLoader, updateProduct } from '../../store/product.actions';
import { Product } from '@app/shared/models/product.model';
import { selectLoading, selectProductError, selectSuccess } from '../../store/product.selectors';
import { FormModalComponent } from '@app/core/components/form-modal/form-modal.component';
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
export class ProductFormModalComponent extends FormModalComponent {

  @Input() product: Product | null = null;
  @Input() isEditMode = false;

  buttonTitle: string = 'Ajouter';
  formTitle: string = 'Ajouter un produit';

  error$: Observable<any>;
  success$: Observable<boolean>;
  loading$: Observable<boolean>;


  constructor(private store: Store) {
    super()

    this.formGroup = new FormGroup({
      designation: new FormControl(this.product?.designation, [Validators.required]),
      lower_limit: new FormControl(this.product?.lower_limit, [
        Validators.required,
        Validators.min(1),
        Validators.pattern('^[0-9]+$')
      ]),
      stock: new FormControl(this.product?.stock, [Validators.required, Validators.min(1)]),
      prix: new FormControl(this.product?.price?.unit_price_excl, [
        Validators.required,
        Validators.min(1),
        Validators.pattern('^[0-9]+$')
      ]),
    })

    this.error$ = this.store.select(selectProductError);
    this.success$ = this.store.select(selectSuccess);
    this.loading$ = this.store.select(selectLoading);

    this.loading$.subscribe(loading => {this.loading = loading;});
    this.error$.subscribe(error => {this.bindErrorToForm(error)});
    this.success$.subscribe(success => {this.reset()})
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
      this.formGroup.patchValue({
        designation: this.product.designation,
        lower_limit: this.product.lower_limit,
        stock: this.product.stock,
        prix: this.product.price?.unit_price_excl
      });
    }
    if (changes['isEditMode']) {
      this.buttonTitle = this.isEditMode ? 'Enregistrer les modifications' : 'Ajouter';
      this.formTitle = this.isEditMode ? 'Modifier un produit' : 'Ajouter un produit';
    }
  }

  get designation() {
    return this.formGroup.get('designation')
  }

  get lower_limit() {
    return this.formGroup.get('lower_limit')
  }

  get stock() {
    return this.formGroup.get('stock')
  }

  get prix() {
    return this.formGroup.get('prix')
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.store.dispatch(showLoader());

      const product = {
        designation: this.formGroup.value.designation || '',
        lower_limit: this.formGroup.value.lower_limit,
        stock: this.formGroup.value.stock,
        prix: this.formGroup.value.prix || '',
        id: null,
        slug: null,
        price: null
      }

      if (this.isEditMode && this.product) {
        this.store.dispatch(updateProduct({ product: { ...product, id: this.product.id } }));
      } else {
        this.store.dispatch(addProduct({ product: product }));
      }
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

}
