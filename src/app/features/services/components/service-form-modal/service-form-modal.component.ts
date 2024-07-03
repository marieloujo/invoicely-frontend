import { AsyncPipe, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormButtonComponent } from '@app/shared/components/form-button/form-button.component';
import { FormErrorComponent } from '@app/shared/components/form-error/form-error.component';
import { ModalComponent } from '@app/shared/components/modal/modal.component';
import { Service } from '@app/shared/models/service.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLoading, selectServiceError, selectSuccess } from '../../store/service.selectors';
import { addService, showLoader, updateService } from '../../store/service.actions';
import { FormModalComponent } from '@app/core/components/form-modal/form-modal.component';

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
export class ServiceFormModalComponent extends FormModalComponent {

  @Input() service: Service | null = null;
  @Input() isEditMode = false;

  buttonTitle: string = 'Ajouter';
  formTitle: string = 'Ajouter Service';

  error$: Observable<any>;
  success$: Observable<boolean>;
  loading$: Observable<boolean>;

  constructor(private store: Store) {
    super()

    this.formGroup = new FormGroup({
      designation: new FormControl(this.service?.designation, [Validators.required]),
      prix: new FormControl(this.service?.price?.unit_price_excl, [
        Validators.required,
        Validators.min(1),
        Validators.pattern(/^\d+(\.\d{1,2})?$/)
      ])
    })

    this.error$ = this.store.select(selectServiceError);
    this.loading$ = this.store.select(selectLoading);
    this.success$ = this.store.select(selectSuccess);

    this.loading$.subscribe(loading => {this.loading = loading;});
    this.error$.subscribe(error => {this.bindErrorToForm(error)});
    this.success$.subscribe(success => {this.reset()})
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['service'] && this.service) {
      this.formGroup.patchValue({
        designation: this.service.designation,
        prix: this.service.price?.unit_price_excl
      });
    }
    if (changes['isEditMode']) {
      this.buttonTitle = this.isEditMode ? 'Enregistrer les modifications' : 'Ajouter';
      this.formTitle = this.isEditMode ? 'Modifier Service' : 'Ajouter Service';
    }
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.store.dispatch(showLoader());

      const service = { ...this.formGroup.value || '',
        id: null, slug: null, stock: null, price: null
      }

      if (this.isEditMode && this.service) {
        this.store.dispatch(updateService({ service: { ...service, id: this.service.id  } }));
      } else {
        this.store.dispatch(addService({ service: service }));
      }
      this.reset()
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

}
