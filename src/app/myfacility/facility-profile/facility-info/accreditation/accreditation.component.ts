import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MyFacilityService } from "../../../services/myfacility.service";
import { DatePipe } from "../../../../../../node_modules/@angular/common";
import { ModalService } from "src/app/shared/modal/modal.service";
import { AccreditationModalComponent } from "./accreditation-modal/accreditation-modal.component";
import { ActivatedRoute } from "@angular/router";
import { GridApi } from "ag-grid";
import { GridConfig } from "src/app/shared/dynamic-grid/grid-config";
import { HttpoptionsService } from "src/app/shared/httpoptions.service";
import { ApplicationService } from "src/app/myapplication/myapplication.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-accreditation",
  templateUrl: "./accreditation.component.html",
  styleUrls: ["./accreditation.component.scss"],
  providers: [DatePipe]
})
export class AccreditationComponent implements OnInit {
  accrediationRowData = [];
  accrediationActionData = [];
  columnDefs;
  dataFetched: boolean = false;
  accrMsg = "Accreditations";
  accrActionsMsg = "Accreditation Action";
  selectedAccreditation = [];
  subscription: Subscription;
  accreditationGridApi: GridApi;
  constructor(
    private myFacilityService: MyFacilityService,
    private _datePipe: DatePipe,
    private modalService: ModalService,
    private activatedRoute: ActivatedRoute,
    private httpOptionsService: HttpoptionsService,
    private myapplicationService: ApplicationService
  ) {}

  ngOnInit() {
    let a = this;
    this.columnDefs = [
      {
        headerName: "Select",
        width: 50,
        checkboxSelection: true
      },
      {
        headerName: "Business Name",
        field: "businessName",
        width: 200
      },
      {
        headerName: "Accreditation Agency",
        valueGetter: function(param) {
          if (param.data.agencyOtherTypeDescription != null) {
            return (
              param.data.agencyTypeDescription +
              "-" +
              param.data.agencyOtherTypeDescription
            );
          } else {
            return param.data.agencyTypeDescription;
          }
        },
        width: 220
      },
      {
        headerName: "Accreditation Type",
        valueGetter: function(param) {
          if (param.data.otherTypeDescription != null) {
            return (
              param.data.typeDescription + "-" + param.data.otherTypeDescription
            );
          } else {
            return param.data.typeDescription;
          }
        },
        width: 200
      },
      {
        headerName: "Accreditation Date",
        field: "date",
        width: 150,
        filter: "agDateColumnFilter",
        valueFormatter: function(param) {
          return param.data.date == null
            ? ""
            : a._datePipe.transform(param.data.date, "MM/dd/yyyy");
        }
      },
      {
        headerName: "Valid To",
        field: "validTo",
        width: 150,
        filter: "agDateColumnFilter",
        valueFormatter: function(param) {
          return param.data.validTo == null
            ? ""
            : a._datePipe.transform(param.data.validTo, "MM/dd/yyyy");
        }
      },
      {
        headerName: "Survey Date",
        field: "surveryDate",
        width: 150,
        filter: "agDateColumnFilter",
        valueFormatter: function(param) {
          return param.data.surveryDate == null
            ? ""
            : a._datePipe.transform(param.data.surveryDate, "MM/dd/yyyy");
        }
      }
    ];

    this.subscription = this.activatedRoute.queryParams.subscribe(
      queryParams => {
        this.showAccreditations();
      }
    );
  }
  onGridReady(event) {
    this.accreditationGridApi = event.api;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  closeAccreditationAction() {
    this.accrediationActionData = [];
    this.accreditationGridApi.deselectAll();
  }

  showAccreditations() {
    this.dataFetched = false;
    if (this.myFacilityService.OrganisationId == undefined) {
      setTimeout(() => {
        this.showAccreditations();
      }, 300);
    } else {
      this.accrediationRowData = [];
      this.myFacilityService.getAccreditations().subscribe(
        response => {
          this.accrediationRowData = response;
          this.dataFetched = true;
          this.checkifValid();
        },
        error => {
          this.httpOptionsService.handleError(error);
        }
      );
    }
  }

  showAccreditationAction() {
    if (this.selectedAccreditation[0].isAccreditationActionExits) {
      let accreditationId = this.selectedAccreditation[0].id;
      this.myFacilityService.getAcreditationActions(accreditationId).subscribe(
        response => {
          this.accrediationActionData = response[0];
        },
        error => {
          this.httpOptionsService.handleError(error);
        }
      );
    } else {
      alert("There is no Action Associated with this Accreditation");
    }
  }

  selectedRowEvent(data: any) {
    this.accrediationActionData = [];
    this.selectedAccreditation = data;
  }

  openAccreditationDetailsDialog() {
    if (this.selectedAccreditation.length != 0) {
      this.accreditationGridApi.deselectAll();
    }
    const accreditationDetailsDialogRef = this.modalService.open(
      AccreditationModalComponent,
      {
        width: "1000px",
        data: null
      }
    );

    accreditationDetailsDialogRef.afterClosed().subscribe(response => {
      if (response != undefined) {
        this.postAccreditationHistory(response);
      }
    });
  }

  openAccreditationActionsDialog() {
    if (!this.selectedAccreditation[0].isAccreditationActionExits) {
      const accreditationActionDetailsDialogRef = this.modalService.open(
        AccreditationModalComponent,
        {
          width: "1000px",
          data: 0
        }
      );

      accreditationActionDetailsDialogRef.afterClosed().subscribe(response => {
        if (response != undefined) {
          let accreditationId = this.selectedAccreditation[0].id;
          this.postAccreditationActions(response, accreditationId);
        }
        this.accreditationGridApi.deselectAll();
      });
    } else {
      alert("There is an Action Associated with this Accreditation");
    }
  }

  postAccreditationHistory(body: any) {
    this.myFacilityService.postAccreditationHistory(body).subscribe(
      response => {
        this.modalService.confirm(
          "Facility Accreditation History is Saved",
          "Success!!!",
          () => {
            this.showAccreditations();
          }
        );
      },
      error => {
        this.httpOptionsService.handleError(error);
      }
    );
  }

  postAccreditationActions(body: any, accreditationId: number) {
    this.myFacilityService
      .putAccreditationActions(body, accreditationId)
      .subscribe(
        response => {
          this.modalService.confirm(
            "Facility Accreditation Action is Saved",
            "Success!!!",
            () => {
              this.showAccreditations();
            }
          );
        },
        error => {
          this.httpOptionsService.handleError(error);
        }
      );
  }

  checkifValid() {
    if (this.accrediationRowData.length != 0) {
      this.myapplicationService.setEnableNextClick(true);
    } else {
      this.myapplicationService.setEnableNextClick(false);
    }
  }
}
