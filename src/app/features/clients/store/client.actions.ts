import { Client } from '@app/shared/models/client.model';
import { createAction, props } from '@ngrx/store';

export const loadClients = createAction('[Client List] Load Clients', props<{ page: number }>());
export const loadClientsSuccess = createAction('[Client List] Load Clients Success', props<{ clients: Client[], currentPage: number, totalPages: number }>());
export const loadClientsFailure = createAction('[Client List] Load Clients Failure', props<{ error: any }>());

export const addClient = createAction('[Client] Add Client', props<{ client: Client }>());
export const addClientSuccess = createAction('[Client] Add Client Success', props<{ client: Client }>());
export const addClientFailure = createAction('[Client] Add Client Failure', props<{ error: any }>());

export const updateClient = createAction('[Client] Update Client', props<{ client: Client }>());
export const updateClientSuccess = createAction('[Client] Update Client Success', props<{ client: Client }>());
export const updateClientFailure = createAction('[Client] Update Client Failure', props<{ error: any }>());

export const deleteClient = createAction('[Client] Delete Client', props<{ clientId: string }>());
export const deleteClientSuccess = createAction('[Client] Delete Client Success', props<{ clientId: string }>());
export const deleteClientFailure = createAction('[Client] Delete Client Failure', props<{ error: any }>());
