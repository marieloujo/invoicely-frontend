import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormErrorComponent } from '@app/shared/components/form-error/form-error.component';
import { TypeFacturation } from '@app/shared/models/type-facturation';
import { AuthButtonComponent } from '@features/auth/ui/auth-button/auth-button.component';
import { CustomValidatorService } from '@features/auth/services/custom-validator.service';
import { AuthService } from '@features/auth/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    FormErrorComponent,
    AuthButtonComponent
  ],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  typeFacturations = Object.values(TypeFacturation);
  loading: boolean = false;
  errorMessage: string | null = null;

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      this.customValidator.passwordComplexityValidator()
    ]),
    passwordConfirmation: new FormControl('', [Validators.required]),
  });

  constructor(
    private customValidator: CustomValidatorService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  register(): void {
    if (this.registerForm.valid) {
      this.loading = true

      const body = {
        ...this.registerForm.value,
        password_confirmation: this.registerForm.value.passwordConfirmation || ''
      }

      this.authService.register(body).subscribe({
        next: (response) => {
          this.toastr.success('Votre compte a été créé avec succès. Vous pouvez à présent vous connecter.', 'Bravo!')
          this.loading = false
          this.router.navigate(['/auth/login'])
        },
        error: (err) => {
          if (err instanceof HttpErrorResponse) {
            this.handleFormErrors(err.error, err.status);
          }
          this.loading = false
        }
      });

    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  private handleFormErrors(error: any, status: number): void {
    this.errorMessage = null;
    if (status === 401) {
      this.errorMessage = "Email ou mot de passe incorrect"
    }
    else if (status == 422) {
      for (const field in error.errors) {
        if (this.registerForm.get(field)) {
          this.registerForm.get(field)!.setErrors({
            serverError: error.errors[field]
          });
        }
      }
    }
    else this.errorMessage = "Une erreur est survenue veuillez réessayer utltérieurement"
  }

}
