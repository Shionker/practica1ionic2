import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';
import { AuthService } from '../providers/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

constructor(
  private authservice:AuthService, 
  private router: Router){}

  /* canLoad(): Observable<boolean>{
    return this.authservice.login.pipe(

    )
  } */
  canActivate() {
    if (!this.authservice.isLogged()) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
  canActivateChild(){
    if (!this.authservice.isLogged()) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
