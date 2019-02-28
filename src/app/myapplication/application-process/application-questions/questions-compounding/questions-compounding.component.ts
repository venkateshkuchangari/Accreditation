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
  selector: "app-questions-compounding",
  templateUrl: "./questions-compounding.component.html",
  styleUrls: ["./questions-compounding.component.scss"]
})
export class QuestionsCompoundingComponent implements OnInit, OnDestroy {
  categoryId = _Question_Categories.compounding;
  stepId = _Application_StepIds.app_questions_compounding;
  compoundingQuestions = [];
  answerResponse = [];
  subscription: Subscription;
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
    this.compoundingQuestions = [];
    if (this.myapplicationService.OrganisationId == undefined) {
      setTimeout(() => {
        this.getCategeoryQuestions();
      }, 300);
    } else {
      this.myapplicationService.getCategoryQuestions(this.categoryId).subscribe(
        response => {
          this.compoundingQuestions = response;
        },
        error => {
          this.httpOptionsService.handleError(error);
        }
      );
    }
  }

  answerFromChild(value) {
    this.answerResponse = value;
    this.postCompoundingQuestions(this.answerResponse);
  }

  postCompoundingQuestions(data) {
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
