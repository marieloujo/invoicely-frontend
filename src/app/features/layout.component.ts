import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from '@app/shared/models/user.model';
import { FooterComponent } from '@core/components/footer/footer.component';
import { HeaderComponent } from '@core/components/header/header.component';
import { SidebarComponent } from '@core/components/sidebar/sidebar.component';
import { LocalStorageService } from '../shared/services/local-storage.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  templateUrl: './layout.component.html',
  styles: ''
})
export class LayoutComponent {
  user!: User;

  constructor(
    private localStorageService: LocalStorageService
  ) {
    this.user = localStorageService.getItem('user')
  }

}
