import {
  Component,
  Injector,
  OnInit,
  QueryList,
  ViewChildren,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from "@angular/core";
import {
  BuildingServiceProxy,
  FileParameter,
  VilalBuildingDto,
  VilalBuildingPagedDto,
} from "@shared/service-proxies/service-proxies";
import {
  NgbdSortableHeaderDirective,
  SortDirection,
  SortEvent,
} from "@shared/datatable/sortable.directive";
import { AppComponentBase } from "@shared/app-component-base";
import { ToastrService } from "ngx-toastr";
import {
  ModalDismissReasons,
  NgbModal,
  NgbModalOptions,
} from "@ng-bootstrap/ng-bootstrap";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-Service",
  templateUrl: "./services.component.html",
  styleUrls: ["../../assets/css/uploader.css"],
})
export class ServicesComponent extends AppComponentBase implements OnInit {
  @ViewChild("imageInput") imageInput: ElementRef<HTMLInputElement>;
  @ViewChild("iconInput") iconInput: ElementRef<HTMLInputElement>;
  data: VilalBuildingPagedDto[];
  building: VilalBuildingDto = new VilalBuildingDto();
  totalItems: number;
  totalPages: number;
  currentPage: number = 1;
  pageSize: number = 10;
  sortColumn: string = "";
  sortDirection: SortDirection = "desc";
  search: string = "";
  loading: boolean;
  saving = false;
  isImageReady = false;
  selectedImageName: string | null = null;
  isIconReady = false;
  selectedIconName: string | null = null;

  @ViewChildren(NgbdSortableHeaderDirective)
  headers: QueryList<NgbdSortableHeaderDirective>;

  constructor(
    injector: Injector,
    private modalService: NgbModal,
    private _buildingService: BuildingServiceProxy,
    private changeDetectorRef: ChangeDetectorRef,
    private toastr: ToastrService
  ) {
    super(injector);
    this.building.isActive = true;
    this.building.isHome = true;
  }

  ngOnInit(): void {
    this.loadData();
  }
  openModal(content: any, id: number) {
    if (id == 0) {
    } else {
      this.get(id);
    }
    const modalOptions: NgbModalOptions = {
      size: "lg", // Set the size property to 'lg' for a larger modal
    };
    this.modalService.open(content, modalOptions).result.then(
      (result) => {
        //this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.loadData();
        //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  // This function is used in open
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  loadData(): void {
    this._buildingService
      .getPaged(
        this.search,
        this.sortColumn,
        this.sortDirection,
        this.pageSize,
        this.currentPage
      )
      .subscribe((data) => {
        this.data = data.data;
        this.totalItems = data.totalCount;
        this.totalPages = data.totalPages;
        this.loading = false;
        this.changeDetectorRef.detectChanges();
      });
  }
  onSubmit(form: NgForm): void {
    if (form.valid) {
      if (this.building.id) {
        // Existing building, perform update operation
        this.update();
      } else {
        // New building, perform insert operation
        this.insert();
      }
    }
  }

  insert() {
    this.saving = true;
    this._buildingService
      .insert(
        this.building.titleAr,
        this.building.titleEn,
        this.building.descriptionAr,
        this.building.descriptionEn,
        this.selectedImage,
        this.selectedIcon,
        this.building.isHome,
        this.building.isActive
      )
      .subscribe(
        (res) => {
          this.saving = false;
          this.toastr.success(res);
          this.modalService.dismissAll();
          this.loadData();
          // Reset form fields and selected image/icon
          this.building = new VilalBuildingDto();
          this.selectedImage = null;
          this.selectedImageName = null;
          this.isImageReady = false;
          this.selectedIcon = null;
          this.selectedIconName = null;
          this.isIconReady = false;
        },
        (error) => {
          this.toastr.error(error);
          this.saving = false;
        }
      );
  }
  update() {
    this.saving = true;
    if (this.isImageReady) this.uploadImage(this.building.id);
    if (this.isIconReady) this.uploadIcon(this.building.id);
    this._buildingService.update(this.building).subscribe(
      (res) => {
        this.saving = false;
        this.toastr.success(res);
        this.modalService.dismissAll();
        this.loadData();
      },
      (error) => {
        this.saving = false;
      }
    );
  }
  get(id: number): void {
    this._buildingService.get(id).subscribe((data) => {
      this.building = data;
    });
  }
  deleteItem(id: number) {
    if (confirm(this.l("AreYouSureDelete"))) {
      this._buildingService.delete(id).subscribe(
        (res) => {
          this.loadData();
          this.toastr.success(res);
        },
        (error) => {
          this.toastr.error(error);
        }
      );
    }
  }
  deleteImage(id: number) {
    if (confirm(this.l("AreYouSureDelete"))) {
      this._buildingService.deleteImage(id).subscribe(
        (res) => {
          this.get(id);
          this.toastr.success(res);
        },
        (error) => {}
      );
    }
  }
  deleteIcon(id: number) {
    if (confirm(this.l("AreYouSureDelete"))) {
      this._buildingService.deleteIcon(id).subscribe(
        (res) => {
          this.get(id);
          this.toastr.success(res);
        },
        (error) => {}
      );
    }
  }
  uploadImage(id: number) {
    this.saving = true;
    this._buildingService.uploadImage(this.selectedImage, id).subscribe(
      (res) => {
        this.get(id);
        this.saving = false;
        this.isImageReady = false;
        this.toastr.success(res);
      },
      (error) => {
        this.saving = false;
        this.toastr.error("Image upload failed.");
      }
    );
  }
  uploadIcon(id: number) {
    this.saving = true;
    this._buildingService.uploadIcon(this.selectedIcon, id).subscribe(
      (res) => {
        this.get(id);
        this.saving = false;
        this.isIconReady = false;
        this.toastr.success(res);
      },
      (error) => {
        this.saving = false;
        this.toastr.error("Icon upload failed.");
      }
    );
  }
  selectedImage: FileParameter | null = null;
  onImageSelect(files: FileList): void {
    const file = files.item(0);
    if (file) {
      this.selectedImage = {
        data: file,
        fileName: file.name,
      };
      this.selectedImageName = file.name;
      this.isImageReady = true;
    } else {
      this.removeImage();
    }
  }

  removeImage(): void {
    this.selectedImage = null;
    this.selectedImageName = null;
    this.isImageReady = false;
    // Clear the file input value
    if (this.imageInput && this.imageInput.nativeElement) {
      this.imageInput.nativeElement.value = "";
    }
  }

  selectedIcon: FileParameter | null = null;
  onIconSelect(files: FileList): void {
    const file = files.item(0);
    if (file) {
      this.selectedIcon = {
        data: file,
        fileName: file.name,
      };
      this.selectedIconName = file.name;
      this.isIconReady = true;
    } else {
      this.removeImage();
    }
  }

  removeIcon(): void {
    this.selectedIcon = null;
    this.selectedIconName = null;
    this.isIconReady = false;
    // Clear the file input value
    if (this.iconInput && this.iconInput.nativeElement) {
      this.iconInput.nativeElement.value = "";
    }
  }
  sort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
    } else {
      this.sortColumn = column;
      this.sortDirection = "asc";
    }
    this.loadData();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadData();
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.loadData();
  }

  searchTable(): void {
    this.currentPage = 1;
    this.loading = true;
    this.loadData();
  }

  onSort({ column, direction }: SortEvent): void {
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = "";
      }
    });

    this.sortColumn = column;
    this.sortDirection = direction;
    this.loadData();
  }
}
