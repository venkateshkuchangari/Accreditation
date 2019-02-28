import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApplicationRoutingModule } from "./myapplication.routing.module";
import { SharedModule } from "../shared/shared.module";
import { ApplicationComponent } from "./myapplication.component";
import { ApplicationLandingComponent } from "./application-landing/application-landing.component";
import { ApplicationProcessComponent } from "./application-process/application-process.component";
import { StatementAgreementComponent } from "./application-process/statement-agreement/statement-agreement.component";
import { ApplicationLandingModalComponent } from "./application-landing/application-landing-modal/application-landing-modal.component";

@NgModule({
  imports: [CommonModule, ApplicationRoutingModule, SharedModule],
  declarations: [
    ApplicationComponent,
    ApplicationLandingComponent,
    ApplicationProcessComponent,
    StatementAgreementComponent,
    ApplicationLandingModalComponent,
  ],
  entryComponents: [
    StatementAgreementComponent,
    ApplicationLandingModalComponent,
  ]
})

export class ApplicationModule {}
