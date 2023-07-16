import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbdSortableHeaderDirective } from "./datatable/sortable.directive";
import { AutocompleteModule } from './autocomplete/autocomplete.module'
import { OverlayModule } from '@angular/cdk/overlay';
import { EqualValidator } from "./directives/equal-validator.directive";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { ToastrModule } from "ngx-toastr";

import { AppSessionService } from './session/app-session.service';
import { AppUrlService } from './nav/app-url.service';
import { AppAuthService } from './auth/app-auth.service';
import { AppRouteGuard } from './auth/auth-route-guard';
import { LocalizePipe } from '@shared/pipes/localize.pipe';

import { AutocompleteComponent} from '../shared/autocomplete/autocomplete.component'

import { LayoutStoreService } from './layout/layout-store.service';

//DIRECTIVES
import { ToggleFullscreenDirective } from "./directives/toggle-fullscreen.directive";
import { SidebarLinkDirective } from './directives/sidebar-link.directive';
import { SidebarDropdownDirective } from './directives/sidebar-dropdown.directive';
import { SidebarAnchorToggleDirective } from './directives/sidebar-anchor-toggle.directive';
import { SidebarDirective } from './directives/sidebar.directive';
import { TopMenuDirective } from './directives/topmenu.directive';
import { TopMenuLinkDirective } from './directives/topmenu-link.directive';
import { TopMenuDropdownDirective } from './directives/topmenu-dropdown.directive';
import { TopMenuAnchorToggleDirective } from './directives/topmenu-anchor-toggle.directive';
import { BusyDirective } from './directives/busy.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AutocompleteModule,
    NgxPaginationModule,
    OverlayModule,
    NgbModule,
    PerfectScrollbarModule,
    ToastrModule.forRoot(),
  ],
  declarations: [
    LocalizePipe,
    BusyDirective,
    ToggleFullscreenDirective,
    SidebarLinkDirective,
    SidebarDropdownDirective,
    SidebarAnchorToggleDirective,
    SidebarDirective,
    TopMenuLinkDirective,
    TopMenuDropdownDirective,
    TopMenuAnchorToggleDirective,
    TopMenuDirective,
    EqualValidator,
    NgbdSortableHeaderDirective,
  ],
  exports: [
    CommonModule,
    LocalizePipe,
    BusyDirective,
    EqualValidator,
    NgbModule,
    ToggleFullscreenDirective,
    SidebarDirective,
    NgbdSortableHeaderDirective,
    TopMenuDirective,
    ToggleFullscreenDirective,
    AutocompleteComponent,
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        AppSessionService,
        AppUrlService,
        AppAuthService,
        AppRouteGuard,
        LayoutStoreService,
      ],
    };
  }
}
