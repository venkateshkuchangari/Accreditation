import { Component, OnInit } from "@angular/core";
import { MyFacilityService } from "../../../services/myfacility.service";
import { DatePipe } from "@angular/common";
import { ModalService } from "src/app/shared/modal/modal.service";
import { InspectionModalComponent } from "./inspection-modal/inspection-modal.component";
import { ActivatedRoute } from "@angular/router";
import { GridApi } from "../../../../../../node_modules/ag-grid";
import { HttpoptionsService } from "src/app/shared/httpoptions.service";
import { Subscription } from "rxjs";
import { ApplicationService } from "src/app/myapplication/myapplication.service";

@Component({
  selector: "app-inspection",
  templateUrl: "./inspection.component.html",
  styleUrls: ["./inspection.component.scss"],
  providers: [DatePipe]
})
export class InspectionComponent implements OnInit {
  selectedRow1 = [];
  selectedRow2 = [];
  selectedRow3 = [];
  selectedRow = [];
  dataFetchedsB: boolean = false;
  dataFetchedgB: boolean = false;
  dataFetchedoB: boolean = false;
  stateBoradColumnDefs: any;
  otherBoardColumnDefs: any;
  govtBoardColumnDefs: any;
  subscription: Subscription;
  residentGridApi: GridApi;
  otherGridApi: GridApi;
  govtGridApi: GridApi;
  residentInspection = [];
  govtInspection = [];
  otherInspection = [];
  notFound = "No data to show";
  Instr = "Click Add to report new inspections ";
  residentMsg = "Resident State Board of Pharmacy";
  otherAgenciesMsg = "Other Agencies or State Boards";
  govtAgencyMsg = "Government Agency";
  constructor(
    private myfacilityService: MyFacilityService,
    private _datePipe: DatePipe,
    private modalService: ModalService,
    private activatedRoute: ActivatedRoute,
    private httpOptionService: HttpoptionsService,
    private myapplicationService: ApplicationService
  ) {
    let a = this;
    this.stateBoradColumnDefs = [
      {
        headerName: "Select",
        width: 75,
        checkboxSelection: true
      },
      {
        headerName: "Date of Inspection",
        field: "inspectionDate",
        width: 125,
        filter: "agDateColumnFilter",
        valueFormatter: function(param) {
          return param.data.inspectionDate == null
            ? ""
            : a._datePipe.transform(param.data.inspectionDate, "MM/dd/yyyy");
        }
      }
    ];
    this.otherBoardColumnDefs = [
      {
        headerName: "Select",
        width: 200,
        checkboxSelection: true
      },
      {
        headerName: "Date of Inspection",
        field: "inspectionDate",
        width: 300,
        filter: "agDateColumnFilter",
        valueFormatter: function(param) {
          return param.data.inspectionDate == null
            ? ""
            : a._datePipe.transform(param.data.inspectionDate, "MM/dd/yyyy");
        }
      },
      {
        headerName: "Application Inspection Agency",
        field: "agency",
        width: 300
      }
    ];
    this.govtBoardColumnDefs = [
      {
        headerName: "Select",
        checkboxSelection: true,
        width: 200
      },
      {
        headerName: "Date of Inspection",
        field: "inspectionDate",
        width: 300,
        filter: "agDateColumnFilter",
        valueFormatter: function(param) {
          return param.data.inspectionDate == null
            ? ""
            : a._datePipe.transform(param.data.inspectionDate, "MM/dd/yyyy");
        }
      },
      {
        headerName: "Application Inspection Agency",
        field: "agency",
        width: 300
      }
    ];
  }

  ngOnInit() {
    let a = this;
    this.subscription = this.activatedRoute.queryParams.subscribe(
      queryParams => {
        this.showSBInspection();
        this.showInsOther();
        this.showInsGovt();
      }
    );
  }

  addInspectionHistory() {
    this.deselectallGrids();
    const addInspectionHistoryRef = this.modalService.open(
      InspectionModalComponent,
      {
        width: "800px",
        data: null
      }
    );
    addInspectionHistoryRef.afterClosed().subscribe(data => {
      if (data != undefined) {
        this.postInspectionHistory(data);
      }
    });
  }

  editInspectionHistory() {
    const editInspectionHistoryRef = this.modalService.open(
      InspectionModalComponent,
      {
        width: "800px",
        data: this.selectedRow[0]
      }
    );
    editInspectionHistoryRef.afterClosed().subscribe(data => {
      if (data != undefined) {
        this.putInspectionHistory(data);
      }
      this.deselectallGrids();
    });
  }

  postInspectionHistory(inspectionHistory) {
    this.myfacilityService.postInspectionHistory(inspectionHistory).subscribe(
      success => {
        this.modalService.confirm(
          "Facility Inspection History is Saved",
          "Success!!!",
          () => {
            this.selectedRow = [];
            this.showSBInspection();
            this.showInsOther();
            this.showInsGovt();
          }
        );
      },
      error => {
        this.httpOptionService.handleError(error);
      }
    );
  }

