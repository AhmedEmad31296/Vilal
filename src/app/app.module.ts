import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { WINDOW_PROVIDERS } from '@shared/services/window.service';
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";

import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from '@app/home/home.component';
import { AboutComponent } from '@app/about/about.component';
// layout
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { VerticalMenuComponent } from './layout/vertical-menu/vertical-menu.component';
import { HorizontalMenuComponent } from './layout/horizontal-menu/horizontal-menu.component'
import { CustomizerComponent } from './layout/customizer/customizer.component';
import { AutocompleteDirective } from '@shared/autocomplete/autocomplete.directive';
import { NotificationSidebarComponent } from './layout/notification-sidebar/notification-sidebar.component'
// users
import { UsersComponent } from '@app/users/users.component';
import { CreateUserDialogComponent } from '@app/users/create-user/create-user-dialog.component';
import { EditUserDialogComponent } from '@app/users/edit-user/edit-user-dialog.component';
import { ResetPasswordDialogComponent } from './users/reset-password/reset-password.component';
import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';
import { ServicesComponent } from './services/services.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    AccountSettingsComponent,
    // users
    UsersComponent,
    CreateUserDialogComponent,
    EditUserDialogComponent,
    ResetPasswordDialogComponent,
    // layout
    HeaderComponent,
    FooterComponent,
    VerticalMenuComponent,
    HorizontalMenuComponent,
    CustomizerComponent,
    AutocompleteDirective,
    NotificationSidebarComponent,
    ServicesComponent,
    ContactUsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ModalModule.forChild(),
    BsDropdownModule,
    CollapseModule,
    TabsModule,
    AppRoutingModule,
    ServiceProxyModule,
    SharedModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    PerfectScrollbarModule,
    NgbPaginationModule,
  ],
  providers: [
    WINDOW_PROVIDERS,
    DecimalPipe,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    BsDropdownConfig,
  ],
  entryComponents: [
    // users
    CreateUserDialogComponent,
    EditUserDialogComponent,
    ResetPasswordDialogComponent,
  ],
})
export class AppModule {}
