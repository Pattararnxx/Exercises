import {Component, inject, signal} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {DecimalPipe, NgForOf, NgIf, NgOptimizedImage, NgStyle} from '@angular/common';
import {AuthService} from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkActive, RouterLink, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  #authService = inject(AuthService);
  firstName = signal<string>('');

  hasToken(): boolean {
    return !!localStorage.getItem('access_token');
  }

  constructor() {
    this.#authService.getMyProfile().subscribe({
      next: (profile) => {
        this.firstName.set(profile.first_name);
      },
      error: (err) => {
        console.error('Failed to load profile', err);
      }
    });
  }

  getFirstName(): string {
    return this.firstName();
  }

}
