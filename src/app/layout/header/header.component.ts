import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Injector,
  ChangeDetectorRef,
  ViewChild,
  ViewChildren,
  Output,
  ElementRef,
  EventEmitter,
  QueryList
} from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { LayoutService } from '@shared/services/layout.service';

import {
  UserServiceProxy,
  ChangeUserLanguageDto
} from '@shared/service-proxies/service-proxies';
import { ConfigService } from '@shared/services/config.service';
import { filter as _filter } from 'lodash-es';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AppAuthService } from '@shared/auth/app-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent extends AppComponentBase
  implements OnInit {
  // selectedLanguageFlag = "../../assets/img/flags/us.png";
  logoUrl = '../../assets/img/logo.png';
  languages: abp.localization.ILanguageInfo[];
  currentLanguage: abp.localization.ILanguageInfo;
  currentLanguageIcon: string;
  public config: any = {};
  transparentBGClass = "";
  menuPosition = 'Side';
  toggleClass = "ft-maximize";
  hideSidebar: boolean = true;
  isSmallScreen = false;
  protected innerWidth: any;
  configSub: Subscription;
  layoutSub: Subscription;
  control = new FormControl();
  searchOpenClass = "";
  shownLoginName = '';


  @ViewChild('search') searchElement: ElementRef;
  @ViewChildren('searchResults') searchResults: QueryList<any>;

  @Output()
  toggleHideSidebar = new EventEmitter<Object>();

  @Output()
  seachTextEmpty = new EventEmitter<boolean>();

  constructor(injector: Injector,
    private layoutService: LayoutService,
     private configService: ConfigService,
      private _userService: UserServiceProxy,
      private _authService: AppAuthService,
      private router: Router,
      private cdr: ChangeDetectorRef) {
    super(injector);
    this.config = this.configService.templateConf;
    this.innerWidth = window.innerWidth;
    this.layoutSub = layoutService.toggleSidebar$.subscribe(
      isShow => {
        this.hideSidebar = !isShow;
      });
  }

  ngOnInit() {
    this.shownLoginName = this.appSession.getShownLoginName();
    this.languages = _filter(
      this.localization.languages,
      (l) => !l.isDisabled
    );
    this.currentLanguage = this.localization.currentLanguage;
    if(this.currentLanguage.name =="ar-EG")
    this.currentLanguageIcon = "../../assets/img/flags/eg.png";
    else
    this.currentLanguageIcon ="../../assets/img/flags/us.png"
    if (this.innerWidth < 1200) {
      this.isSmallScreen = true;
    }
    else {
      this.isSmallScreen = false;
    }
  }
  ngAfterViewInit() {

    this.configSub = this.configService.templateConf$.subscribe((templateConf) => {
      if (templateConf) {
        this.config = templateConf;
      }
      this.loadLayout();
      this.cdr.markForCheck();

    })
  }
  loadLayout() {

    if (this.config.layout.menuPosition && this.config.layout.menuPosition.toString().trim() != "") {
      this.menuPosition = this.config.layout.menuPosition;
    }

    if (this.config.layout.variant === "Light") {
      this.logoUrl = 'assets/img/logo-dark.png';
    }
    else {
      this.logoUrl = 'assets/img/logo.png';
    }

    if (this.config.layout.variant === "Transparent") {
      this.transparentBGClass = this.config.layout.sidebar.backgroundColor;
    }
    else {
      this.transparentBGClass = "";
    }

  }
  onEnter() {
    if (this.searchResults && this.searchResults.length > 0) {
      let url = this.searchResults.first.url;
      if (url && url != '') {
        this.control.setValue("");
        this.searchOpenClass = '';
        this.router.navigate([url]);
        this.seachTextEmpty.emit(true);
      }
    }
  }
  changeLanguage(languageName: string): void {
    const input = new ChangeUserLanguageDto();
    input.languageName = languageName;
    this._userService.changeLanguage(input).subscribe(() => {
      abp.utils.setCookieValue(
        'Abp.Localization.CultureName',
        languageName,
        new Date(new Date().getTime() + 5 * 365 * 86400000), // 5 year
        abp.appPath
      );

      window.location.reload();
    });
  }
  onSearchKey(event: any) {
    if (this.searchResults && this.searchResults.length > 0) {
      this.searchResults.first.host.nativeElement.classList.add('first-active-item');
    }

    if (event.target.value === "") {
      this.seachTextEmpty.emit(true);
    }
    else {
      this.seachTextEmpty.emit(false);
    }
  }


  onEscEvent() {
    this.control.setValue("");
    this.searchOpenClass = '';
    this.seachTextEmpty.emit(true);
  }

  ToggleClass() {
    if (this.toggleClass === "ft-maximize") {
      this.toggleClass = "ft-minimize";
    } else {
      this.toggleClass = "ft-maximize";
    }
  }
  toggleSearchOpenClass(display) {
    this.control.setValue("");
    if (display) {
      this.searchOpenClass = 'open';
      setTimeout(() => {
        this.searchElement.nativeElement.focus();
      }, 0);
    }
    else {
      this.searchOpenClass = '';
    }
    this.seachTextEmpty.emit(true);
  }
  logout(): void {
    this._authService.logout();
  }
  toggleNotificationSidebar() {
    this.layoutService.toggleNotificationSidebar(true);
  }
  toggleSidebar() {
    this.layoutService.toggleSidebarSmallScreen(this.hideSidebar);
  }
}
