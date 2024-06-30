import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorService {

  constructor() { }

  passwordComplexityValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value;

      const hasUppercase = /[A-Z]+/.test(password);
      const hasLowercase = /[a-z]+/.test(password);
      const hasNumeric = /[0-9]+/.test(password);
      const passwordValid = hasUppercase && hasLowercase && hasNumeric;

      return !passwordValid ? { passwordComplexity: true } : null;
    };
  }

}
