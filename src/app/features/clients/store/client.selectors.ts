import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './client.reducer';

export const selectClientState = createFeatureSelector<State>('clients');

export const selectAllClients = createSelector(
  selectClientState,
  (state: State) => state.clients
);

export const selectCurrentPage = createSelector(
  selectClientState,
  (state: State) => state.currentPage
);

export const selectTotalPages = createSelector(
  selectClientState,
  (state: State) => state.totalPages
);

export const selectClientError = createSelector(
  selectClientState,
  (state: State) => state.error
);

export const selectLoading = createSelector(
  selectClientState,
  (state: State) => state.loading
);