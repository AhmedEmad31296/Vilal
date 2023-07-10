import { Component, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { AppAuthService } from '@shared/auth/app-auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends AppComponentBase {
  loginFormSubmitted = false;
  isLoginFailed = false;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(true)
  });
  constructor(
    private spinner: NgxSpinnerService,
    public authService: AppAuthService,
    private router: Router,
    injector: Injector,
  ) {
    super(injector);
  }
  get lf() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.loginFormSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
      this.login()

    }
    login(): void {
      this.authService.authenticateModel.userNameOrEmailAddress = this.loginForm.value.username;
      this.authService.authenticateModel.password = this.loginForm.value.password;
      this.authService.authenticate(() => (
        this.spinner.hide()
      ));
      setTimeout(() => {
        if (!this.loginFormSubmitted) {
            this.isLoginFailed = true;
            this.spinner.hide();

        }
    }, 500);

    }
}
