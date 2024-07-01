import { Component, Input } from '@angular/core';
import { User } from '@app/shared/models/user.model';
import { AuthService } from '@features/auth/services/auth.service';
import { TokenService } from '../../../shared/services/token.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styles: ''
})
export class HeaderComponent {
  @Input() username!: string;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private toastr: ToastrService
  ) {

  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.tokenService.deleteToken()
        this.router.navigate(['/auth/login'])
      },
      error: (err) => {
        this.toastr.error("Echec de déconnexion", "error")
      }
    })
  }

}
