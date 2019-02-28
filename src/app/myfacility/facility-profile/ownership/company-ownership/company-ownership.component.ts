import { Component, OnInit } from "@angular/core";
import { MyFacilityService } from "src/app/myfacility/services/myfacility.service";
import { ModalService } from "src/app/shared/modal/modal.service";
import { HttpoptionsService } from "src/app/shared/httpoptions.service";
import { ActivatedRoute } from "@angular/router";
import { GridApi } from "ag-grid";
import { CompanyOwnershipModalComponent } from "./company-ownership-modal/company-ownership-modal.component";
import { Subscription } from "rxjs";

@Component({
  selector: "company-ownership",
  templateUrl: "./company-ownership.component.html",
  styleUrls: ["./company-ownership.component.scss"]
})
export class CompanyOwnershipComponent implements OnInit {
  companyRowData = [];
  subscription: Subscription;
  selectedCompanyRow = [];
  companyGridApi: GridApi;
  companyColumndefs = [];
  dataLoaded = false;
  constructor(
    private myFacilityService: MyFacilityService,
    private modalService: ModalService,
    private httpOptionService: HttpoptionsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.companyColumndefs = [
      {
        headerName: "Select",
        width: 50,
        checkboxSelection: true
      },
      {
        headerName: "Company Name",
        field: "organizationName",
        width: 200
      },
      {
        headerName: "E-Profile ID",
        field: "ownerEProfileId",
        width: 120
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
        field: "ownerShipStake",
        width: 120,
        valueGetter: function(param) {
          return param.data.ownerShipStake + "%";
        }
      },
      {
        headerName: "Previous Owners",
        field: "isPreviousOwner",
        width: 120,
        valueGetter: function(param) {
          return param.data.isPreviousOwner == null
            ? ""
            : param.data.isPreviousOwner
            ? "Yes"
            : "No";
        }
      },
      {
        headerName: "Ownership Type",
        width: 150,
        valueGetter: function(param) {
          let type;
          type = param.data.ownershipType;
          type +=
            param.data.otherOwnershipTypeDesc != ""
              ? "-" + param.data.otherOwnershipTypeDesc
              : "";
          return type;
        }
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

  selectCompanyEvent(event) {
    this.selectedCompanyRow = event;
  }

  onCompanyGridReady(event) {
    this.companyGridApi = event.api;
  }

  addCompanyOwnership() {
    if (this.selectedCompanyRow.length != 0) {
      this.companyGridApi.deselectAll();
    }
    let addCompanyOwnershipdialogRef = this.modalService.open(
      CompanyOwnershipModalComponent,
      {
        width: "1000px"
      }
    );
    addCompanyOwnershipdialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.saveCompanyOwnership(result);
      }
    });
  }
  saveCompanyOwnership(result: any) {
    this.myFacilityService.saveCompanyOwnershipData(result).subscribe(
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

  editCompanyOwnership() {
    let editCompanyOwnershipdialogRef = this.modalService.open(
      CompanyOwnershipModalComponent,
      {
        width: "1000px",
        data: this.selectedCompanyRow[0]
      }
    );
    editCompanyOwnershipdialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        let ownershipId = this.selectedCompanyRow[0].ownershipId;
        this.updateCompanyOwnership(result, ownershipId);
      } else {
        this.companyGridApi.deselectAll();
      }
    });
  }
  updateCompanyOwnership(result: any, ownershipId: any) {
    this.myFacilityService
      .updateCompanyOwnershipData(result, ownershipId)
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
  deleteCompanyOwnerShip() {
    let ownershipId = this.selectedCompanyRow[0].ownershipId;
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
      this.companyRowData = [];
      this.selectedCompanyRow = [];
      this.myFacilityService.getCompanyOwnershipDetails().subscribe(
        data => {
          this.companyRowData = data;
          this.dataLoaded = true;
        },
        error => {
          this.httpOptionService.handleError(error);
        }
      );
    }
  }
}
