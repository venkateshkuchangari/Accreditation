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
  selector: "app-questions-nuclear-pharmacy",
  templateUrl: "./questions-nuclear-pharmacy.component.html",
  styleUrls: ["./questions-nuclear-pharmacy.component.scss"]
})
export class QuestionsNuclearPharmacyComponent implements OnInit, OnDestroy {
  categoryId = _Question_Categories.nuclear_Pharmacy;
  stepId = _Application_StepIds.app_questions_nuclearpharmacy;
  nuclearPharmacyQuestions = [];
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
    this.nuclearPharmacyQuestions = [];
    if (this.myapplicationService.OrganisationId == undefined) {
      setTimeout(() => {
        this.getCategeoryQuestions();
      }, 300);
    } else {
      this.myapplicationService.getCategoryQuestions(this.categoryId).subscribe(
        response => {
          this.nuclearPharmacyQuestions = response;
        },
        error => {
          this.httpOptionsService.handleError(error);
        }
      );
    }
  }

  answerFromChild(value) {
    this.answerResponse = value;
    this.postNuclearPharmacyQuestions(this.answerResponse);
  }

  postNuclearPharmacyQuestions(data) {
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
