import {Component, inject, signal} from '@angular/core';
import {AuthService} from '../../core/services/auth/auth.service';
import {User} from '../../shared/models/user.model';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  #authService = inject(AuthService);

  profile = signal<User | null>(null)

  constructor() {
    this.#authService.getMyProfile().subscribe({
      next: (profile) => {
        this.profile.set(profile);
      },
      error: (err) => {
        console.log('failed to load profile', err);
      },
      complete: () => {
        console.log('profile loaded');
      }
    })
  }
}
