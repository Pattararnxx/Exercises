import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const accessToken = localStorage.getItem('access_token');
  if(accessToken){
    return true;
  }else{
    router.navigate(['/login']).then();
    return false;
  }

};
