import { AsyncPipe, NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Component } from '@angular/core';
import { TableComponent } from '@app/shared/components/table/table.component';
import { ProductFormModalComponent } from '../product-form-modal/product-form-modal.component';
import { ConfirmModalComponent } from '@app/shared/components/confirm-modal/confirm-modal.component';
import { PaginationComponent } from '@app/shared/components/pagination/pagination.component';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Product } from '@app/shared/models/product.model';
import { selectAllProducts, selectCurrentPage, selectTotalPages } from '../../store/product.selectors';
import { addProduct, deleteProduct, loadProducts } from '../../store/product.actions';
import { CurrencyXofPipe } from '@app/shared/pipes/currency-xof.pipe';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    NgFor, NgIf,
    NgSwitch, NgSwitchCase, NgSwitchDefault,
    AsyncPipe,
    CurrencyXofPipe,
    TableComponent,
    ProductFormModalComponent,
    ConfirmModalComponent,
    PaginationComponent
  ],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent {
  private subscription: Subscription = new Subscription;

  products$: Observable<Product[]>;
  currentPage$: Observable<number>;
  totalPages$: Observable<number>;

  selectedProduct: Product | null = null;
  productToDelete: Product | null = null;

  currentPage: number = 1;
  totalPages: number = 1;
  isEditMode: boolean = false;

  constructor(private store: Store) {
    this.products$ = this.store.select(selectAllProducts);
    this.currentPage$ = this.store.select(selectCurrentPage);
    this.totalPages$ = this.store.select(selectTotalPages);
  }

  ngOnInit(): void {
    this.loadProducts(1);
    this.subscription = this.currentPage$.subscribe(page => {
      this.currentPage = page;
    });
    this.subscription = this.totalPages$.subscribe(page => {
      this.totalPages = page;
    });
  }

  loadProducts(page: number): void {
    this.store.dispatch(loadProducts({ page }));
  }

  onAddProduct(product: Product): void {
    this.store.dispatch(addProduct({ product: product }));
  }

  confirmDelete(product: Product): void {
    this.productToDelete = product;
  }

  onDeleteConfirmed(confirm: boolean): void {
    if (confirm) {
      this.store.dispatch(deleteProduct({ productId: this.productToDelete?.id ?? '' }));
    }
  }

  openEditModal(product: Product): void {
    this.selectedProduct = product;
    this.isEditMode = true;
  }

  goToPage(page: number): void {
    this.loadProducts(page);
  }

  closeEditMode(state: boolean) {
    this.isEditMode = state;
    this.selectedProduct = null
  }

  determineStockLevel(product: Product): string {
    const difference = (product.stock ?? 0) - (product.lower_limit ?? 0);

    if (difference > 10) {
      return 'bon';
    } else if (difference >= 0) {
      return 'alert';
    } else {
      return 'critique';
    }
  }

}
