import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Client } from '@app/shared/models/client.model';
import { addClient, showLoader, updateClient } from '@features/clients/store/client.actions';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { selectClientError, selectLoading } from '@features/clients/store/client.selectors';
import { AsyncPipe, NgIf } from '@angular/common';
import { ModalComponent } from '@app/shared/components/modal/modal.component';
import { FormButtonComponent } from '@app/shared/components/form-button/form-button.component';
import { FormErrorComponent } from '@app/shared/components/form-error/form-error.component';

@Component({
  selector: 'app-client-form-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    AsyncPipe,
    ModalComponent,
    FormErrorComponent,
    FormButtonComponent
  ],
  templateUrl: './client-form-modal.component.html',
  styleUrl: './client-form-modal.component.css'
})
export class ClientFormModalComponent {
  private subscription: Subscription = new Subscription;

  @Input() client: Client | null = null;
  @Input() isEditMode = false;

  @Output() closeEditModeEvent = new EventEmitter<boolean>();

  loading: boolean = false;
  buttonTitle: string = 'Ajouter';
  formTitle: string = 'Ajouter Client';

  clientForm = new FormGroup({
    first_name: new FormControl(this.client?.first_name, [Validators.required]),
    last_name: new FormControl(this.client?.last_name, [Validators.required]),
    adresse: new FormControl(this.client?.adresse, [Validators.required]),
    email: new FormControl(this.client?.email, [Validators.required, Validators.email]),
  })

  error$: Observable<string>;
  loading$: Observable<boolean>;


  constructor(private store: Store) {
    this.error$ = this.store.select(selectClientError);
    this.loading$ = this.store.select(selectLoading);
    this.subscription = this.loading$.subscribe(loading => {
      this.loading = loading;
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['client'] && this.client) {
      this.clientForm.patchValue(this.client);
    }
    if (changes['isEditMode']) {
      this.buttonTitle = this.isEditMode ? 'Enregistrer les modifications' : 'Ajouter';
      this.formTitle = this.isEditMode ? 'Modifier Client' : 'Ajouter Client';
    }
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      this.store.dispatch(showLoader());

      const client = {
        last_name: this.clientForm.value.last_name || '',
        first_name: this.clientForm.value.first_name || '',
        email: this.clientForm.value.email || '',
        adresse: this.clientForm.value.adresse || '',
      }
      if (this.isEditMode && this.client) {
        this.store.dispatch(updateClient({ client: { ...this.client, ...client } }));
      } else {
        this.store.dispatch(addClient({ client: { id: null, full_name: null, ...client} }));
      }
      this.reset()
    } else {
      this.clientForm.markAllAsTouched();
    }
  }

  reset() {
    this.closeEditMode()
  }

  closeEditMode() {
    this.closeEditModeEvent.emit(false)
  }

}
