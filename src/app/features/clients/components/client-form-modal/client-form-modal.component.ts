import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Client } from '@app/shared/models/client.model';
import { addClient, showLoader, updateClient } from '@features/clients/store/client.actions';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { selectClientError, selectLoading, selectSuccess } from '@features/clients/store/client.selectors';
import { AsyncPipe, NgIf } from '@angular/common';
import { ModalComponent } from '@app/shared/components/modal/modal.component';
import { FormButtonComponent } from '@app/shared/components/form-button/form-button.component';
import { FormErrorComponent } from '@app/shared/components/form-error/form-error.component';
import { FormModalComponent } from '@app/core/components/form-modal/form-modal.component';

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
  templateUrl: './client-form-modal.component.html'
})
export class ClientFormModalComponent extends FormModalComponent {

  @Input() client: Client | null = null;
  @Input() isEditMode = false;

  buttonTitle: string = 'Ajouter';
  formTitle: string = 'Ajouter Client';

  error$: Observable<string>;
  success$: Observable<boolean>;
  loading$: Observable<boolean>;


  constructor(private store: Store) {
    super()

    this.formGroup = new FormGroup({
      first_name: new FormControl(this.client?.first_name, [Validators.required]),
      last_name: new FormControl(this.client?.last_name, [Validators.required]),
      adresse: new FormControl(this.client?.adresse, [Validators.required]),
      email: new FormControl(this.client?.email, [Validators.required, Validators.email]),
    })

    this.error$ = this.store.select(selectClientError);
    this.success$ = this.store.select(selectSuccess);
    this.loading$ = this.store.select(selectLoading);

    this.loading$.subscribe(loading => {this.loading = loading;});
    this.error$.subscribe(error => {this.bindErrorToForm(error)});
    this.success$.subscribe(success => {this.reset()})
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['client'] && this.client) {
      this.formGroup.patchValue(this.client);
    }
    if (changes['isEditMode']) {
      this.buttonTitle = this.isEditMode ? 'Enregistrer les modifications' : 'Ajouter';
      this.formTitle = this.isEditMode ? 'Modifier Client' : 'Ajouter Client';
    }
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.store.dispatch(showLoader());
      if (this.isEditMode && this.client) {
        this.store.dispatch(updateClient({ client: { ...this.client, ...this.formGroup.value } }));
      } else {
        this.store.dispatch(addClient({ client: { id: null, full_name: null, ...this.formGroup.value} }));
      }
      this.reset()
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

}
