import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../../core/services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    #authService = inject(AuthService);
    #router = inject(Router);

    fg = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    })

  onSubmit() {
    const username =this.fg.value.username ??'';
    const password = this.fg.value.password ??'';
    this.#authService.login(username,password).subscribe({
      next:(res)=>{
        console.log('logged in');
        console.log(res);
        this.#router.navigate(['/profile']).then();
      },
      error:(err)=>{
        console.log('failed to login');
        console.log(err);
      },
      complete:()=>{
        console.log('login complete');
      }
    })
  }
}
