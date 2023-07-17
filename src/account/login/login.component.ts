import { Component, Inject, Injector, OnDestroy } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { AppAuthService } from '@shared/auth/app-auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { DOCUMENT } from '@angular/common';
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends AppComponentBase implements OnDestroy {
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
    @Inject(DOCUMENT) private document: Document
  ) {
    super(injector);
    this.document.body.classList.add('auth-page');
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
    ngOnDestroy() {
      this.document.body.classList.add('auth-page');
    }

}
