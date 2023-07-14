import { Component, Injector, OnInit, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AppComponentBase } from "@shared/app-component-base";
import { ToastrService } from "ngx-toastr";

import {
  ChangePasswordDto,
  GetSocialMediaFullInfo,
  SocialMediaServiceProxy,
  UpdateSocialMediaInput,
  UserDto,
  UserLoginInfoDto,
  UserServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-account-settings",
  templateUrl: "./account-settings.component.html",
  styleUrls: [
    "./account-settings.component.scss",
    "../../assets/sass/libs/select.scss",
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AccountSettingsComponent
  extends AppComponentBase
  implements OnInit
{
  activeTab = "general";
  generalFormSubmitted = false;
  changePasswordFormSubmitted = false;
  infoFormSubmitted = false;
  alertVisible = true;
  user = new UserLoginInfoDto();
  socialMedia = new GetSocialMediaFullInfo();
  updatedUser = new UserDto();
  changedPassword = new ChangePasswordDto();
  updatedSocialLink = new UpdateSocialMediaInput();
  id: number;
  saving = false;

  generalForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required]),
    surname: new FormControl("", [Validators.required]),
    email: new FormControl("", [
      Validators.required,
      Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
    ]),
  });

  changePasswordForm = new FormGroup({
    currentPassword: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
    ]),
    newPassword: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmNewPassword: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  socialForm = new FormGroup({
    whatsApp: new FormControl(""),
    twitter: new FormControl(""),
    facebook: new FormControl(""),
    googlePlus: new FormControl(""),
    linkedin: new FormControl(""),
    instagram: new FormControl(""),
    fax: new FormControl(""),
  });

  constructor(
    injector: Injector,
    public toastr: ToastrService,
    private _userService: UserServiceProxy,
    private _socialMediaService: SocialMediaServiceProxy
  ) {
    super(injector);
  }

  ngOnInit() {
    this.getUserInfo();
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  get gf() {
    return this.generalForm.controls;
  }

  get cpf() {
    return this.changePasswordForm.controls;
  }

  getUserInfo() {
    this.user = this.appSession.user;
    this.generalForm.setValue({
      username: this.user.userName,
      name: this.user.name,
      surname: this.user.surname,
      email: this.user.emailAddress,
    });
  }

  getSocialLinks() {
    this._socialMediaService.getLinks().subscribe((result) => {
      this.socialMedia = result;
      this.socialForm.setValue({
        whatsApp: this.socialMedia.phoneNumber,
        twitter: this.socialMedia.twitter,
        facebook: this.socialMedia.facebook,
        googlePlus: this.socialMedia.email,
        linkedin: this.socialMedia.linkedin,
        instagram: this.socialMedia.instagram,
        fax: this.socialMedia.fax,
      });
    });
  }

  onGeneralFormSubmit() {
    this.generalFormSubmitted = true;
    if (this.generalForm.invalid) {
      return;
    } else {
      this.updateUserInfo();
    }
  }

  onChangePasswordFormSubmit() {
    this.changePasswordFormSubmitted = true;
    if (this.changePasswordForm.invalid) {
      return;
    } else {
      this.changePassword();
    }
  }

  onSocialFormSubmit() {
    if (this.socialForm.invalid) {
      return;
    } else {
      this.updateSocialLinks();
    }
  }

  updateUserInfo() {
    this.saving = true;
    this.updatedUser.id = this.appSession.user.id;
    this.updatedUser.name = this.generalForm.value.name;
    this.updatedUser.surname = this.generalForm.value.surname;
    this.updatedUser.userName = this.generalForm.value.username;
    this.updatedUser.emailAddress = this.generalForm.value.email;
    this.updatedUser.isActive = true;
    this._userService.update(this.updatedUser).subscribe(
      (res) => {
        this.getUserInfo();
      },
      () => {
        this.saving = false;
      }
    );
  }

  changePassword() {
    this.saving = true;
    this.changedPassword.currentPassword =
      this.changePasswordForm.value.currentPassword;
    this.changedPassword.newPassword =
      this.changePasswordForm.value.newPassword;
    this._userService
      .changePassword(this.changedPassword)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((success) => {
        if (success) {
          this.toastr.success();
        }
      });
  }

  updateSocialLinks() {
    this.saving = true;
    this.updatedSocialLink.phoneNumber = this.socialForm.value.whatsApp;
    this.updatedSocialLink.twitter = this.socialForm.value.twitter;
    this.updatedSocialLink.facebook = this.socialForm.value.facebook;
    this.updatedSocialLink.email = this.socialForm.value.googlePlus;
    this.updatedSocialLink.instagram = this.socialForm.value.instagram;
    this.updatedSocialLink.linkedin = this.socialForm.value.linkedin;
    this.updatedSocialLink.fax = this.socialForm.value.fax;
    this._socialMediaService.update(this.updatedSocialLink).subscribe(
      (res) => {
        this.getSocialLinks();
          this.toastr.success(res);
      },
      () => {
        this.saving = false;
      }
    );
  }
}
