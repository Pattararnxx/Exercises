import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {DecimalPipe, NgForOf, NgIf, NgOptimizedImage, NgStyle} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkActive, RouterLink, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  hasToken(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getUserName(): string {
    return localStorage.getItem('username') || '';
  }

  getProfileImage(): string {
    return localStorage.getItem('image') || '';
  }
}
