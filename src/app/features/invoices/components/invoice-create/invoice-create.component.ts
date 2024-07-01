import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Product } from '@app/shared/models/product.model';
import { Observable } from 'rxjs';
import { loadProducts } from '@app/features/products/store/product.actions';
import { selectAllProducts } from '@app/features/products/store/product.selectors';
import { Select2Data, Select2Module } from 'ng-select2-component';
import { Client } from '@app/shared/models/client.model';
import { selectAllClients } from '@app/features/clients/store/client.selectors';
import { loadClients } from '@app/features/clients/store/client.actions';
import { selectInvoiceError, selectLoading } from '@features/invoices/store/invoice.selectors';
import { addInvoice, showLoader } from '../../store/invoice.actions';
import { FormButtonComponent } from '@app/shared/components/form-button/form-button.component';
import { TypeFacturation } from '@app/shared/models/type-facturation';
import { Service } from '@app/shared/models/service.model';
import { selectAllServices } from '@app/features/services/store/service.selectors';
import { CurrencyXofPipe } from '@app/shared/pipes/currency-xof.pipe';
import { FormErrorComponent } from '@app/shared/components/form-error/form-error.component';
import { loadServices } from '@app/features/services/store/service.actions';

interface FactureAmount {
  montantTotalHT: number,
  montantTotalTTC: number,
  montantTotalTaxe: number,
}

@Component({
  selector: 'app-invoice-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor, NgIf, AsyncPipe, DatePipe,
    CurrencyXofPipe,
    FormErrorComponent,
    Select2Module,
    FormButtonComponent
  ],
  templateUrl: './invoice-create.component.html'
})
export class InvoiceCreateComponent {

  @Input() typeFacture: TypeFacturation = TypeFacturation.SERVICE;

  createInvoiceForm: FormGroup;
  products$!: Observable<Product[]>;
  services$!: Observable<Service[]>;
  clients$!: Observable<Client[]>;
  loading$!: Observable<boolean>;
  error$: Observable<string>;
  currentDate = new Date()

  amountData!: FactureAmount;

  products!: Select2Data;
  clients!: Select2Data;

  loading: boolean = false;
  selectClient: boolean = true;

  constructor(private store: Store) {
    this.createInvoiceForm = new FormGroup({
      items: new FormArray([
        this.createItem()
      ]),
      client: new FormGroup({
        id: new FormControl('', [
          this.conditionalValidator(() => this.selectClient, Validators.required)
        ]),
        email: new FormControl('', [
          this.conditionalValidator(() => !this.selectClient, Validators.required),
          this.conditionalValidator(() => !this.selectClient, Validators.email)
        ]),
        adresse: new FormControl('', [
          this.conditionalValidator(() => !this.selectClient, Validators.required)
        ]),
        last_name: new FormControl('', [
          this.conditionalValidator(() => !this.selectClient, Validators.required)
        ]),
        first_name: new FormControl('', [
          this.conditionalValidator(() => !this.selectClient, Validators.required)
        ])
      }),
      type: new FormControl(this.typeFacture)
    });
    this.store.dispatch(loadClients({page:1}));
    this.error$ = this.store.select(selectInvoiceError);
  }

  ngOnInit() {
    if (this.typeFacture == TypeFacturation.PRODUCT) {
      this.store.dispatch(loadProducts({page:1}));
      this.products$ = this.store.select(selectAllProducts);
      this.products$.subscribe(products => {
        this.products = this.transformProductList(products);
      });
    }

    else {
      this.store.dispatch(loadServices({page:1}));
      this.services$ = this.store.select(selectAllServices);
      this.services$.subscribe(services => {
        this.products = this.transformProductList(services);
      });
    }

    this.clients$ = this.store.select(selectAllClients);
    this.loading$ = this.store.select(selectLoading);

    this.clients$.subscribe(clients => {
      this.clients = this.transformClientList(clients);
    });
    this.loading$.subscribe(loading => {
      this.loading = loading;
    });

    this.amountData = this.caculateTotalAmount();
  }

  transformProductList(products: Product[] | Service[]): any {
    return products.map(product => ({
      value: product.id,
      label: product.designation,
      data: {
        id: product.id,
        designation: product.designation,
        prix: product.price?.unit_price_excl,
        stock: product.stock
      }
    }));
  }

  transformClientList(clients: Client[]): any {
    return clients.map(client => ({
      value: client.id,
      label: client.full_name,
      data: {
        name: client.full_name
      }
    }));
  }

  createItem(): FormGroup {
    return new FormGroup({
      id: new FormControl('', [Validators.required]),
      quantity: new FormControl('1', [
        Validators.required,
        Validators.min(1),
        this.quantityValidator()
      ]),
      total: new FormControl('0'),
    });
  }

  get items(): FormArray {
    return this.createInvoiceForm.get('items') as FormArray;
  }

  get client(): FormArray {
    return this.createInvoiceForm.get('client') as FormArray;
  }

  addItem(): void {
    this.items.push(this.createItem());
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
    this.amountData = this.caculateTotalAmount()
  }

  onSubmit(): void {
    if (this.createInvoiceForm.valid) {
      this.store.dispatch(showLoader());
      this.store.dispatch(addInvoice({ invoice: this.createInvoiceForm.value }));
      this.createInvoiceForm.reset({type: this.typeFacture})
    } else {
      this.createInvoiceForm.markAllAsTouched();
    }
  }

  toggleClientSelectInput() {
    this.selectClient = !this.selectClient
    this.createInvoiceForm.get('client')?.reset()
  }

  caculateTotalAmount(): FactureAmount {
    if (this.items.length <= 1 && !this.items.at(0).get('id')) {
      console.log("not has");
      
      return {
        montantTotalHT: 0,
        montantTotalTaxe: 0,
        montantTotalTTC: 0
      }
    }
    else {
      console.log("has");

      let montantTotalHT = 0,
          montantTotalTaxe = 0;

      for (let i = 0; i < this.items.length; i++) {
        const element = this.items.at(i);
        const item = this.products.find(item => item.data.id === element.get('id')?.value);
        montantTotalHT += (item?.data.prix || 0) * element.get('quantity')?.value
      }

      montantTotalTaxe = montantTotalHT * 0.18

      return {
        montantTotalHT: montantTotalHT,
        montantTotalTaxe: montantTotalTaxe,
        montantTotalTTC: montantTotalTaxe + montantTotalHT
      }

    }
  }

  updateTotalAmount(data: any) {
    this.amountData = this.caculateTotalAmount()
  }

  onQuantityChange(index: number) {
    this.amountData = this.caculateTotalAmount()
  }

  conditionalValidator(conditionFn: () => boolean, validator: ValidatorFn): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!conditionFn()) {
        return null;
      }
      return validator(control);
    };
  }

  quantityValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const qte = control.value;
      const productId = control.parent?.get('id')?.value

      console.log("validation", qte, productId);
      

      const product = this.products?.find(item => item.data.id === productId)

      return qte > product?.data.stock ? { qteExceed: true } : null;
    };
  }

}
