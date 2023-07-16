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

const routes: Routes = [
  {
    path: "",
    component: AppComponent,
    canActivate: [AppRouteGuard],
    children: [
      {
        path: "**",
        component: ErrorPageComponent,
      },
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
