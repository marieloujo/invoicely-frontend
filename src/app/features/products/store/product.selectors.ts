import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.reducer';

export const selectProductState = createFeatureSelector<ProductState>('products');

export const selectAllProducts = createSelector(
  selectProductState,
  (state: ProductState) => state.products
);

export const selectCurrentPage = createSelector(
  selectProductState,
  (state: ProductState) => state.currentPage
);

export const selectTotalPages = createSelector(
  selectProductState,
  (state: ProductState) => state.totalPages
);

export const selectProductError = createSelector(
  selectProductState,
  (state: ProductState) => state.error
);

export const selectLoading = createSelector(
  selectProductState,
  (state: ProductState) => state.loading
);