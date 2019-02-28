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
  selector: "app-questions-supply-chain",
  templateUrl: "./questions-supply-chain.component.html",
  styleUrls: ["./questions-supply-chain.component.scss"]
})
export class QuestionsSupplyChainComponent implements OnInit, OnDestroy {
  categoryId = _Question_Categories.supply_Chain;
  stepId = _Application_StepIds.app_questions_supplychain;
  supplyChainQuestions = [];
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
    this.supplyChainQuestions = [];
    if (this.myapplicationService.OrganisationId == undefined) {
      setTimeout(() => {
        this.getCategeoryQuestions();
      }, 300);
    } else {
      this.myapplicationService.getCategoryQuestions(this.categoryId).subscribe(
        response => {
          this.supplyChainQuestions = response;
        },
        error => {
          this.httpOptionsService.handleError(error);
        }
      );
    }
  }

  answerFromChild(value) {
    this.answerResponse = value;
    this.postsupplyChainQuestions(this.answerResponse);
  }

  postsupplyChainQuestions(data) {
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
