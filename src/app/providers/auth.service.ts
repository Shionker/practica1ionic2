import { Injectable, NgZone } from '@angular/core';
import { ApiService } from './api.service';
import { Guard } from '../models/guard.interface';
import { Toast } from '@ionic-native/toast/ngx';
import { Router } from '@angular/router';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { NavController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private api: ApiService,
    private router: Router,
    public ngZone: NgZone,
    private navController: NavController,
    private toast: Toast
  ) {

  }
  login(userdata: Guard) {
    this.api.login(userdata.rut, userdata.password).toPromise()
      .then((res: any) => {
        if (res.success) {
        /*   console.table(res.data) */
          
          const token: string = res.data.accessToken;
          
          const decoded = jwtDecode<JwtPayload>(token);
         /*  console.log('algo text', decoded); */
          res.data['id'] = decoded.sub
          sessionStorage.setItem('guard', JSON.stringify(res.data))
          this.router.navigate(['/tabs/tab1'])
        } else {
          throw new Error('no se logro logear')
        }
      })
      .catch(error => {
       /*  this.toast.show(error.message, '3000', 'center').toPromise()
          .then(toast => {
            console.log(toast)
          }) */
      console.error(error)    
      })
  }
  logout(){
    sessionStorage.removeItem('guard');
    this.ngZone.run(() => {
      this.navController.navigateRoot(['/login'])
    });
  }

  isLogged() {
    if (sessionStorage.getItem("guard") == null) {
      return false;
    }
    else {
      return true;
    }
  }

  guardData(){
    return JSON.parse(sessionStorage.getItem('guard'))
  }

}

