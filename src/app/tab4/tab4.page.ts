import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
/* import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx'; */
import { Platform, AlertController, ToastController } from '@ionic/angular'
import { ApiService } from '../providers/api.service';
import { Guard } from '../models/guard.interface';
import { Shift } from '../models/shift.interface';
import { Observable } from 'rxjs';
import { AuthService } from '../providers/auth.service';
import { Incident } from '../models/incident.interface';
import { Router } from '@angular/router';

//geolocalizacion por capacitor
import { CallbackID, Capacitor } from '@capacitor/core';
import { Plugins } from '@capacitor/core';
const { Geolocation, Toast } = Plugins;

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  registerForm: FormGroup
  shifts$: Observable<Shift[]>
  shifts: Shift[]
  guard: Guard
  incident: Incident[]
  coordinate: any;
  watchCoordinate: any;
  watchId: any;

  constructor(
    public toastController: ToastController,
    public formBuilder: FormBuilder,
    private api: ApiService,
    private plt: Platform,
    /* private localNotifications: LocalNotifications, */
    private auth: AuthService,
    private alertCtrl: AlertController,
    private router: Router,
    private zone: NgZone
  ) {


    this.getCurrentCoordinate()

    new Promise((resolve, reject) => {
      this.guard = this.auth.guardData()
     /*  console.table(this.guard) */
      resolve()
    }).then(() => {
      this.shifts$ = this.api.getGuardShift(this.guard.id)
      this.api.getGuardShift(this.guard.id).toPromise()
        .then((data: any) => {
          this.shifts = data.shifts;
         /*  console.table(this.shifts) */
        })
    })


    this.registerForm = this.createRegisterForm();
  }

  //geoloc
  async requestPermissions() {
    const permResult = await Geolocation.requestPermissions();
    console.log('Perm request result: ', permResult);
  }

  getCurrentCoordinate() {
    if (!Capacitor.isPluginAvailable('Geolocation')) {
      console.log('Plugin geolocation not available');
      return;
    }
    Geolocation.getCurrentPosition().then(data => {
      this.coordinate = {
        latitude: data.coords.latitude,
        longitude: data.coords.longitude,
        accuracy: data.coords.accuracy
      };
    }).catch(err => {
      console.error(err);
    });
  }

  watchPosition() {
    try {
      this.watchId = Geolocation.watchPosition({}, (position, err) => {
        console.log('Watch', position);
        this.zone.run(() => {
          this.watchCoordinate = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
        });
      });
    } catch (e) {
      console.error(e);
    }
  }

  clearWatch() {
    if (this.watchId != null) {
      Geolocation.clearWatch({ id: this.watchId });
    }
  }
//fin geolocalizacion

  createRegisterForm() {
    return this.formBuilder.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      shiftId: [this.guard.shiftId, Validators.required],
      location: new FormControl('', Validators.required),
    })
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      color: 'danger',
      duration: 2000
    });
    toast.present();
  }


  register() {
    this.api.register(this.registerForm.value).toPromise().then(() => {
      this.router.navigate(['tabs/tab1'])
    }).catch(error => {
      /* console.log(error.error.message) */
      let text: string
      switch (error.error.message) {
        case 'shift has been finished or unauthorized':
          text = 'Este turno ya a terminado o no esta autorizado'
          break
        default:
          text = 'Ha ocurrido un error, intente nuevamente'
      }
      this.presentToast(text)
    })
  }

  ngOninit() {
    /* new Promise((resolve, reject) => {
      this.guard = this.auth.guardData()
      console.table(this.guard)
      resolve()
    }).then(() => {
      this.shifts$ = this.api.getGuardShift(this.guard.id)
      this.api.getGuardShift(this.guard.id).toPromise()
        .then((data: any) => {
          this.shifts = data.shifts;
          console.table(this.shifts)
        })
    }) */

    /* this.registerForm = this.createRegisterForm() */

    /* this.registerForm = this.formBuilder.group({
      incident: new FormControl('', Validators.required),
      other: new FormControl('', Validators.required)
    }); */

  }
}
