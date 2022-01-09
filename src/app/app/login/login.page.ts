import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup

  constructor(
    private auth: AuthService,
    public formBuilder: FormBuilder,

  ) { }

  ngOnInit() {
    this.loginForm = this.createLoginForm()
  }

  login() {
    this.auth.login(this.loginForm.value)
  }
  createLoginForm() {
    return this.formBuilder.group({
      rut: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

}
