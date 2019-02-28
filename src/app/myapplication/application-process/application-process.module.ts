import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared/shared.module";
import { ApplicationProcessRoutingModule } from "./application-process.routing.module";
import { ApplicationMasterComponent } from "./application-master/application-master.component";
import { OwnershipQuestionComponent } from "./ownership-question/ownership-question.component";
import { ApplicationQuestionsComponent } from "./application-questions/application-questions.component";
import { ChooseProgramsComponent } from "./choose-programs/choose-programs.component";
import { ProgramQuestionsComponent } from "./program-questions/program-questions.component";
import { VppQuestionsComponent } from "./program-questions/vpp-questions/vpp-questions.component";
import { ApplicationMasterModalComponent } from "./application-master/application-master-modal/application-master-modal.component";
import { ReviewCartComponent } from './review-cart/review-cart.component';
import { AttestationModalComponent } from './attestation-modal/attestation-modal.component';
import { DisciplinaryQuestionsComponent } from "./disciplinary-questions/disciplinary-questions.component";

@NgModule({
  imports: [CommonModule, ApplicationProcessRoutingModule, SharedModule],
  declarations: [
    ApplicationMasterComponent,
    OwnershipQuestionComponent,
    DisciplinaryQuestionsComponent,
    ApplicationQuestionsComponent,
    ChooseProgramsComponent,
    ProgramQuestionsComponent,
    VppQuestionsComponent,
    ApplicationMasterModalComponent,
    ReviewCartComponent,
    AttestationModalComponent
  ],
  entryComponents: [ApplicationMasterModalComponent,AttestationModalComponent]
})
export class ApplicationProcessModule {}
