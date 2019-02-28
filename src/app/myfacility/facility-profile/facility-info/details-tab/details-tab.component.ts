import { Component, OnInit, Inject, Input, OnDestroy } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { DetailsTabModalComponent } from "./details-tab-modal/details-tab-modal.component";
import { ModalService } from "../../../../shared/modal/modal.service";
import { MyFacilityService } from "../../../services/myfacility.service";
import { HttpoptionsService } from "../../../../shared/httpoptions.service";
import { ActivatedRoute } from "@angular/router";
import { ApplicationService } from "src/app/myapplication/myapplication.service";

@Component({
  selector: "app-info-detailtab",
  templateUrl: "./details-tab.component.html",
  styleUrls: ["./details-tab.component.scss"]
})
export class InfoDetailtabComponent implements OnInit, OnDestroy {
  constructor(
    public modalService: ModalService,
    private myFacilityService: MyFacilityService,
    private httpOptionsService: HttpoptionsService,
    private activatedRoute: ActivatedRoute,
    private myApplicationService:ApplicationService
  ) {}
  detailsData;
  subscription;

  ngOnInit() {
    this.subscription = this.activatedRoute.queryParams.subscribe(
      queryParams => {
        this.showInfo();
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openListDialog(data, description): void {
    const listdialogRef = this.modalService.open(DetailsTabModalComponent, {
      width: "400px",
      data: { id: 0, description: description, List: data }
    });
  }
openAddressDialog(): void {
    const addressdialogRef = this.modalService.open(DetailsTabModalComponent, {
      width: "850px",
      data: {
        id: 2,
        description: "Edit Address Info",
        phone: this.detailsData.phone,
        email: this.detailsData.email,
        fax: this.detailsData.fax,
        website: this.detailsData.website
      }
    });
    addressdialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.myFacilityService.putOrganizationAddress(result).subscribe(
          response => {
              this.modalService.confirm(
                "Your Information is Updated",
                "Success",
                () => {
                  this.showInfo();
                }
              );
          },
          error => {
            this.httpOptionsService.handleError(error);
          }
        );
      }
    });
  }
  openOrganizationDetailsDialog(): void {
    let org_details = this.detailsData;
    const addressdialogRef = this.modalService.open(DetailsTabModalComponent, {
      width: "850px",
      data: {
        id: 1,
        description: "Edit Organization Details",
        org_details: org_details
      }
    });
    addressdialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.myFacilityService.putOrganizationAttributes(result).subscribe(
          response => {
              this.modalService.confirm(
                "Your Information is Updated",
                "Success",
                () => {
                  this.showInfo();
                }
              )             
          },
          (error) => {
            this.httpOptionsService.handleError(error);
          }
        );
      }
    });
  }
  showInfo() {
    if (this.myFacilityService.OrganisationId == undefined) {
      setTimeout(() => {
        this.showInfo();
      }, 300);
    } else {
      this.myFacilityService.getFacilityInfo()
      .subscribe((response) => {        
        this.detailsData = response
      },
        (error) => {
          this.httpOptionsService.handleError(error);
        }
        )
    }
  }
}
