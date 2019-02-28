import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RequestAccessRoutingModule } from "./request-access.routing.module";
import { SharedModule } from "../shared/shared.module";
import { AppMaterialModule } from "../shared/appmaterial.module";
import { EprofileLandingComponent } from "./eprofile-landing/eprofile-landing.component";
import { RequestAccessService } from "./request-access.service";
import { EprofilerequestModalComponent } from "./eprofilerequest/eprofilerequest-modal/eprofilerequest-modal.component";
import { EprofilerequestComponent } from "./eprofilerequest/eprofilerequest.component";
import { RequestAccessComponent } from "./request-access.component";

@NgModule({
  imports: [
    CommonModule,
    RequestAccessRoutingModule,
    SharedModule,
    AppMaterialModule
  ],
  declarations: [
    RequestAccessComponent,
    EprofileLandingComponent,
    EprofilerequestComponent,
    EprofilerequestModalComponent
  ],
  providers: [RequestAccessService],
  entryComponents: [EprofilerequestModalComponent]
})
export class RequestAccessModule {}
