import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.actions';
import { Product } from '@app/shared/models/product.model';

export interface ProductState {
  products: Product[];
  currentPage: number;
  totalPages: number;
  error: any;
  loading: boolean;
}

export const initialState: ProductState = {
  products: [],
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null
};

export const productReducer = createReducer(
  initialState,
  on(ProductActions.loadProductsSuccess, (state, { products, currentPage, totalPages }) => ({
    ...state,
    products,
    currentPage,
    totalPages
  })),
  on(ProductActions.loadProductsFailure, (state, { error }) => ({ ...state, error })),
  on(ProductActions.addProductSuccess, (state, { product }) => ({
    ...state,
    products: [...state.products, product],
    error: null,
    loading: false,
  })),
  on(ProductActions.addProductFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(ProductActions.updateProductSuccess, (state, { product }) => ({
    ...state,
    products: state.products.map(c => c.id === product.id ? product : c),
    loading: false,
  })),
  on(ProductActions.updateProductFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(ProductActions.deleteProductSuccess, (state, { productId }) => {
    return {
      ...state,
      products: state.products.filter(product => product.id !== productId),
      loading: false,
    };
  }),
  on(ProductActions.deleteProductFailure, (state, { error }) => {
    return {
      ...state,
      error,
      loading: false,
    };
  }),
  on(ProductActions.showLoader, state => ({
    ...state,
    loading: true
  })),

  on(ProductActions.hideLoader, state => ({
    ...state,
    loading: false
  })),
);