import { Component, OnInit } from "@angular/core";
import { ApplicationService } from "../myapplication.service";
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import { HttpoptionsService } from "../../shared/httpoptions.service";
import { _Menu_items } from "src/app/shared/application-constants";
import { MenuAccessGaurd } from "src/app/shared/access-gaurd/access-gaurd.service";
import { ModalService } from "src/app/shared/modal/modal.service";
import { ApplicationLandingModalComponent } from "./application-landing-modal/application-landing-modal.component";

@Component({
  selector: "app-application-landing",
  templateUrl: "./application-landing.component.html",
  styleUrls: ["./application-landing.component.scss"]
})
export class ApplicationLandingComponent implements OnInit {
  queryParams = { selection: "multiple" };
  dataLoaded: boolean = false;
  progressApplications = [];
  inReviewApplications = [];
  submittedApplications = [];
  completedApplications = [];
  cancelledApplications = [];

  accessIds = [
    {
      menu_access_id: _Menu_items.create_application
    },
    {
      menu_access_id: _Menu_items.inprogress_applications
    },
    {
      menu_access_id: _Menu_items.submitted_applications
    },
    {
      menu_access_id: _Menu_items.inreview_applications
    },
    {
      menu_access_id: _Menu_items.completed_applications
    },
    {
      menu_access_id: _Menu_items.cancelled_applications
    }
  ];
  menu_access = [];
  constructor(
    private myapplicationService: ApplicationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private httpOptionsService: HttpoptionsService,
    private accessGaurd: MenuAccessGaurd,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.myapplicationService.setToolBarHeader("Application Dashboard");
    this.getApplications();
  }

  getApplications() {
    this.myapplicationService.getParentApplications().subscribe(
      response => {
        this.progressApplications = response.filter(
          this.filterProgressApplications
        );
        this.inReviewApplications = response.filter(
          this.filterInReviewApplications
        );
        this.submittedApplications = response.filter(
          this.filterSubmittedApplications
        );
        this.completedApplications = response.filter(
          this.filterCompletedApplications
        );
        this.cancelledApplications = response.filter(
          this.filterCancelledApplications
        );
        this.dataLoaded = true;
      },
      error => {
        this.httpOptionsService.handleError(error);
      }
    );
    this.menu_access = this.accessIds.map(element => {
      return this.getMenuAccess(element.menu_access_id);
    });
  }

  filterProgressApplications(element) {
    return element.applicationStatusTypeDescription == "InProgress";
  }
  filterInReviewApplications(element) {
    return element.applicationStatusTypeDescription == "In Review";
  }
  filterSubmittedApplications(element) {
    return element.applicationStatusTypeDescription == "Submitted";
  }
  filterCompletedApplications(element) {
    return element.applicationStatusTypeDescription == "Completed";
  }
  filterCancelledApplications(element) {
    return element.applicationStatusTypeDescription == "Cancelled";
  }

  proceedApplicationProcess(appId) {
    let navigationExtras: NavigationExtras = {
      queryParams: { selection: "multiple", appId: appId },
      queryParamsHandling: "merge",
      relativeTo: this.activatedRoute
    };
    this.router.navigate(["appmaster", appId], navigationExtras);
  }

  getMenuAccess(id: number): boolean {
    return this.accessGaurd.checkAccesstoMenu(id);
  }

  showInfo(appId:number) {
    const showApplicationFacilitiesRef = this.modalService.open(
      ApplicationLandingModalComponent,
      {
        width: "1000px",
        data: appId
      }
    );
    showApplicationFacilitiesRef.afterClosed().subscribe(result => {});
  }
}
