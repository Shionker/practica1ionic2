import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Report } from '../models/report.interface';
import { ApiService } from '../providers/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../providers/auth.service';
import { Guard } from '../models/guard.interface';
import { Shift } from '../models/shift.interface';
import { Observable } from 'rxjs';
import { Visitor } from '../models/visitor.interface';
import { parseSelectorToR3Selector } from '@angular/compiler/src/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  registerForm: FormGroup
  report: Report
  guard: Guard
  shifts$: Observable<Shift[]>
  shifts: Shift[]
  shift: Shift
  visitas: Visitor[]
  visitas$: Observable<Visitor[]>
  constructor(
    public formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
    private auth: AuthService
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

    /* this.registerForm = this.createReportForm(); */
  }



  reportes(data: string) {
   
    switch (data) {
      case 'Ambulance':
        this.api.report({ type: data, clientId: this.guard.client, shiftId: this.guard.shiftId }).toPromise()
          .then((data:any)=>{
          /*   console.log(data) */
          })
        break;
      case 'Police':
        this.api.report({ type: data, clientId: this.guard.client, shiftId: this.guard.shiftId }).toPromise()
        .then((data:any)=>{
          /* console.log(data) */
        })
        break;
      case 'Firefighter':
        this.api.report({ type: data, clientId: this.guard.client, shiftId: this.guard.shiftId }).toPromise()
        .then((data:any)=>{
          /* console.log(data) */
        })
        break;
      case 'Office1':
        this.api.report({ type: data, clientId: this.guard.client, shiftId: this.guard.shiftId }).toPromise()
        .then((data:any)=>{
          /* console.log(data) */
        })
        break;
      case 'Office2':
        this.api.report({ type: data, clientId: this.guard.client, shiftId: this.guard.shiftId }).toPromise()
        .then((data:any)=>{
          /* console.log(data) */
        })
        break;

    }

  }


  /* createReportForm() {
    return this.formBuilder.group({
      type: new FormControl('', Validators.required),
      clientId: [this.guard.client, Validators.required],
      shiftId: [this.guard.shiftId, Validators.required]
    })
  } */

}
