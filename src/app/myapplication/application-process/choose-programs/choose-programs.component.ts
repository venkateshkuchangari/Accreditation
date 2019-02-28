import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { ApplicationService } from "../../myapplication.service";
import { HttpoptionsService } from "src/app/shared/httpoptions.service";
import {
  _Choose_Program_Constants,
  _Application_StepIds
} from "src/app/shared/application-constants";
import { Subscription } from "rxjs";

@Component({
  selector: "app-choose-programs",
  templateUrl: "./choose-programs.component.html",
  styleUrls: ["./choose-programs.component.scss"]
})
export class ChooseProgramsComponent implements OnInit, OnDestroy {
  applicationPrograms = [];
  selectedPrograms = [];
  dataLoaded = false;
  subscription: Subscription;
  @ViewChild("selection") selectionList;
  tableHeaders = _Choose_Program_Constants.programInfo;
  stepId = _Application_StepIds.choose_programs;
  constructor(
    private myApplicationService: ApplicationService,
    private httpOptionService: HttpoptionsService
  ) {}

  ngOnInit() {
    this.getApplicationPrograms();
    this.subscription = this.myApplicationService._next_click_submit.subscribe(
      value => {
        if (value) {
          this.onSave();
        }
      }
    );
  }

  getApplicationPrograms() {
    this.applicationPrograms = [];
    this.myApplicationService.getApplicationPrograms().subscribe(
      response => {
        this.dataLoaded = true;
        this.applicationPrograms = response;
        setTimeout(() => {
          this.selectionChanged(0, this.selectionList.selectedOptions.selected);
        }, 150);
      },
      error => {
        this.httpOptionService.handleError(error);
      }
    );
  }

  onSave() {
    this.postApplicationPrograms(this.selectedPrograms);
  }

  selectionChanged(event: number, value: any) {
    this.selectedPrograms = [];
    value.forEach(element => {
      this.selectedPrograms.push(element.value);
    });
    this.checkifValid();
  }

  postApplicationPrograms(body: any[]) {
    this.myApplicationService.postApplicationPrograms(body).subscribe(
      response => {
        this.myApplicationService.checkStepTrackerId(
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
    this.myApplicationService.setOnClickNext(false);
  }

  checkifValid() {
    if (this.selectedPrograms.length != 0) {
      this.myApplicationService.setEnableNextClick(true);
    } else {
      this.myApplicationService.setEnableNextClick(false);
    }
  }
}
