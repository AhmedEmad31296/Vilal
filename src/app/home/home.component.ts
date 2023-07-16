import { ChangeDetectorRef, Component, Injector, OnInit } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  BuildingServiceProxy,
  BuildingStatisticDto,
  ContactUSServiceProxy,
  ContactUSStatisticDto,
} from "@shared/service-proxies/service-proxies";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent extends AppComponentBase implements OnInit {
  contactUsStatistic = new ContactUSStatisticDto();
  buildingStatistic = new BuildingStatisticDto();
  constructor(
    injector: Injector,
    private _buildingService: BuildingServiceProxy,
    private _contactUsService: ContactUSServiceProxy,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.getContactUSStatistic();
    this.getBuildingStatistic();
  }

  getBuildingStatistic() {
    this._buildingService.getStatistics().subscribe((result) => {
      this.buildingStatistic = result;
      this.changeDetectorRef.detectChanges();
    });
  }
  getContactUSStatistic() {
    this._contactUsService.getStatistics().subscribe((result) => {
      this.contactUsStatistic = result;
      this.changeDetectorRef.detectChanges();
    });
  }
}
