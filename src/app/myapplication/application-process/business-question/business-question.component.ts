import { Component, OnInit } from "@angular/core";
import { ApplicationService } from "../../myapplication.service";
import { MyFacilityService } from "src/app/myfacility/services/myfacility.service";
import { _Question_Categories, _Application_StepIds } from "src/app/shared/application-constants";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { HttpoptionsService } from "src/app/shared/httpoptions.service";


@Component({
  selector: "app-business-question",
  templateUrl: "./business-question.component.html",
  styleUrls: ["./business-question.component.scss"]
})
export class BusinessQuestionComponent implements OnInit {
  businessQuestions = [];
  categoryId = _Question_Categories.business_Information;
  answerResponse = [];
  subscription: Subscription;
  stepId = _Application_StepIds.facility_info_bquestions;
  constructor(
    private myFacilityService: MyFacilityService,
    private myapplicationService: ApplicationService,
    private activatedRoute: ActivatedRoute,
    private httpOptionService: HttpoptionsService
  ) {}

  ngOnInit() {
    this.subscription = this.activatedRoute.queryParams.subscribe(
      queryParams => {
        this.getCategeoryQuestions();
      }
    );
  }

  answerFromChild(value) {
    this.answerResponse = value;
    this.postBusinessQuestions(this.answerResponse);
  }

  getCategeoryQuestions() {
    this.businessQuestions = [];
    if (this.myFacilityService.OrganisationId == undefined) {
      setTimeout(() => {
        this.getCategeoryQuestions();
      }, 300);
    } else {
      this.myapplicationService.getBusinessQuestions(this.categoryId).subscribe(
        response => {
          this.businessQuestions = response;
        },
        error => {
        }
      );
    }
  }

  postBusinessQuestions(data) {
    this.myapplicationService.saveBusinessQuestions(data).subscribe(
      response => {
        this.myapplicationService.checkStepTrackerId(
          this.stepId,
          this.stepId + 1
        );
      },
      error => {
        this.httpOptionService.handleError(error);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
