import { Component, OnInit, ViewChild } from "@angular/core";
import "ag-grid-enterprise";
import { MyFacilityService } from "../services/myfacility.service";
import {
  Router,
  NavigationExtras,
  ActivatedRoute,
  Params
} from "@angular/router";
import { ModalService } from "../../shared/modal/modal.service";
import { DynamicGridComponent } from "../../shared/dynamic-grid/dynamic-grid.component";
import { HttpoptionsService } from "../../shared/httpoptions.service";
import { ApplicationService } from "../../myapplication/myapplication.service";
import { StatementAgreementComponent } from "../../myapplication/application-process/statement-agreement/statement-agreement.component";
import { MenuAccessGaurd } from "src/app/shared/access-gaurd/access-gaurd.service";
import { _Menu_items } from "src/app/shared/application-constants";

@Component({
  selector: "app-facility-list",
  templateUrl: "./myfacility-list.component.html",
  styleUrls: ["./myfacility-list.component.scss"]
})
export class MyFacilityListComponent implements OnInit {
  rowData = [];
  dataFetched: boolean = false;
  clickhere: string = "Don't see your Facility listed? Click here:";
  choosefacility: string = "Please choose a facility to view its details.";
  reqNewid: string = "Request New Facility e-Profile ID";
  @ViewChild(DynamicGridComponent) onSelectionChanged: DynamicGridComponent;

  jsonData;
  columnDefs;
  actionIdonRoutes: string;
  rowSelectionOnRoute: string;
  organizationid: any;
  eprofileid: any;
  applicationFacilities;
  enable_Next: boolean;
  showExportButton = true;
  access_request_e_profile: boolean;

  constructor(
    private applicationService: ApplicationService,
    private httpoptionsservice: HttpoptionsService,
    public myFacilityInfoService: MyFacilityService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService,
    private accessService: MenuAccessGaurd
  ) {
    this.columnDefs = [
      {
        headerName: "Select",
        checkboxSelection: true,
        width: 80
      },
      {
        headerName: "Facility e-Profile ID",
        field: "EProfileID"
      },
      {
        headerName: "LBN",
        field: "LegalBusinessName",
        width: 200
      },
      {
        headerName: "Primary DBA",
        field: "PrimaryDBA"
      },
      {
        headerName: "Address",
        width: 200,
        valueGetter: function(param) {
          let addr: string;
          addr = param.data.AddressLine1;
          addr +=
            param.data.AddressLine2 != null
              ? ", " + param.data.AddressLine2
              : "";
          return addr;
        }
      },
      {
        headerName: "City",
        field: "City"
      },
      {
        headerName: "State",
        field: "StateCode",
        width: 100
      },
      {
        headerName: "Zip",
        field: "Zip",
        width: 120
      },
      {
        headerName: "Country",
        field: "CountryCode",
        width: 100
      }
    ];
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.actionIdonRoutes = params["modeid"];
    });
    if (this.actionIdonRoutes == "_app_accr9") {
      this.applicationService.setToolBarHeader("Choose Facilities");
      this.showExportButton = false;
      this.rowSelectionOnRoute = "multiple";
     } else if (this.actionIdonRoutes == "_fac_accr4") {
      this.rowSelectionOnRoute = "single";
    }

    this.showFacilityList();
    this.access_request_e_profile = this.accessService.checkAccesstoMenu(
      _Menu_items.request_eprofile_id
    );
  }

  selectedEvent(data: any) {
    if (this.actionIdonRoutes == "_app_accr9") {
      this.applicationFacilities = data;
      if (data == null || data.length == 0) {
        this.enable_Next = false;
      } else this.enable_Next = true;
    } else if (this.actionIdonRoutes == "_fac_accr4" && (data[0] || "")) {
      this.organizationid = data[0].OrganizationID;
      this.eprofileid = data[0].EProfileID;
      let navigationExtras: NavigationExtras = {
        queryParams: { eprofileid: this.eprofileid },
        queryParamsHandling: "merge",
        relativeTo: this.activatedRoute
      };
      this.router.navigate(
        ["detail-info", this.organizationid],
        navigationExtras
      );
    }
  }
  saveApplicationFacilities() {
    const statementAgreementModalRef = this.modalService.open(
      StatementAgreementComponent,
      {
        width: "800px"
      }
    );
    statementAgreementModalRef.afterClosed().subscribe(result => {
      if (result == true) {
        let facilityIds = this.applicationFacilities.map(element => {
          let facility = {
            facilityId: ""
          };
          facility.facilityId = element.OrganizationID;
          return facility;
        });
        this.postApplicationFacilitiesList(facilityIds);
      } else {
        this.router.navigate(["/dashboard/myapplications"]);
      }
    });
  }

  onGridReady(params) {}

  showFacilityList() {
    this.myFacilityInfoService.getfacilityList().subscribe(
      data => {
        this.jsonData = data;
        this.rowData = this.jsonData.value;
        this.dataFetched = true;
      },
      error => {
        this.httpoptionsservice.handleError(error);
      }
    );
  }

  postApplicationFacilitiesList(facilityIds) {
    let navigationExtras: NavigationExtras = {
      queryParamsHandling: "merge",
      relativeTo: this.activatedRoute
    };

    this.applicationService.postApplicationFacilities(facilityIds).subscribe(
      response => {
        navigationExtras.queryParams = {
          selection: "multiple",
          appId: response.applicationID
        };
        this.router.navigate(
          ["/dashboard/myapplications/appmaster", response.applicationID],
          navigationExtras
        );
      },
      error => {
        this.modalService.confirm(
          "Error Occured While Creating the Application" + error.status,
          "Error!!!"
        );
      }
    );
  }
}
