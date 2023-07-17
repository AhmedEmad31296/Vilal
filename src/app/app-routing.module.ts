import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { ServicesComponent } from "./services/services.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { ErrorPageComponent } from "./error/error-page.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: AppComponent,
        canActivate: [AppRouteGuard],
        children: [
          {
            path: "home",
            component: HomeComponent,
          },
          {
            path: "about",
            component: AboutComponent,
          },
          {
            path: "services",
            component: ServicesComponent,
          },
          {
            path: "contact-us",
            component: ContactUsComponent,
          },
          {
            path: "account-settings",
            component: AccountSettingsComponent,
          },
          {
            path: "",
            redirectTo: "/home",
            pathMatch: "full",
          },
        ],
      },
      {
        path: "**",
        component: ErrorPageComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
