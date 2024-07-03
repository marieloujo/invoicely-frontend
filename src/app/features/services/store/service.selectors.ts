import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ServiceState } from './service.reducer';

export const selectServiceState = createFeatureSelector<ServiceState>('services');

export const selectAllServices = createSelector(
  selectServiceState,
  (state: ServiceState) => state.services
);

export const selectCurrentPage = createSelector(
  selectServiceState,
  (state: ServiceState) => state.currentPage
);

export const selectTotalPages = createSelector(
  selectServiceState,
  (state: ServiceState) => state.totalPages
);

export const selectServiceError = createSelector(
  selectServiceState,
  (state: ServiceState) => state.error
);

export const selectSuccess = createSelector(
  selectServiceState,
  (state: ServiceState) => state.success
);

export const selectLoading = createSelector(
  selectServiceState,
  (state: ServiceState) => state.loading
);