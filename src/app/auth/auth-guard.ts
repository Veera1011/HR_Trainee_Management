import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Authservice } from './authservice';

export const authGuard: CanActivateFn = (route, state) => {

  const authservice=inject(Authservice);
  const router=inject(Router);


  if(authservice.isloggedin()){
    return true

  }
  else{
    router.navigate(['/']);
    return false
  }



 
 
}