import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApplicationService } from "src/app/myapplication/myapplication.service";
import { HttpoptionsService } from "src/app/shared/httpoptions.service";
import {
  _Question_Categories,
  _Application_StepIds,
  _Program_Type_Ids,
  Program_Questions_VPP_Message
} from "src/app/shared/application-constants";
import { Subscription } from "rxjs";
import { ModalService } from "src/app/shared/modal/modal.service";
import { ApplicationMasterModalComponent } from "../../application-master/application-master-modal/application-master-modal.component";

@Component({
  selector: "app-vpp-questions",
  templateUrl: "./vpp-questions.component.html",
  styleUrls: ["./vpp-questions.component.scss"]
})
export class VppQuestionsComponent implements OnInit {
  categoryId = _Question_Categories.vpp;
  stepId = _Application_StepIds.prog_questions_vpp;
  programTypeId = _Program_Type_Ids.vpp;
  vppQuestions = [];
  answerResponse = [];
  subscription: Subscription;
  constructor(
    private activatedRoute: ActivatedRoute,
    private myapplicationService: ApplicationService,
    private httpOptionsService: HttpoptionsService,
    private modalService: ModalService
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
    this.vppQuestions = [];
    if (this.myapplicationService.OrganisationId == undefined) {
      setTimeout(() => {
        this.getCategeoryQuestions();
      }, 300);
    } else {
      this.myapplicationService.getCategoryQuestions(this.categoryId).subscribe(
        response => {
          this.vppQuestions = response;
        },
        error => {
          this.httpOptionsService.handleError(error);
        }
      );
    }
  }

  answerFromChild(value) {
    this.answerResponse = value;
    this.postvppQuestions(this.answerResponse);
  }

  postvppQuestions(data) {
    this.myapplicationService.saveVPPQuestions(data).subscribe(
      response => {
        if (response.deleteChildApplicationConfirmation == true) {
          this.openVppAttestationDialog();
        } else {
          this.myapplicationService.navigateThroughProgramQuestions(
          this.programTypeId
          );
        }
      },
      error => {
        this.httpOptionsService.handleError(error);
      }
    );
  }

  openVppAttestationDialog() {
    this.modalService.open(ApplicationMasterModalComponent, {
      width: "500px",
      data: {
        title: "Attestation",
        message: Program_Questions_VPP_Message.vpp_message,
        cancelButton: "Close",
        okButton: "Ok, Delete",
        onOkCallBack: () => {
          this.deleteChildApplication();
        },
        onCancelCallBack: () => {}
      }
    });
  }

  deleteChildApplication() {
    this.myapplicationService
      .deleteChildApplication(this.programTypeId)
      .subscribe(
        response => {        
          this.myapplicationService.navigateThroughProgramQuestions(
            this.programTypeId
            );
        },
        error => {
          this.httpOptionsService.handleError(error);
        }
      );
  }
}
