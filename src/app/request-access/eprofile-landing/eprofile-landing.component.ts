import { Component, OnInit } from "@angular/core";
import { RequestAccessService } from "../request-access.service";
import { HttpoptionsService } from "src/app/shared/httpoptions.service";
import { _Menu_items } from "src/app/shared/application-constants";
import { MenuAccessGaurd } from "src/app/shared/access-gaurd/access-gaurd.service";

@Component({
  selector: "app-eprofile-landing",
  templateUrl: "./eprofile-landing.component.html",
  styleUrls: ["./eprofile-landing.component.scss"]
})
export class EprofileLandingComponent implements OnInit {
  selectedData = [];
  rowData = [];
  submitted = [];
  inReview = [];
  dataFetched: boolean = false;
  access_request_e_profile: boolean;

  constructor(
    private httpOptionsService: HttpoptionsService,
    public requestAccessService: RequestAccessService,
    private accessService: MenuAccessGaurd
  ) {}

  ngOnInit() {
    this.requestAccessService.setToolBarHeader("e-Profile Requests");
    this.eProfileRequestList();
    this.access_request_e_profile = this.accessService.checkAccesstoMenu(
      _Menu_items.request_eprofile_id
    );
  }

  eProfileRequestList() {
    this.requestAccessService.getEprofileRequestList().subscribe(
      data => {
        this.rowData = data;
        this.rowData.forEach(element => {
          if (element.applicationStatusTypeDescription === "Submitted") {
            this.submitted.push(element);
          } else if (element.applicationStatusTypeDescription === "In Review") {
            this.inReview.push(element);
          }
        });
        this.dataFetched = true;
      },
      error => {
        this.httpOptionsService.handleError(error);
      }
    );
  }
}
