import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClientState } from './client.reducer';

export const selectClientState = createFeatureSelector<ClientState>('clients');

export const selectAllClients = createSelector(
  selectClientState,
  (state: ClientState) => state.clients
);

export const selectCurrentPage = createSelector(
  selectClientState,
  (state: ClientState) => state.currentPage
);

export const selectTotalPages = createSelector(
  selectClientState,
  (state: ClientState) => state.totalPages
);

export const selectClientError = createSelector(
  selectClientState,
  (state: ClientState) => state.error
);

export const selectSuccess = createSelector(
  selectClientState,
  (state: ClientState) => state.success
);

export const selectLoading = createSelector(
  selectClientState,
  (state: ClientState) => state.loading
);