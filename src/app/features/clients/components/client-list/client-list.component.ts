import { Component } from '@angular/core';
import { Client } from '@app/shared/models/client.model';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, Subscription } from 'rxjs';
import { selectAllClients, selectCurrentPage, selectTotalPages } from '../../store/client.selectors';
import { loadClients, addClient, deleteClient } from '../../store/client.actions';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ClientFormModalComponent } from '../client-form-modal/client-form-modal.component';
import { ConfirmModalComponent } from '@app/shared/components/confirm-modal/confirm-modal.component';
import { TableComponent } from '@app/shared/components/table/table.component';
import { PaginationComponent } from '@app/shared/components/pagination/pagination.component';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [
    NgFor, NgIf,
    AsyncPipe,
    TableComponent,
    ClientFormModalComponent,
    ConfirmModalComponent,
    PaginationComponent
  ],
  templateUrl: './client-list.component.html',
})
export class ClientListComponent {
  private subscription: Subscription = new Subscription;

  clients$: Observable<Client[]>;
  currentPage$: Observable<number>;
  totalPages$: Observable<number>;

  selectedClient: Client | null = null;
  clientToDelete: Client | null = null;

  currentPage: number = 1;
  totalPages: number = 1;
  isEditMode: boolean = false;

  constructor(private store: Store) {
    this.clients$ = this.store.select(selectAllClients);
    this.currentPage$ = this.store.select(selectCurrentPage);
    this.totalPages$ = this.store.select(selectTotalPages);
  }

  ngOnInit(): void {
    this.loadClients(1);
    this.subscription = this.currentPage$.subscribe(page => {
      this.currentPage = page;
    });
    this.subscription = this.totalPages$.subscribe(page => {
      this.totalPages = page;
    });
  }

  loadClients(page: number): void {
    this.store.dispatch(loadClients({ page }));
  }

  onAddClient(client: Client): void {
    this.store.dispatch(addClient({ client: client }));
  }

  confirmDelete(client: Client): void {
    this.clientToDelete = client;
  }

  onDeleteConfirmed(confirm: boolean): void {
    if (confirm) {
      this.store.dispatch(deleteClient({ clientId: this.clientToDelete?.id ?? '' }));
    }
  }

  openEditModal(client: Client): void {
    this.selectedClient = client;
    this.isEditMode = true;
  }

  goToPage(page: number): void {
    this.loadClients(page);
  }

  closeEditMode(state: boolean) {
    console.log("start close mode", this.isEditMode, this.selectedClient);
    this.isEditMode = state;
    this.selectedClient = null
    console.log("end close mode", this.isEditMode, this.selectedClient);
  }

}
