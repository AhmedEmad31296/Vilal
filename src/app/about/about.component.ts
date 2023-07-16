import {
  Component,
  Injector,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  AboutServiceProxy,
  AboutVilalDto,
  FileParameter,
  UpdateAboutVilalInput,
} from "@shared/service-proxies/service-proxies";
import { ToastrService } from "ngx-toastr";

@Component({
  templateUrl: "./about.component.html",
  styleUrls: ["../../assets/css/uploader.css"],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent extends AppComponentBase implements OnInit {
  @ViewChild("imageInput") imageInput: ElementRef<HTMLInputElement>;
  about = new AboutVilalDto();
  updatedAbout = new UpdateAboutVilalInput();
  saving = false;
  isFileReady = false;
  selectedFileName: string | null = null;

  constructor(
    injector: Injector,
    private _aboutService: AboutServiceProxy,
    private toastr: ToastrService
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.get();
  }

  get() {
    this._aboutService.get().subscribe((result) => {
      this.about = result;
    });
  }
  update() {
    this.saving = true;
    Object.assign(this.updatedAbout, {
      titleAr: this.about.titleAr,
      titleEn: this.about.titleEn,
      descriptionAr: this.about.descriptionAr,
      descriptionEn: this.about.descriptionEn,
      isHome: this.about.isHome,
      isActive: this.about.isActive,
    });
    this._aboutService.update(this.updatedAbout).subscribe(
      (res) => {
        this.get();
        this.toastr.success(res);
        this.saving = false;
      },
      (error) => {
        this.saving = false;
      }
    );
  }

  upload() {
    this.saving = true;
    this._aboutService.uploadImage(this.selectedFile).subscribe(
      (res) => {
        this.remove();
        this.toastr.success(res);
        this.saving = false;
        this.get();
      },
      (error) => {
        this.saving = false;
        this.toastr.error("Image upload failed.");
      }
    );
  }
  selectedFile: FileParameter | null = null;

  onFileSelect(files: FileList): void {
    const file = files.item(0);
    if (file) {
      this.selectedFile = {
        data: file,
        fileName: file.name,
      };
      this.selectedFileName = file.name;
      this.isFileReady = true;
    } else {
      this.remove();
    }
  }

  remove(): void {
    this.selectedFile = null;
    this.selectedFileName = null;
    this.isFileReady = false;
    // Clear the file input value
    if (this.imageInput && this.imageInput.nativeElement) {
      this.imageInput.nativeElement.value = "";
    }
  }
}
