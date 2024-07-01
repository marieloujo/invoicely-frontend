import { Service } from '@app/shared/models/service.model';
import { createAction, props } from '@ngrx/store';

export const loadServices = createAction('[Service List] Load Services', props<{ page: number }>());
export const loadServicesSuccess = createAction('[Service List] Load Services Success', props<{ services: Service[], currentPage: number, totalPages: number }>());
export const loadServicesFailure = createAction('[Service List] Load Services Failure', props<{ error: any }>());

export const addService = createAction('[Service] Add Service', props<{ service: Service }>());
export const addServiceSuccess = createAction('[Service] Add Service Success', props<{ service: Service }>());
export const addServiceFailure = createAction('[Service] Add Service Failure', props<{ error: any }>());

export const updateService = createAction('[Service] Update Service', props<{ service: Service }>());
export const updateServiceSuccess = createAction('[Service] Update Service Success', props<{ service: Service }>());
export const updateServiceFailure = createAction('[Service] Update Service Failure', props<{ error: any }>());

export const deleteService = createAction('[Service] Delete Service', props<{ serviceId: string }>());
export const deleteServiceSuccess = createAction('[Service] Delete Service Success', props<{ serviceId: string }>());
export const deleteServiceFailure = createAction('[Service] Delete Service Failure', props<{ error: any }>());

export const showLoader = createAction('[Service] Show Loader');
export const hideLoader = createAction('[Service] Hide Loader');
