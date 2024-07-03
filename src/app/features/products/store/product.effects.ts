import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as ProductActions from './product.actions';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { ProductService } from '../services/product.service';
import { ErrorHandlerService } from '@app/core/services/exceptions.service';

@Injectable()
export class ProductEffects {

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(action =>
        this.productService.getProducts(action.page).pipe(
          map(response => ProductActions.loadProductsSuccess({
            products: response.data.data,
            currentPage: response.data.current_page,
            totalPages: response.data.last_page
          })),
          catchError(error => of(ProductActions.loadProductsFailure({ error }))),
        )
      ),
    )
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.addProduct),
      mergeMap(action =>
        this.productService.addProduct(action.product).pipe(
          map(response => ProductActions.addProductSuccess({ product: response.data })),
          catchError(error => of(ProductActions.addProductFailure({ error })))
        )
      ),
      tap(() => {
        this.store.dispatch(ProductActions.hideLoader());
      })
    )
  );

  updateProduct$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.updateProduct),
    mergeMap(action => this.productService.updateProduct(action.product).pipe(
      map(response => ProductActions.updateProductSuccess({ product: response.data })),
      catchError(error => of(ProductActions.updateProductFailure({ error })))
    )),
    tap(() => {
      this.store.dispatch(ProductActions.hideLoader());
    })
  ));

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      mergeMap(action => this.productService.deleteProduct(action.productId).pipe(
          map(() => ProductActions.deleteProductSuccess({ productId: action.productId })),
          catchError(error => of(ProductActions.deleteProductFailure({ error })))
        )
      ),
      tap(() => {
        this.store.dispatch(ProductActions.hideLoader());
      })
    )
  );

  loadProductsFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProductsFailure),
      map(action => {
        this.errorHandlerService.handleError(action.error)
      })
    ), { dispatch: false }
  );

  addProductSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.addProductSuccess),
      map(action => {
        this.toastr.success('Produit ajouté avec succès', 'Bravo!');
        this.productService.closeForm()
      })
    ), { dispatch: false }
  );

  addProductFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.addProductFailure),
      map(action => {
        this.toastr.error('Échec de l\'ajout d\'un produit', 'Oups!');
        this.errorHandlerService.handleError(action.error)
      })
    ), { dispatch: false }
  );

  updateProductSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProductSuccess),
      map(action => {
        this.toastr.success('Le produit a été mis à jour avec succès', 'Bravo!');
        this.productService.closeForm()
      })
    ), { dispatch: false }
  );

  updateProductFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProductFailure),
      map(action => {
        this.toastr.error('Échec de la mise à jour du produit', 'Oups!');
        this.errorHandlerService.handleError(action.error)
      })
    ), { dispatch: false }
  );

  deleteProductSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProductSuccess),
      map(action => {
        this.toastr.success('Le produit a été supprimé avec succès', 'Bravo!');
        document.getElementById('dismiss-confirm-modal')?.click()
      })
    ), { dispatch: false }
  );

  deleteProductFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProductFailure),
      map(action => {
        this.toastr.error('Échec de la suppression du produit', 'Oups!');
        document.getElementById('dismiss-confirm-modal')?.click()
        this.errorHandlerService.handleError(action.error)
      })
    ), { dispatch: false }
  );

  constructor(
    private toastr: ToastrService,
    private actions$: Actions,
    private store: Store,
    private productService: ProductService,
    private errorHandlerService: ErrorHandlerService
  ) {}
}
