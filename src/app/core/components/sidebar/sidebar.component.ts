import { Component, Renderer2 } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink, RouterLinkActive
  ],
  templateUrl: './sidebar.component.html',
  styles: ''
})
export class SidebarComponent {
  constructor(private renderer: Renderer2) {}
}
