import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../../../shared/models/user.model';
import {tap} from 'rxjs';
import {Router} from '@angular/router';
interface LoginResponse {
  access_token: string;
  user: {
    email: string;
    first_name: string;
    last_name: string;
  };
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  #http = inject(HttpClient);
  #router = inject(Router);

  login(email: string, password: string){
    return this.#http.post<LoginResponse>('http://localhost:3000/auth/login', {
      email,
      password,
    }).pipe(
        tap(response => {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('username', response.user.email);
        })
      );
  }

  getMyProfile() {
    return this.#http.get<User>('http://localhost:3000/auth/profile');
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    this.#router.navigate(['/login']);
  }
}
