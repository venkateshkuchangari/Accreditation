import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApplicationService } from "../../myapplication.service";
import { _Question_Categories, _Application_StepIds } from "src/app/shared/application-constants";
import { Subscription } from "rxjs";
import { HttpoptionsService } from "src/app/shared/httpoptions.service";


@Component({
  selector: "ownership-question",
  templateUrl: "ownership-question.component.html",
  styleUrls: ["ownership-question.component.scss"]
})
export class OwnershipQuestionComponent {
  categoryId = _Question_Categories.ownership;
  ownershipQuestions = [];
  answerResponse = [];
  subscription: Subscription;
  stepId = _Application_StepIds.ownership_question;
  constructor(
    private activatedRoute: ActivatedRoute,
    private myapplicationService: ApplicationService,
    private httpOptionService: HttpoptionsService
  ) {}

  ngOnInit() {
    this.subscription = this.activatedRoute.queryParams.subscribe(
      queryParams => {
        this.getOwnershipQuestions();
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getOwnershipQuestions() {
    if (this.myapplicationService.OrganisationId == undefined) {
      setTimeout(() => {
        this.getOwnershipQuestions();
      }, 300);
    } else {
      this.myapplicationService
        .getOwnershipQuestions(this.categoryId)
        .subscribe(
          response => {
            this.ownershipQuestions = response;
          },
          error => {
            this.httpOptionService.handleError(error);
          }
        );
    }
  }

  answerFromChild(value) {
    this.answerResponse = value;
    this.postOwnershipQuestions(this.answerResponse);
  }

  postOwnershipQuestions(data) {
    this.myapplicationService.saveOwnershipQuestions(data).subscribe(
      response => {
        if (response.requestOwnershipDetails === true) {
          this.myapplicationService.checkStepTrackerId(
            this.stepId,
            this.stepId + 1
          );
        } else {
          this.myapplicationService.checkStepTrackerId(
            this.stepId,
            this.stepId + 2
          );
        }
      },
      error => {
        this.httpOptionService.handleError(error);
      }
    );
  }
}
