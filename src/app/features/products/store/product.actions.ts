import { Product } from '@app/shared/models/product.model';
import { createAction, props } from '@ngrx/store';

export const loadProducts = createAction('[Product List] Load Products', props<{ page: number }>());
export const loadProductsSuccess = createAction('[Product List] Load Products Success', props<{ products: Product[], currentPage: number, totalPages: number }>());
export const loadProductsFailure = createAction('[Product List] Load Products Failure', props<{ error: any }>());

export const addProduct = createAction('[Product] Add Product', props<{ product: Product }>());
export const addProductSuccess = createAction('[Product] Add Product Success', props<{ product: Product }>());
export const addProductFailure = createAction('[Product] Add Product Failure', props<{ error: any }>());

export const updateProduct = createAction('[Product] Update Product', props<{ product: Product }>());
export const updateProductSuccess = createAction('[Product] Update Product Success', props<{ product: Product }>());
export const updateProductFailure = createAction('[Product] Update Product Failure', props<{ error: any }>());

export const deleteProduct = createAction('[Product] Delete Product', props<{ productId: string }>());
export const deleteProductSuccess = createAction('[Product] Delete Product Success', props<{ productId: string }>());
export const deleteProductFailure = createAction('[Product] Delete Product Failure', props<{ error: any }>());

export const showLoader = createAction('[Product] Show Loader');
export const hideLoader = createAction('[Product] Hide Loader');