  putInspectionHistory(inspectionHistory) {
    let inspectionId = this.selectedRow[0].inspectionId;
    this.myfacilityService
      .putInspectionHistory(inspectionHistory, inspectionId)
      .subscribe(
        success => {
          this.modalService.confirm(
            "Facility Inspection History is Updated",
            "Success!!!",
            () => {
              this.selectedRow = [];
              this.showSBInspection();
              this.showInsOther();
              this.showInsGovt();
            }
          );
        },
        error => {
          this.httpOptionService.handleError(error);
        }
      );
  }

  onGridReady(event) {
    this.residentGridApi = event.api;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  showSBInspection() {
    if (this.myfacilityService.OrganisationId == undefined) {
      setTimeout(() => {
        this.showSBInspection();
      }, 3000);
    } else {
      this.residentInspection = [];
      this.selectedRow = [];
      this.selectedRow1 = [];
      this.myfacilityService.getInspection().subscribe(response => {
        this.residentInspection = response;
        this.dataFetchedsB = true;
        this.checkifValid();
      });
    }
  }

  selectedRowEvent(data: any) {
    if (this.selectedRow2.length != 0) {
      this.otherGridApi.deselectAll();
    }
    if (this.selectedRow3.length != 0) {
      this.govtGridApi.deselectAll();
    }
    setTimeout(() => {
      this.selectedRow1 = data;
      this.selectedRow = [
        ...this.selectedRow3,
        ...this.selectedRow2,
        ...this.selectedRow1
      ];
    }, 500);
  }
  selectedRowEventOther(data: any) {
    if (this.selectedRow1.length != 0) {
      this.residentGridApi.deselectAll();
    }
    if (this.selectedRow3.length != 0) {
      this.govtGridApi.deselectAll();
    }
    setTimeout(() => {
      this.selectedRow2 = data;
      this.selectedRow = [
        ...this.selectedRow3,
        ...this.selectedRow2,
        ...this.selectedRow1
      ];
    }, 500);
  }
  selectedRowEventGovt(data: any) {
    if (this.selectedRow1.length != 0) {
      this.residentGridApi.deselectAll();
    }
    if (this.selectedRow2.length != 0) {
      this.otherGridApi.deselectAll();
    }
    setTimeout(() => {
      this.selectedRow3 = data;
      this.selectedRow = [
        ...this.selectedRow3,
        ...this.selectedRow2,
        ...this.selectedRow1
      ];
    }, 500);
  }

  showInsOther() {
    if (this.myfacilityService.OrganisationId == undefined) {
      setTimeout(() => {
        this.showInsOther();
      }, 300);
    } else {
      this.selectedRow = [];
      this.otherInspection = [];
      this.selectedRow2 = [];
      this.myfacilityService.getOtherInspection().subscribe(
        response => {
          this.otherInspection = response;
          this.dataFetchedoB = true;
          this.checkifValid();
        },
        error => {
        }
      );
    }
  }

  onGridReadyOther(event) {
    this.otherGridApi = event.api;
  }

  showInsGovt() {
    if (this.myfacilityService.OrganisationId == undefined) {
      setTimeout(() => {
        this.showInsGovt();
      }, 300);
    } else {
      this.selectedRow = [];
      this.govtInspection = [];
      this.selectedRow3 = [];
      this.myfacilityService.getGovtInspection().subscribe(
        response => {
          this.govtInspection = response;
          this.dataFetchedgB = true;
          this.checkifValid();
        },
        error => {
          this.httpOptionService.handleError(error);
        }
      );
    }
  }

  onGridReadyGovt(event: any) {
    this.govtGridApi = event.api;
  }

  deselectallGrids() {
    this.selectedRow = [];
    if (this.selectedRow1.length != 0) {
      this.residentGridApi.deselectAll();
    }
    if (this.selectedRow2.length != 0) {
      this.otherGridApi.deselectAll();
    }
    if (this.selectedRow3.length != 0) {
      this.govtGridApi.deselectAll();
    }
  }

  deleteInspectionHistory() {
    let inspectionId = this.selectedRow[0].inspectionId;
    this.myfacilityService.deleteInspectionHistory(inspectionId).subscribe(
      response => {
        this.modalService.confirm(
          "Facility Inspection History is deleted",
          "Success!!!",
          () => {
            this.selectedRow = [];
            this.showSBInspection();
            this.showInsOther();
            this.showInsGovt();
          }
        );
      },
      error => {
        this.httpOptionService.handleError(error);
      }
    );
  }

  checkifValid() {
    if (
      this.residentInspection.length != 0 ||
      this.otherInspection.length != 0 ||
      this.govtInspection.length != 0
    ) {
      this.myapplicationService.setEnableNextClick(true);
    } else {
      this.myapplicationService.setEnableNextClick(false);
    }
  }
}
