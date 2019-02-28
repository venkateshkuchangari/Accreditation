import { Component, OnInit } from "@angular/core";
import { ModalService } from "src/app/shared/modal/modal.service";
import { MyFacilityService } from "src/app/myfacility/services/myfacility.service";
import { ApplicationService } from "src/app/myapplication/myapplication.service";
import { HttpoptionsService } from "src/app/shared/httpoptions.service";
import { ActivatedRoute } from "@angular/router";
import { GridApi } from "ag-grid";
import { IndividualOwnershipModalComponent } from "./individual-ownership-modal/individual-ownership-modal.component";
import { Subscription } from "rxjs";

@Component({
  selector: "individual-ownership",
  templateUrl: "./individual-ownership.component.html",
  styleUrls: ["./individual-ownership.component.scss"]
})
export class IndividualOwnershipComponent implements OnInit {
  columnDefs = [];
  dataLoaded = false;
  individualRowData = [];
  selectedIndividualRow = [];
  subscription: Subscription;
  individualGridApi: GridApi;
  constructor(
    private myFacilityService: MyFacilityService,
    private modalService: ModalService,
    private httpOptionService: HttpoptionsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.columnDefs = [
      {
        headerName: "Select",
        width: 50,
        checkboxSelection: true
      },
      {
        headerName: "Name",
        valueGetter: param => {
          let name;
          name = param.data.firstName;
          name += " " + param.data.middleName;
          name += param.data.lastName != "" ? ", " + param.data.lastName : "";
          return name;
        }
      },
      {
        headerName: "Title",
        field: "title",
        width: 150
      },
      {
        headerName: "E-Profile ID",
        field: "eprofileId",
        width: 150
      },
      {
        headerName: "Address",
        width: 250,
        valueGetter: function(param) {
          let addr: string;
          addr = param.data.address1;
          addr += param.data.address2 != "" ? ", " + param.data.address2 : "";
          addr += param.data.city != null ? ", " + param.data.city : "";
          addr +=
            param.data.stateName != null ? ", " + param.data.stateName : "";
          addr +=
            param.data.countryName != null ? ", " + param.data.countryName : "";
          addr += param.data.zipCode != null ? ", " + param.data.zipCode : "";
          return addr;
        }
      },
      {
        headerName: "Percentage Owned",
        width: 120,
        valueGetter: function(param: any) {
          return param.data.percentOwned + "%";
        }
      },
      {
        headerName: "Previous Owners",
        field: "isPreviousOwner",
        width: 120,
        valueGetter: function(param: any) {
          return param.data.isPreviousOwner == null
            ? ""
            : param.data.isPreviousOwner
            ? "Yes"
            : "No";
        }
      },
      {
        headerName: "Relationship",
        field: "relationship",
        width: 155
      }
    ];

    this.subscription = this.activatedRoute.queryParams.subscribe(
      queryParams => {
        this.showOwnershipDetails();
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectIndividualEvent(event) {
    this.selectedIndividualRow = event;
  }

  onIndividualGridReady(event) {
    this.individualGridApi = event.api;
  }

  addIndividualOwnership() {
    if (this.selectedIndividualRow.length != 0) {
      this.individualGridApi.deselectAll();
    }
    let addIndividualOwnershipdialogRef = this.modalService.open(
      IndividualOwnershipModalComponent,
      {
        width: "1000px"
      }
    );
    addIndividualOwnershipdialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.saveIndividualOwnership(result);
      }
    });
  }

  saveIndividualOwnership(result: any) {
    this.myFacilityService.saveIndividualOwnershipData(result).subscribe(
      success => {
        this.modalService.confirm(
          "Ownership details saved successfully.",
          "Success",
          () => {
            this.showOwnershipDetails();
          }
        );
      },
      error => {
        this.httpOptionService.handleError(error);
      }
    );
  }

  editIndividualOwnership() {
    let editIndividualOwnershipdialogRef = this.modalService.open(
      IndividualOwnershipModalComponent,
      {
        width: "1000px",
        data: this.selectedIndividualRow[0]
      }
    );
    editIndividualOwnershipdialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        let ownershipId = this.selectedIndividualRow[0].ownershipId;
        this.updateIndividulOwnership(result, ownershipId);
      } else {
        this.individualGridApi.deselectAll();
      }
    });
  }

  updateIndividulOwnership(result: any, ownershipId: any) {
    this.myFacilityService
      .updateIndividualOwnershipData(result, ownershipId)
      .subscribe(
        success => {
          this.modalService.confirm(
            "Ownership details updated successfully.",
            "Success",
            () => {
              this.showOwnershipDetails();
            }
          );
        },
        error => {
          this.httpOptionService.handleError(error);
        }
      );
  }

  deleteIndividualOwnerShip() {
    let ownershipId = this.selectedIndividualRow[0].ownershipId;
    this.myFacilityService.deleteOwnershipData(ownershipId).subscribe(
      response => {
        this.modalService.confirm(
          "Ownership Record is Deleted",
          "Success",
          () => {
            this.showOwnershipDetails();
          }
        );
      },
      error => {
        this.httpOptionService.handleError(error);
      }
    );
  }

  showOwnershipDetails() {
    this.dataLoaded=false;
    if (this.myFacilityService.OrganisationId == undefined) {
      setTimeout(() => {
        this.showOwnershipDetails();
      }, 300);
    } else {
      this.individualRowData = [];
      this.selectedIndividualRow = [];
      this.myFacilityService.getIndividualOwnershipDetails().subscribe(
        data => {
          this.individualRowData = data;
          this.dataLoaded = true;
        },
        error => {
          this.httpOptionService.handleError(error);
        }
      );
    }
  }
}
