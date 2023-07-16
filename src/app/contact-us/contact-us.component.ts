import {
  Component,
  Injector,
  OnInit,
  QueryList,
  ViewChildren,
  ChangeDetectionStrategy,
} from "@angular/core";
import {
  ContactUSServiceProxy,
  MessageFullInfoDto,
} from "@shared/service-proxies/service-proxies";
import {
  NgbdSortableHeaderDirective,
  SortDirection,
  SortEvent,
} from "@shared/datatable/sortable.directive";
import { AppComponentBase } from "@shared/app-component-base";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-contact-us",
  templateUrl: "./contact-us.component.html",
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactUsComponent extends AppComponentBase implements OnInit {
  data: MessageFullInfoDto[];
  totalItems: number;
  totalPages: number;
  currentPage: number = 1;
  pageSize: number = 10;
  sortColumn: string = "";
  sortDirection: SortDirection = "desc";
  search: string = "";
  loading: boolean;
  @ViewChildren(NgbdSortableHeaderDirective)
  headers: QueryList<NgbdSortableHeaderDirective>;
  closeResult: string;
  _message: string;
  constructor(
    injector: Injector,
    private modalService: NgbModal,
    private _contactUsService: ContactUSServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.loadData();
  }
  openModal(content: any, id: number) {
    this.getMessage(id);
    this.modalService.open(content).result.then(
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
    this._contactUsService
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
      });
  }
  getMessage(id: number): void {
    this._contactUsService.getMessage(id).subscribe((res) => {
      this._message = res;
    });
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
