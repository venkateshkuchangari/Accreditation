import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { MyFacilityService } from "src/app/myfacility/services/myfacility.service";
import { Activity } from "./pharmacyactivities.model";
import { ModalService } from "src/app/shared/modal/modal.service";
import { PharmacyactivitiesModalComponent } from "./pharmacyactivities-modal/pharmacyactivities-modal.component";
import { ActivatedRoute } from "@angular/router";
import { HttpoptionsService } from "src/app/shared/httpoptions.service";
import { ApplicationService } from "src/app/myapplication/myapplication.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-pharmacyactivities",
  templateUrl: "./pharmacyactivities.component.html",
  styleUrls: ["./pharmacyactivities.component.scss"]
})
export class PharmacyactivitiesComponent implements OnInit, OnDestroy {
  dataLoaded = false;
  selectedPharmacyActivity = [];
  selectedStandardActivityIds = [];
  selectedOtherActivities = [];
  constructor(
    private myFacilityService: MyFacilityService,
    private modalService: ModalService,
    private activatedRoute: ActivatedRoute,
    private myApplicationService: ApplicationService,
    private httpOptionService: HttpoptionsService
  ) {}
  subscription: Subscription;

  ngOnInit() {
    this.subscription = this.activatedRoute.queryParams.subscribe(
      queryParams => {
        this.getFacilityActivities();
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addRemovePharmacyActivities() {
    const addRemovePharmacyActivityRef = this.modalService.open(
      PharmacyactivitiesModalComponent,
      {
        width: "1320px",
        data: {
          selected: this.selectedStandardActivityIds,
          other: this.selectedOtherActivities
        }
      }
    );
    addRemovePharmacyActivityRef.afterClosed().subscribe(response => {
      if (response != null) {
        this.selectedStandardActivityIds = response.selecetdActivities;
        this.selectedOtherActivities = response.otherActivities;
        let responseModel = [];
        this.selectedStandardActivityIds.forEach(element => {
          let data: Activity = new Activity();
          data.activityTypeId = element;
          responseModel.push(data);
        });
        if (
          this.selectedOtherActivities != null &&
          this.selectedOtherActivities.length != 0
        ) {
          this.selectedOtherActivities.forEach(element => {
            let data: Activity = new Activity();
            data.activityTypeId = 1240;
            data.activityOtherTypeDescription = element;
            responseModel.push(data);
          });
        }
        this.updatePharmacyActivities(responseModel);
      }
    });
  }

  getFacilityActivities() {
    if (this.myFacilityService.OrganisationId == undefined) {
      setTimeout(() => {
        this.getFacilityActivities();
      }, 300);
    } else {
      this.myFacilityService.getFacilityActivities().subscribe(
        response => {
          this.selectedPharmacyActivity = response;
          this.selectedStandardActivityIds = [];
          this.selectedOtherActivities = [];
          response.forEach(element => {
            if (element.activityTypeId != 1240) {
              this.selectedStandardActivityIds.push(element.activityTypeId);
            } else {
              this.selectedOtherActivities.push(
                element.activityOtherTypeDescription
              );
            }
          });
          this.dataLoaded = true;
          this.checkifValid();
        },
        error => {
          this.httpOptionService.handleError(error);
        }
      );
    }
  }

  updatePharmacyActivities(response) {
    this.myFacilityService.updateFacilityActivities(response).subscribe(
      response => {
        this.modalService.confirm(
          "Your Facility Activities are Updated",
          "Success",
          () => {
            this.getFacilityActivities();
          }
        );
      },
      error => {
        this.httpOptionService.handleError(error);
      }
    );
  }

  checkifValid() {
    if (this.selectedPharmacyActivity.length != 0) {
      this.myApplicationService.setEnableNextClick(true);
    } else {
      this.myApplicationService.setEnableNextClick(false);
    }
  }
}
