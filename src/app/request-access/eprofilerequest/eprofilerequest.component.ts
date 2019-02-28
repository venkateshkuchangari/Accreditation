import { Component, OnInit } from "@angular/core";
import { columnDefs } from "./eprofilerequest.model";
import { EprofilerequestModalComponent } from "./eprofilerequest-modal/eprofilerequest-modal.component";
import { ModalService } from "src/app/shared/modal/modal.service";
import { DashboardService } from "src/app/dashboard/services/dashboard.service";
import { HttpoptionsService } from "src/app/shared/httpoptions.service";
import { RequestAccessService } from "../request-access.service";
import { Router } from "@angular/router";
import { GridApi } from "ag-grid";

@Component({
  selector: "app-eprofilerequest",
  templateUrl: "./eprofilerequest.component.html",
  styleUrls: ["./eprofilerequest.component.scss"]
})
export class EprofilerequestComponent implements OnInit {
  eprofileGridApi: GridApi;
  columnDefs = columnDefs;
  selectedData = [];
  rowData = [];
  constructor(
    private modalService: ModalService,
    private requestAccessService: RequestAccessService,
    private httpOptionsService: HttpoptionsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.requestAccessService.setToolBarHeader("Create Requests");
  }

  createEprofileRequest() {
    if (this.selectedData.length != 0) {
      this.eprofileGridApi.deselectAll();
    }
    const createEprofileModalRef = this.modalService.open(
      EprofilerequestModalComponent,
      {
        width: "1000px",
        data: {}
      }
    );
    createEprofileModalRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        result.rowId = this.rowData.length;
        this.rowData = [...this.rowData, result];
      }
    });
  }
  onEprofileGridReady(event) {
    this.eprofileGridApi = event.api;
  }

  selectedEvent(data: any) {
    this.selectedData = data;
  }

  removeEprofileRequest() {
    var rowArray = this.rowData;
    rowArray.splice(this.selectedData[0].rowId, 1);
    this.rowData = [...rowArray];
    this.selectedData = [];
  }
  
  submitEprofileRequests() {
    this.requestAccessService.postEprofileRequests(this.rowData).subscribe(
      response => {
        this.modalService.confirm(
          "Your data is Staged for Review",
          "Success",
          () => {
            this.router.navigate(["/dashboard/request-access"]);
          }
        );
        this.rowData = [];
        this.selectedData = [];
      },
      error => {
        this.httpOptionsService.handleError(error);
      }
    );
  }
}
