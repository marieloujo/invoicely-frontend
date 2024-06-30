import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormErrorComponent } from '@app/shared/components/form-error/form-error.component';
import { Client } from '@app/shared/models/client.model';
import { addClient, updateClient } from '../../store/client.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectClientError } from '../../store/client.selectors';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-client-form-modal',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, AsyncPipe, FormErrorComponent],
  templateUrl: './client-form-modal.component.html',
  styleUrl: './client-form-modal.component.css'
})
export class ClientFormModalComponent {

  @Input() client: Client | null = null;
  @Input() isEditMode = false;

  loading = false;

  clientForm = new FormGroup({
    first_name: new FormControl(this.client?.first_name, [Validators.required]),
    last_name: new FormControl(this.client?.last_name, [Validators.required]),
    adresse: new FormControl(this.client?.adresse, [Validators.required]),
    email: new FormControl(this.client?.email, [Validators.required, Validators.email]),
  })

  error$: Observable<string>;


  constructor(private store: Store) {
    this.error$ = this.store.select(selectClientError);
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['client'] && this.client) {
      this.clientForm.patchValue(this.client);
    }
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      this.loading = true;

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
    } else {
      this.clientForm.markAllAsTouched();
    }
    this.clientForm.patchValue({});
  }

}
