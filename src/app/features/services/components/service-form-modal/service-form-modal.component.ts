import { AsyncPipe, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormButtonComponent } from '@app/shared/components/form-button/form-button.component';
import { FormErrorComponent } from '@app/shared/components/form-error/form-error.component';
import { ModalComponent } from '@app/shared/components/modal/modal.component';
import { Service } from '@app/shared/models/service.model';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { selectLoading, selectServiceError } from '../../store/service.selectors';
import { addService, showLoader, updateService } from '../../store/service.actions';

@Component({
  selector: 'app-service-form-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    AsyncPipe,
    ModalComponent,
    FormErrorComponent,
    FormButtonComponent
  ],
  templateUrl: './service-form-modal.component.html'
})
export class ServiceFormModalComponent {
  private subscription: Subscription = new Subscription;

  @Input() service: Service | null = null;
  @Input() isEditMode = false;

  @Output() closeEditModeEvent = new EventEmitter<boolean>();

  loading: boolean = false;
  buttonTitle: string = 'Ajouter';
  formTitle: string = 'Ajouter Service';

  serviceForm = new FormGroup({
    designation: new FormControl(this.service?.designation, [Validators.required]),
    price: new FormControl(this.service?.price?.unit_price_excl, [
      Validators.required,
      Validators.min(1),
      Validators.pattern(/^\d+(\.\d{1,2})?$/)
    ])
  })

  error$: Observable<string>;
  loading$: Observable<boolean>;

  constructor(private store: Store) {
    this.error$ = this.store.select(selectServiceError);
    this.loading$ = this.store.select(selectLoading);
    this.subscription = this.loading$.subscribe(loading => {
      this.loading = loading;
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['service'] && this.service) {
      this.serviceForm.patchValue({
        designation: this.service.designation,
        price: this.service.price?.unit_price_excl
      });
    }
    if (changes['isEditMode']) {
      this.buttonTitle = this.isEditMode ? 'Enregistrer les modifications' : 'Ajouter';
      this.formTitle = this.isEditMode ? 'Modifier Service' : 'Ajouter Service';
    }
  }

  onSubmit(): void {
    if (this.serviceForm.valid) {
      this.store.dispatch(showLoader());

      const service = {
        designation: this.serviceForm.value.designation || '',
        prix: this.serviceForm.value.price || '',
        id: null,
        slug: null,
        stock: null,
        price: null
      }

      if (this.isEditMode && this.service) {
        this.store.dispatch(updateService({ service: { ...service, id: this.service.id  } }));
      } else {
        this.store.dispatch(addService({ service: service }));
      }
      this.reset()
    } else {
      this.serviceForm.markAllAsTouched();
    }
  }

  reset() {
    this.closeEditMode()
  }

  closeEditMode() {
    this.closeEditModeEvent.emit(false)
  }

}
