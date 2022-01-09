import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Visitor } from 'src/app/models/visitor.interface';
import { Observable } from 'rxjs';
import { Shift } from 'src/app/models/shift.interface';
import { Guard } from 'src/app/models/guard.interface';
import { ApiService } from 'src/app/providers/api.service';
import { AuthService } from 'src/app/providers/auth.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-out',
  templateUrl: './out.page.html',
  styleUrls: ['./out.page.scss'],
})
export class OutPage implements OnInit {
  visitas: Visitor[]
  visitas$: Observable<Visitor[]>
  shifts: Shift[]
  shifts$: Observable<Shift[]>
  guard: Guard
  variableOut
  constructor(
    private modalController: ModalController,
    private api: ApiService,
    private auth: AuthService,
    public toastController: ToastController,
  ) { 
    new Promise((resolve, reject) => {
      this.guard = this.auth.guardData()
      resolve()
    }).then(() => {
      this.shifts$ = this.api.getGuardShift(this.guard.id)
      this.api.getGuardShift(this.guard.id).toPromise()
        .then((data: any) => {
          this.shifts = data.shifts;
        })
    })
    this.visitas$ = this.api.getVisitors(this.guard.shiftId)
    this.api.getVisitors(this.guard.shiftId).toPromise()
      .then((data: any) => {
        this.visitas = data.visits;
       /*  console.table(data.visits) */
        
      })
  }

  ngOnInit(  ) {
  }
  async closeModal() {
    await this.modalController.dismiss();
  }


  outVisit(){
    /* var split1 = this.variableOut.split('T')[0] */
    var corteFecha = this.variableOut.split('T')[1]
    var corteExtra = corteFecha.split('.')[0]
    /* var horaMinutoSegundo = JSON.stringify(corteExtra) */
    var hora = corteExtra.split(':')[0]
    var minuto = corteExtra.split(':')[1]
    var horaMinuto = hora+ ':' + minuto
    /* console.table(this.variableOut) */
   /*  console.table(split1) */
   /*  console.table(corteFecha)
    console.table(horaMinutoSegundo)
    console.table(horaMinuto) */
    this.api.outVisit(this.guard.shiftId, this.guard.visitId, horaMinuto).toPromise()
    /* this.api.outVisit(this.guard.shiftId, this.guard.visitId, JSON.stringify(split3)).toPromise() */
    .then((data: any) => {
    }).catch(error => {
      this.presentToast('Error al guardar hora de salida de visitante')
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
}
