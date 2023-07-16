import { Component, Injector, ChangeDetectionStrategy } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent extends AppComponentBase {
  currentYear: number;

  constructor(injector: Injector) {
    super(injector);
    this.currentYear = new Date().getFullYear();
  }
}
