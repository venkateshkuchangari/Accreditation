import { Component, OnInit } from "@angular/core";
import { ApplicationService } from "../../myapplication.service";
import { HttpoptionsService } from "src/app/shared/httpoptions.service";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { _Application_StepIds } from "src/app/shared/application-constants";

@Component({
  selector: "app-program-questions",
  templateUrl: "./program-questions.component.html",
  styleUrls: ["./program-questions.component.scss"]
})
export class ProgramQuestionsComponent implements OnInit {
  tabIndexNumber = 0;

  questionTabs = [];
  subscription: Subscription;
  subscription2;
  constructor(
    private myApplicationService: ApplicationService,
    private httpOptionService: HttpoptionsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription = this.activatedRoute.queryParams.subscribe(
      queryParams => {
        this.showInfo();
      }
    );
  }

  showInfo() {    
    this.myApplicationService.getApplicationPrograms().subscribe(
      response => {      
        this.myApplicationService.setApplicationData(response);
        this.getTabs();
      },
      error => {
        this.httpOptionService.handleError(error);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.subscription2) {      
      this.subscription2.unsubscribe();
    }
  }

  getTabs() {
    this.questionTabs = this.myApplicationService.getSelectedProgramData();
    if (this.questionTabs.length == 0) {
      this.myApplicationService.checkStepTrackerId(
        _Application_StepIds.choose_programs+1,
        _Application_StepIds.review
      );
    } else {
      this.subscription2 = this.myApplicationService._get_program_question_tab_index_number.subscribe(
        value => {         
          this.tabIndexNumber = value;
        }
      );
    }
  }
}
