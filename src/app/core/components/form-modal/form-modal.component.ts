import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ApiErrorBindingService } from "@app/shared/services/api-error-binding.service";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: 'app-product-form-modal',
  standalone: true,
  imports: [],
  template: ''
})
export class FormModalComponent {

  @Output() protected closeEditModeEvent = new EventEmitter<boolean>();

  protected loading: boolean = false;
  protected formGroup!: FormGroup;
  errorBinder = inject(ApiErrorBindingService);

  bindErrorToForm(error: any) {
    console.log("yes");
    
    if (error?.status == 422)
      this.errorBinder.bindErrorToForm(this.formGroup, error.error.errors)
    else {
      document.getElementById('dismiss-modal')?.click()
      this.reset()
    }
  }

  reset() {
    this.closeEditMode()
  }

  closeEditMode() {
    this.closeEditModeEvent.emit(false)
  }

}