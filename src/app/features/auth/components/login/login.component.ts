import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@features/auth/services/auth.service';
import { LoginRequest } from '@features/auth/types/login-request';
import { NgIf } from '@angular/common';
import { FormErrorComponent } from '@shared/components/form-error/form-error.component';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthButtonComponent } from '@features/auth/ui/auth-button/auth-button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgIf,
    FormErrorComponent,
    AuthButtonComponent
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  loading: boolean = false;
  errorMessage: string | null = null;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(private authService: AuthService, private router: Router) {
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login(): void {
    if (this.loginForm.valid) {
      this.loading = true

      const body: LoginRequest = {
        email: this.loginForm.value.email || '',
        password: this.loginForm.value.password || '',
      }
      this.authService.login(body).subscribe({
        next: (response) => {
          this.loading = false
          this.authService.saveTokenAndUser(response.data)
          this.router.navigate(['/app'])
        },
        error: (err) => {
          console.error('Login error', err);
          if (err instanceof HttpErrorResponse) {
            this.handleFormErrors(err.error, err.status);
          }
          this.loading = false
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  private handleFormErrors(error: any, status: number): void {
    this.errorMessage = null;
    if (status === 401) {
      this.errorMessage = "Email ou mot de passe incorrect"
    }
    else if (status == 422) {
      for (const field in error.errors) {
        if (this.loginForm.get(field)) {
          this.loginForm.get(field)!.setErrors({
            serverError: error.errors[field]
          });
        }
      }
    }
    else this.errorMessage = "Une erreur est survenue veuillez réessayer utltérieurement"
  }

}
