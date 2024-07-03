import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TableComponent } from '@app/shared/components/table/table.component';
import { ServiceFormModalComponent } from '../service-form-modal/service-form-modal.component';
import { ConfirmModalComponent } from '@app/shared/components/confirm-modal/confirm-modal.component';
import { PaginationComponent } from '@app/shared/components/pagination/pagination.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Service } from '@app/shared/models/service.model';
import { addService, deleteService, loadServices } from '../../store/service.actions';
import { selectAllServices, selectCurrentPage, selectTotalPages, selectServiceError } from '../../store/service.selectors';
import { CurrencyXofPipe } from '@app/shared/pipes/currency-xof.pipe';

@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [
    NgFor, NgIf,
    AsyncPipe,
    CurrencyXofPipe,
    TableComponent,
    ServiceFormModalComponent,
    ConfirmModalComponent,
    PaginationComponent
  ],
  templateUrl: './service-list.component.html'
})
export class ServiceListComponent {
  services$: Observable<Service[]>;
  currentPage$: Observable<number>;
  totalPages$: Observable<number>;
  error$: Observable<any>;

  selectedService: Service | null = null;
  serviceToDelete: Service | null = null;

  currentPage: number = 1;
  errorMessage: string = '';
  totalPages: number = 1;
  isEditMode: boolean = false;

  constructor(private store: Store) {
    this.services$ = this.store.select(selectAllServices);
    this.currentPage$ = this.store.select(selectCurrentPage);
    this.totalPages$ = this.store.select(selectTotalPages);
    this.error$ = this.store.select(selectServiceError);
  }

  ngOnInit(): void {
    this.loadServices(1);
    this.currentPage$.subscribe(page => { this.currentPage = page; });
    this.totalPages$.subscribe(page => { this.totalPages = page; });
    this.error$.subscribe(error => { this.displayError(error) });
  }

  loadServices(page: number): void {
    this.store.dispatch(loadServices({ page }));
  }

  onAddService(service: Service): void {
    this.store.dispatch(addService({ service: service }));
  }

  confirmDelete(service: Service): void {
    this.serviceToDelete = service;
  }

  onDeleteConfirmed(confirm: boolean): void {
    if (confirm) {
      this.store.dispatch(deleteService({ serviceId: this.serviceToDelete?.id ?? '' }));
    }
  }

  openEditModal(service: Service): void {
    this.selectedService = service;
    this.isEditMode = true;
  }

  goToPage(page: number): void {
    this.loadServices(page);
  }

  closeEditMode(state: boolean) {
    this.isEditMode = state;
    this.selectedService = null
  }

  displayError(error: any) {
    if (error?.status != 422) this.errorMessage = error?.error?.message;
  }

}
