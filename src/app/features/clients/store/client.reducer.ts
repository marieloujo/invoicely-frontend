import { createReducer, on } from '@ngrx/store';
import * as ClientActions from './client.actions';
import { Client } from '@app/shared/models/client.model';

export interface ClientState {
  clients: Client[];
  currentPage: number;
  totalPages: number;
  error: any;
  success: boolean;
  loading: boolean;
}

export const initialState: ClientState = {
  clients: [],
  currentPage: 1,
  totalPages: 1,
  loading: false,
  success: false,
  error: null
};

export const clientReducer = createReducer(
  initialState,
  on(ClientActions.loadClientsSuccess, (state, { clients, currentPage, totalPages }) => ({
    ...state,
    clients,
    currentPage,
    totalPages
  })),
  on(ClientActions.loadClientsFailure, (state, { error }) => ({ ...state, error })),
  on(ClientActions.addClientSuccess, (state, { client }) => ({
    ...state,
    clients: [...state.clients, client],
    error: null,
    loading: false,
    success: true,
  })),
  on(ClientActions.addClientFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(ClientActions.updateClientSuccess, (state, { client }) => ({
    ...state,
    clients: state.clients.map(c => c.id === client.id ? client : c),
    loading: false,
    success: true,
  })),
  on(ClientActions.updateClientFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(ClientActions.deleteClientSuccess, (state, { clientId }) => {
    return {
      ...state,
      clients: state.clients.filter(client => client.id !== clientId),
      loading: false,
    };
  }),
  on(ClientActions.deleteClientFailure, (state, { error }) => {
    return {
      ...state,
      error,
      loading: false,
    };
  }),
  on(ClientActions.showLoader, state => ({
    ...state,
    loading: true
  })),

  on(ClientActions.hideLoader, state => ({
    ...state,
    loading: false
  })),
);