import { createReducer, on } from '@ngrx/store';
import * as ServiceActions from './service.actions';
import { Service } from '@app/shared/models/service.model';

export interface ServiceState {
  services: Service[];
  currentPage: number;
  totalPages: number;
  error: any;
  loading: boolean;
}

export const initialState: ServiceState = {
  services: [],
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null
};

export const serviceReducer = createReducer(
  initialState,
  on(ServiceActions.loadServicesSuccess, (state, { services, currentPage, totalPages }) => ({
    ...state,
    services,
    currentPage,
    totalPages
  })),
  on(ServiceActions.loadServicesFailure, (state, { error }) => ({ ...state, error })),
  on(ServiceActions.addServiceSuccess, (state, { service }) => ({
    ...state,
    services: [...state.services, service],
    error: null,
    loading: false,
  })),
  on(ServiceActions.addServiceFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(ServiceActions.updateServiceSuccess, (state, { service }) => ({
    ...state,
    services: state.services.map(c => c.id === service.id ? service : c),
    loading: false,
  })),
  on(ServiceActions.updateServiceFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(ServiceActions.deleteServiceSuccess, (state, { serviceId }) => {
    return {
      ...state,
      services: state.services.filter(service => service.id !== serviceId),
      loading: false,
    };
  }),
  on(ServiceActions.deleteServiceFailure, (state, { error }) => {
    return {
      ...state,
      error,
      loading: false,
    };
  }),
  on(ServiceActions.showLoader, state => ({
    ...state,
    loading: true
  })),

  on(ServiceActions.hideLoader, state => ({
    ...state,
    loading: false
  })),
);