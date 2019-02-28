import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard.routing.module";
import { HeaderComponent } from "../template/header/header.component";
import { FooterComponent } from "../template/footer/footer.component";
import { DashboardMenuComponent } from "./menu/dashboard-menu.component";
import { SharedModule } from "../shared/shared.module";
import { DashboardService } from "./services/dashboard.service";
import { ContactModalComponent } from "../myfacility/facility-profile/facility-contacts/contact-modal/contact-modal.component";
import { UserprofileComponent } from "../userprofile/userprofile.component";
import { UsercontactmodalComponent } from "../userprofile/usercontactmodal/usercontactmodal.component";
import { UserAlertsComponent } from "../user-alerts/user-alerts.component";
import { ServiceTermsModalComponent } from './service-terms-modal/service-terms-modal.component';

@NgModule({
  imports: [CommonModule, SharedModule, DashboardRoutingModule],
  declarations: [
    DashboardComponent,
    DashboardMenuComponent,
    HeaderComponent,
    FooterComponent,
    ContactModalComponent,
    UserprofileComponent,
    UsercontactmodalComponent,
    UserAlertsComponent,
    ServiceTermsModalComponent,
  ],
  exports: [
    DashboardComponent,
    ContactModalComponent,
    UsercontactmodalComponent
  ],
  providers: [DashboardService],
  entryComponents: [ContactModalComponent,ServiceTermsModalComponent,UsercontactmodalComponent]
})
export class DashboardModule {}
