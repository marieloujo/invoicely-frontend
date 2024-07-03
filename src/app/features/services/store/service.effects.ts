import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as ServiceActions from './service.actions';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { ServiceService } from '../services/service.service';
import { ErrorHandlerService } from '@app/core/services/exceptions.service';

@Injectable()
export class ServiceEffects {

  loadServices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ServiceActions.loadServices),
      mergeMap(action =>
        this.serviceService.getServices(action.page).pipe(
          map(response => ServiceActions.loadServicesSuccess({
            services: response.data.data,
            currentPage: response.data.current_page,
            totalPages: response.data.last_page
          })),
          catchError(error => of(ServiceActions.loadServicesFailure({ error }))),
        )
      ),
    )
  );

  addService$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ServiceActions.addService),
      mergeMap(action =>
        this.serviceService.addService(action.service).pipe(
          map(response => ServiceActions.addServiceSuccess({ service: response.data })),
          catchError(error => of(ServiceActions.addServiceFailure({ error })))
        )
      ),
      tap(() => {
        this.store.dispatch(ServiceActions.hideLoader());
      })
    )
  );

  updateService$ = createEffect(() => this.actions$.pipe(
    ofType(ServiceActions.updateService),
    mergeMap(action => this.serviceService.updateService(action.service).pipe(
      map(response => ServiceActions.updateServiceSuccess({ service: response.data })),
      catchError(error => of(ServiceActions.updateServiceFailure({ error })))
    )),
    tap(() => {
      this.store.dispatch(ServiceActions.hideLoader());
    })
  ));

  deleteService$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ServiceActions.deleteService),
      mergeMap(action => this.serviceService.deleteService(action.serviceId).pipe(
          map(() => ServiceActions.deleteServiceSuccess({ serviceId: action.serviceId })),
          catchError(error => of(ServiceActions.deleteServiceFailure({ error })))
        )
      ),
      tap(() => {
        this.store.dispatch(ServiceActions.hideLoader());
      })
    )
  );


  loadServicesFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ServiceActions.loadServicesFailure),
      map(action => {
        this.errorHandlerService.handleError(action.error)
      })
    ), { dispatch: false }
  );

  addServiceSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ServiceActions.addServiceSuccess),
      map(action => {
        this.toastr.success('Service ajouté avec succès', 'Bravo!');
        document.getElementById('dismiss-modal')?.click()
      })
    ), { dispatch: false }
  );

  addServiceFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ServiceActions.addServiceFailure),
      map(action => {
        this.toastr.error('Échec de l\'ajout d\'un service', 'Oups!');
        this.errorHandlerService.handleError(action.error)
      })
    ), { dispatch: false }
  );

  updateServiceSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ServiceActions.updateServiceSuccess),
      map(action => {
        this.toastr.success('Le service a été mis à jour avec succès', 'Bravo!');
        document.getElementById('dismiss-modal')?.click()
      })
    ), { dispatch: false }
  );

  updateServiceFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ServiceActions.updateServiceFailure),
      map(action => {
        this.toastr.error('Échec de la mise à jour du service', 'Oups!');
        this.errorHandlerService.handleError(action.error)
      })
    ), { dispatch: false }
  );

  deleteServiceSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ServiceActions.deleteServiceSuccess),
      map(action => {
        this.toastr.success('Le service a été supprimé avec succès', 'Bravo!');
        document.getElementById('dismiss-confirm-modal')?.click()
      })
    ), { dispatch: false }
  );

  deleteServiceFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ServiceActions.deleteServiceFailure),
      map(action => {
        this.toastr.error('Échec de la suppression du service', 'Oups!');
        document.getElementById('dismiss-confirm-modal')?.click()
        this.errorHandlerService.handleError(action.error)
      })
    ), { dispatch: false }
  );

  constructor(
    private toastr: ToastrService,
    private actions$: Actions,
    private store: Store,
    private serviceService: ServiceService,
    private errorHandlerService: ErrorHandlerService
  ) {}
}
