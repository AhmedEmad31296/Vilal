import { Component, Injector, ChangeDetectionStrategy } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { AboutServiceProxy, AboutVilalDto } from '@shared/service-proxies/service-proxies';

@Component({
  templateUrl: "./about.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent extends AppComponentBase {
  about = new AboutVilalDto();
  constructor(injector: Injector, private _aboutService: AboutServiceProxy) {
    super(injector);
  }

  get() {
    this._aboutService.get().subscribe((result) => {
      this.about = result;
    });
  }
  update(){

    
  }
}
