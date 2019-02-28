import { Component, OnInit } from "@angular/core";
import { MyFacilityService } from "../../services/myfacility.service";
import { StaffLicenseModalComponent } from "./staff-license-modal/staff-license-modal.component";
import { ActivatedRoute } from "@angular/router";
import { DatePipe } from "@angular/common";
import { ModalService } from "../../../shared/modal/modal.service";
import { ApplicationService } from "../../../myapplication/myapplication.service";
import { GridApi } from "ag-grid";
import { HttpoptionsService } from "../../../shared/httpoptions.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-individual-license",
  templateUrl: "./staff-license.component.html",
  styleUrls: ["./staff-license.component.scss"],
  providers: [DatePipe]
})
export class StaffLicenseComponent implements OnInit {
  notFoundMsg = "Please Add Staff License Details";
  rowData = [];
  dataLoaded: boolean = false;
  columnDefs = [];
  selectedRow = [];
  individualGridApi: GridApi;
  subscription: Subscription;
  constructor(
    public myFacilityInfoService: MyFacilityService,
    private _datePipe: DatePipe,
    private modalService: ModalService,
    private myApplicationService: ApplicationService,
    private activatedRoute: ActivatedRoute,
    private httpOptionService: HttpoptionsService
  ) {
    let me = this;
    this.columnDefs = [
      {
        headerName: "Select",
        width: 75,
        checkboxSelection: true,
        pinned: "left"
      },
      {
        headerName: "Name",
        field: "fullName",
        width: 125,
        pinned: "left"
      },
      {
        headerName: "License Type",
        field: "licenseTypeDescription",
        width: 150
      },
      {
        headerName: "License Number",
        field: "licenseNumber",
        width: 150
      },
      {
        headerName: "Expiration Date",
        field: "licenseValidTo",
        width: 125,
        valueFormatter: function(param) {
          return param.data.licenseValidTo == null
            ? ""
            : me._datePipe.transform(param.data.licenseValidTo, "MM/dd/yyyy");
        }
      },
      {
        headerName: "Status",
        field: "licenseStatusTypeDescription",
        width: 150
      },
      {
        headerName: "E-Profile ID",
        field: "eProfileID",
        width: 125
      },
      {
        headerName: "State/Agency",
        field: "stateCodeOrAgencyName",
        width: 100
      }
    ];
  }

  ngOnInit() {
    this.myFacilityInfoService.setToolBarHeader("Staff Licenses");
    this.subscription = this.activatedRoute.queryParams.subscribe(
      queryParams => {
        this.showIndividualLicense();
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleEvent(event) {
    this.selectedRow = event;
  }

  onStaffGridReady(event) {
    this.individualGridApi = event.api;
  }

  searchAddIndividualLicense() {
    if (this.selectedRow.length != 0) {
      this.individualGridApi.deselectAll();
    }
    let searchAddIndividualLicensedialogRef = this.modalService.open(
      StaffLicenseModalComponent,
      {
        width: "1000px"
      }
    );
    searchAddIndividualLicensedialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.saveIndividualLicense(result[0]);
      }
    });
  }

  saveIndividualLicense(body) {
    this.myFacilityInfoService.saveIndividuallicense(body).subscribe(
      response => {
        this.modalService.confirm(
          "Staff licence details saved successfully",
          "Success",
          () => {
            this.showIndividualLicense();
          }
        );
      },
      error => {
        this.httpOptionService.handleError(error);
      }
    );
  }

  deleteIndividualLicense() {
    this.myFacilityInfoService
      .deleteIndividualLicence(this.selectedRow[0].id)
      .subscribe(
        (data: any) => {
          this.modalService.confirm(
            "Staff licence details deleted successfully",
            "Success",
            () => {
              this.showIndividualLicense();
            }
          );
        },
        error => {
          this.httpOptionService.handleError(error);
        }
      );
  }

  showIndividualLicense() {
    this.dataLoaded=false;
    this.rowData = [];
    this.selectedRow = [];
    if (this.myFacilityInfoService.OrganisationId == undefined) {
      setTimeout(() => {
        this.showIndividualLicense();
      }, 300);
    } else {
      this.myFacilityInfoService.getIndividuallicense().subscribe(
        data => {
          this.rowData = data;
          this.dataLoaded = true;
          this.checkifValid();
        },
        error => {
          this.httpOptionService.handleError(error);
        }
      );
    }
  }
  checkifValid() {
    if (this.rowData.length != 0) {
      this.myApplicationService.setEnableNextClick(true);
    } else {
      this.myApplicationService.setEnableNextClick(false);
    }
  }
}
