import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { ApplicationService } from "../../../myapplication.service";
import { HttpoptionsService } from "../../../../shared/httpoptions.service";
import {
  _Question_Categories,
  _Application_StepIds
} from "src/app/shared/application-constants";
import { Subscription } from "rxjs";

@Component({
  selector: "app-questions-ecommerce",
  templateUrl: "./questions-ecommerce.component.html",
  styleUrls: ["./questions-ecommerce.component.scss"]
})
export class QuestionsEcommerceComponent implements OnInit, OnDestroy {
  stepId = _Application_StepIds.app_questions_ecommerce;
  categoryId = _Question_Categories.eCommerce;
  ecommerceQuestions = [];
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
    this.ecommerceQuestions = [];
    if (this.myapplicationService.OrganisationId == undefined) {
      setTimeout(() => {
        this.getCategeoryQuestions();
      }, 300);
    } else {
      this.myapplicationService.getCategoryQuestions(this.categoryId).subscribe(
        response => {
          this.ecommerceQuestions = response;
        },
        error => {
          this.httpOptionsService.handleError(error);
        }
      );
    }
  }

  answerFromChild(value) {
    this.answerResponse = value;
    this.postEcommerceQuestions(this.answerResponse);
  }

  postEcommerceQuestions(data) {
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
