import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { ApplicationService } from "src/app/myapplication/myapplication.service";
import { HttpoptionsService } from "src/app/shared/httpoptions.service";
import {
  _Question_Categories,
  _Application_StepIds
} from "src/app/shared/application-constants";
import { Subscription } from "rxjs";

@Component({
  selector: "app-questions-general",
  templateUrl: "./questions-general.component.html",
  styleUrls: ["./questions-general.component.scss"]
})
export class QuestionsGeneralComponent implements OnInit, OnDestroy {
  categoryId = _Question_Categories.general;
  generalQuestions = [];
  answerResponse = [];
  subscription: Subscription;
  stepId = _Application_StepIds.app_questions_general;
  constructor(
    private activatedRoute: ActivatedRoute,
    private myapplicationService: ApplicationService,
    private httpOptionsService: HttpoptionsService
  ) {}

  ngOnInit() {
    this.subscription = this.activatedRoute.queryParams.subscribe(
      queryParams => {
        this.getCategeoryQuestions();
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getCategeoryQuestions() {
    this.generalQuestions = [];
    if (this.myapplicationService.OrganisationId == undefined) {
      setTimeout(() => {
        this.getCategeoryQuestions();
      }, 300);
    } else {
      this.myapplicationService.getCategoryQuestions(this.categoryId).subscribe(
        response => {
          this.generalQuestions = response;
        },
        error => {
          this.httpOptionsService.handleError(error);
        }
      );
    }
  }

  answerFromChild(value) {
    this.answerResponse = value;
    this.postGeneralQuestions(this.answerResponse);
  }

  postGeneralQuestions(data) {
    this.myapplicationService.saveUniversalQuestions(data).subscribe(
      response => {
        this.myapplicationService.checkStepTrackerId(
          this.stepId,
          this.stepId + 1
        );
      },
      error => {
        this.httpOptionsService.handleError(error);
      }
    );
  }
}
