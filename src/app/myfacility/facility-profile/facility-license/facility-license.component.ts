import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { MyFacilityService } from "../../services/myfacility.service";
import { ActivatedRoute } from "@angular/router";
import { DatePipe } from "@angular/common";
import { ModalService } from "../../../shared/modal/modal.service";
import { HttpoptionsService } from "../../../shared/httpoptions.service";
import { ApplicationService } from "../../../myapplication/myapplication.service";
import { GridApi } from "ag-grid";
import { FacilityLicenseModalComponent } from "./facility-license-modal/facility-license-modal.component";
import { environment } from "src/environments/environment";
import { Subscription } from "rxjs";

@Component({
  selector: "app-facility-license",
  templateUrl: "./facility-license.component.html",
  styleUrls: ["./facility-license.component.scss"],
  providers: [DatePipe]
})
export class FacilityLicenseComponent implements OnInit, OnDestroy {
  rowData = [];
  dataLoaded = false;
  columnDefs = [];
  selectedRow = [];
  licenseFile = [];
  displayText = "";
  @ViewChild("file") file:any; 
  subscription: Subscription;
  templateURl =
    environment.S3_BUCKET_BASE_URL + "Facility_Licenses_Upload_Template.csv";
  instructionsURL =
    environment.S3_BUCKET_BASE_URL +
    "Facility_Licenses_Upload_Instructions.pdf";
  facilityLicenseGridApi: GridApi;
  constructor(
    private modalService: ModalService,
    public myFacilityService: MyFacilityService,
    private httpOptionsService: HttpoptionsService,
    private myApplicationService: ApplicationService,
    private activatedRoute: ActivatedRoute,
    private datepipe: DatePipe
  ) {}

  ngOnInit() {
    let a = this;
    this.columnDefs = [
      {
        headerName: "Select",
        width: 100,
        checkboxSelection: true
      },
      {
        headerName: "State/Agency",
        field: "licensingAgencyStateCodeOrAgencyName",
        width: 225
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
        valueFormatter: function(param) {
          return param.data.licenseValidTo == null
            ? ""
            : a.datepipe.transform(param.data.licenseValidTo, "MM/dd/yyyy");
        },
        width: 150
      },
      {
        headerName: "Status",
        field: "licenseStatusTypeDescription",
        width: 175
      },
      {
        headerName: "PIC e-Profile ID",
        field: "picEprofileID",
        width: 125
      }
    ];
    this.myFacilityService.setToolBarHeader("Facility Licenses");
    this.subscription = this.activatedRoute.queryParams.subscribe(
      queryParams => {
        this.showfacilityLicense();
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onFacilityLicenseGridReady(event) {
    this.facilityLicenseGridApi = event.api;
  }

  onFilesAdded() {
    this.licenseFile = this.file.nativeElement.files;
    this.displayText = this.licenseFile[0].name;
  }

  addFiles() {
    if (this.selectedRow.length != 0) {
      this.facilityLicenseGridApi.deselectAll();
    }
    this.file.nativeElement.click();
  }

  selectedEvent(event) {
    this.selectedRow = event;
  }

  addFacilityLicense() {
    if (this.selectedRow.length != 0) {
      this.facilityLicenseGridApi.deselectAll();
    }
    let addFacilityLicensedialogRef = this.modalService.open(
      FacilityLicenseModalComponent,
      {
        data: null,
        width: "1000px"
      }
    );
    addFacilityLicensedialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.saveFaciltyLicense(result);
      }
    });
  }
  saveFaciltyLicense(result: any) {
    this.myFacilityService.addFacilityLicenceData(result).subscribe(
      response => {
        this.modalService.confirm(
          "Facility licence details saved successfully.",
          "Success!!",
          () => {
            this.showfacilityLicense();
          }
        );
      },
      error => {
        this.httpOptionsService.handleError(error);
      }
    );
  }
  editFacilityLicense() {
    if (this.selectedRow[0].isEditable == false) {
      alert("You can't edit this License");
      this.selectedRow = [];
    } else {
      let editFacilityLicensedialogRef = this.modalService.open(
        FacilityLicenseModalComponent,
        {
          data: this.selectedRow[0],
          width: "1000px"
        }
      );
      editFacilityLicensedialogRef.afterClosed().subscribe(result => {
        if (result != undefined) {
          let licenseId = this.selectedRow[0].licenseID;
          this.updateFacilityLicense(licenseId, result);
        } else {
          this.facilityLicenseGridApi.deselectAll();
        }
      });
    }
  }
  updateFacilityLicense(licenseId: number, result: any) {
    this.myFacilityService
      .updateFacilityLicenseData(licenseId, result)
      .subscribe(
        (data: any) => {
          this.modalService.confirm(
            "Facility licence details updated successfully.",
            "Success!!",
            () => {
              this.showfacilityLicense();
            }
          );
        },
        error => {
          this.httpOptionsService.handleError(error);
        }
      );
  }
  deleteFacilityLicense() {
    this.myFacilityService
      .deleteLicenseData(this.selectedRow[0].licenseID)
      .subscribe(
        response => {
          this.modalService.confirm(
            "Facility licence details deleted successfully.",
            "Success!!",
            () => {
            this.showfacilityLicense();
            }
          );
        },
        error => {
          this.httpOptionsService.handleError(error);
        }
      );
  }

  verifySubmitFile() {
    if (this.selectedRow.length != 0) {
      this.facilityLicenseGridApi.deselectAll();
    }
    let formData = new FormData();
    formData.append("file", this.licenseFile[0], this.licenseFile[0].name);
    this.myFacilityService.uploadFacilityLicenseFile(formData).subscribe(
      response => {
        this.modalService.confirm(
          "Facility licence details saved successfully.",
          "Success!!",
          () => {
            this.showfacilityLicense();
            this.displayText = "";
            this.file.nativeElement.value = "";
          }
        );
      },
      error => {
        this.displayText = "";
        this.file.nativeElement.value = "";
        this.httpOptionsService.handleError(error);
      }
    );
    this.licenseFile = [];
  }

  showfacilityLicense() {
    this.dataLoaded=false;  
    this.selectedRow=[]
    if (this.myFacilityService.OrganisationId == undefined) {
      setTimeout(() => {
        this.showfacilityLicense();
      }, 300);
    } else {
      this.rowData = [];
      this.myFacilityService.getFacilitylicense().subscribe(
        response => {
            this.rowData = response;
            this.dataLoaded = true;
            this.checkifValid();
        },
        error => {
          this.httpOptionsService.handleError(error);
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
