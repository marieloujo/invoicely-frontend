import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as ClientActions from './client.actions';
import { ClientService } from '../services/client.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ClientEffects {

  loadClients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActions.loadClients),
      mergeMap(action =>
        this.clientService.getClients(action.page).pipe(
          map(response => ClientActions.loadClientsSuccess({
            clients: response.data.data,
            currentPage: response.data.current_page,
            totalPages: response.data.last_page
          })),
          catchError(error => of(ClientActions.loadClientsFailure({ error })))
        )
      )
    )
  );

  addClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActions.addClient),
      mergeMap(action =>
        this.clientService.addClient(action.client).pipe(
          map(response => ClientActions.addClientSuccess({ client: response.data })),
          catchError(error => of(ClientActions.addClientFailure({ error })))
        )
      )
    )
  );

  updateClient$ = createEffect(() => this.actions$.pipe(
    ofType(ClientActions.updateClient),
    mergeMap(action => this.clientService.updateClient(action.client).pipe(
      map(response => ClientActions.updateClientSuccess({ client: response.data })),
      catchError(error => of(ClientActions.updateClientFailure({ error })))
    ))
  ));

  deleteClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActions.deleteClient),
      mergeMap(action => this.clientService.deleteClient(action.clientId).pipe(
          map(() => ClientActions.deleteClientSuccess({ clientId: action.clientId })),
          catchError(error => of(ClientActions.deleteClientFailure({ error })))
        )
      )
    )
  );

  addClientSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActions.addClientSuccess),
      map(action => {
        this.toastr.success('Client ajouté avec succès', 'Success');
        document.getElementById('dismiss-modal')?.click()
      })
    ), { dispatch: false }
  );

  addClientFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActions.addClientFailure),
      map(action => {
        this.toastr.error('Échec de l\'ajout d\'un client', 'Error');
        document.getElementById('dismiss-modal')?.click()
      })
    ), { dispatch: false }
  );

  updateClientSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActions.updateClientSuccess),
      map(action => {
        this.toastr.success('Le client a été mis à jour avec succès', 'Success');
        document.getElementById('dismiss-modal')?.click()
      })
    ), { dispatch: false }
  );

  updateClientFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActions.updateClientFailure),
      map(action => {
        this.toastr.error('Échec de la mise à jour du client', 'Error');
        document.getElementById('dismiss-modal')?.click()
      })
    ), { dispatch: false }
  );

  deleteClientSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActions.deleteClientSuccess),
      map(action => {
        this.toastr.success('Le client a été supprimé avec succès', 'Success');
        document.getElementById('dismiss-confirm-modal')?.click()
      })
    ), { dispatch: false }
  );

  deleteClientFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActions.deleteClientFailure),
      map(action => {
        this.toastr.error('Échec de la suppression du client', 'Error');
        document.getElementById('dismiss-confirm-modal')?.click()
      })
    ), { dispatch: false }
  );

  constructor(
    private toastr: ToastrService,
    private actions$: Actions,
    private clientService: ClientService
  ) {}
}
