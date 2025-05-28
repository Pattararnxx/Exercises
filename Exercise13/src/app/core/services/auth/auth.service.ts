import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../../../shared/models/user.model';
import {tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  #http = inject(HttpClient);

  login(email: string, password: string){
    return this.#http.post<User>('http://localhost:3000/auth/login', {
      email,
      password,
    }).pipe(
        tap(response => {
          localStorage.setItem('access_token', response.access_token);
        })
      );
  }

  getMyProfile(){
    const token = localStorage.getItem('access_token') || '';
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.#http.get<User>('http://localhost:3000/auth/profile',{headers});
  }

  logout() {
    localStorage.removeItem('access_token');
  }
}
