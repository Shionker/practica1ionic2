import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ApiService } from '../../providers/api.service';
import { Observable } from 'rxjs';
import { Shift } from '../../models/shift.interface';
import { Guard } from 'src/app/models/guard.interface';
import { AuthService } from 'src/app/providers/auth.service';


@Component({
  selector: 'app-rondas',
  templateUrl: './rondas.page.html',
  styleUrls: ['./rondas.page.scss'],
})
export class RondasPage implements OnInit {
  shifts$: Observable<Shift[]>
  shifts: Shift[]
  guard: Guard
  constructor(
    private modalController: ModalController,
    private browser: InAppBrowser,
    private api:ApiService ,
    private auth: AuthService,
    ) {}

  ngOnInit() {
    new Promise ((resolve, reject) => {
      this.guard = this.auth.guardData()
    /*   console.table(this.guard) */
      resolve()
    }).then(() => {
      this.shifts$ = this.api.getGuardShift(this.guard.id)
      this.api.getGuardShift(this.guard.id).toPromise()
        .then((data: any) => {
          this.shifts = data.shifts;
        /*   console.table(this.shifts) */
        })
    })
  }
  

  async closeModal(){
    await this.modalController.dismiss();
  }


  openUrl (place: string){
    place = place.replace(/ /g, '+')
    this.browser.create('https://www.google.cl/maps/place/'+ place,'_self')
  }
  
}

