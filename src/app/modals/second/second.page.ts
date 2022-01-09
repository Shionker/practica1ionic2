import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Guard } from 'src/app/models/guard.interface';
import { AuthService } from 'src/app/providers/auth.service';
import { ApiService } from 'src/app/providers/api.service';
import { Shift } from 'src/app/models/shift.interface';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-second',
  templateUrl: './second.page.html',
  styleUrls: ['./second.page.scss'],
})
export class SecondPage implements OnInit {
  guard: Guard
  registerVisitorForm: FormGroup
  shifts$: Observable<Shift[]>
  shifts: Shift[]
  constructor(
    private modalController: ModalController,
    public formBuilder: FormBuilder,
    private auth: AuthService,
    private api: ApiService,
    public toastController: ToastController,
    private router: Router
  ) {
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

    this.registerVisitorForm = this.createRegisterVisitorForm();
  }

  ngOnInit() {
  }
  createRegisterVisitorForm() {
    return this.formBuilder.group({
      name: new FormControl('', Validators.required),
      rut: new FormControl('', Validators.required),
      patent: new FormControl('', Validators.required),
      shiftId: [this.guard.shiftId, Validators.required],
      in: new FormControl(JSON.stringify(''), Validators.required),
    })
  }

  registerVisitor() {
    this.api.registerVisitor(this.registerVisitorForm.value).toPromise().then(() => {
      console.log(this.registerVisitorForm.value)
      this.router.navigate(['tabs/tab2'])
    }).catch(error => { 
      this.presentToast('Error al guardar visitante') 
    })
  }
  
  async closeModal() {
    await this.modalController.dismiss();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      color: 'danger',
      duration: 2000
    });
    toast.present();
  }
}
