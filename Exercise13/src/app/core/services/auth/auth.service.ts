import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  #http = inject(HttpClient);

  login(username: string, password: string){
    return this.#http.post<User>('https://dummyjson.com/auth/login', {
      username,
      password,
      expiresInMins: 60
    }
    );
  }

  getMyProfile(){
    return this.#http.get<User>('https://dummyjson.com/auth/me')
  }
}
