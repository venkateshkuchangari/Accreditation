import { Routes } from "@angular/router";
import { ApplicationProcessComponent } from "./application-process.component";
import { ApplicationMasterComponent } from "./application-master/application-master.component";
import { StatementAgreementComponent } from "./statement-agreement/statement-agreement.component";
import { OwnershipQuestionComponent } from "./ownership-question/ownership-question.component";
import { MyFacilityOwnershipComponent } from "src/app/myfacility/facility-profile/ownership/myfacility-ownership.component";
import { MyFacilityListComponent } from "src/app/myfacility/facility-list/myfacility-list.component";
import { MyFacilityInfoComponent } from "src/app/myfacility/facility-profile/facility-info/myfacility-info.component";
import { MyFacilityContactsComponent } from "src/app/myfacility/facility-profile/facility-contacts/myfacility-contacts.component";
import { FacilityLicenseComponent } from "../../myfacility/facility-profile/facility-license/facility-license.component";
import { StaffLicenseComponent } from "../../myfacility/facility-profile/staff-license/staff-license.component";
import { ApplicationQuestionsComponent } from "./application-questions/application-questions.component";
import { ChooseProgramsComponent } from "./choose-programs/choose-programs.component";
import { _Menu_items } from "src/app/shared/application-constants";
import { MenuAccessGaurd } from "src/app/shared/access-gaurd/access-gaurd.service";
import { ProgramQuestionsComponent } from "./program-questions/program-questions.component";
import { ReviewCartComponent } from "./review-cart/review-cart.component";
import { DisciplinaryQuestionsComponent } from "./disciplinary-questions/disciplinary-questions.component";

export const ApplicationProcessRoutes: Routes = [
  {
    path: "",
    component: ApplicationMasterComponent,
    canActivate: [MenuAccessGaurd],
    canActivateChild: [MenuAccessGaurd],
    data: { menuId: _Menu_items.inprogress_applications },
    children: [
      {
        path: "fac-review/:modeid",
        component: MyFacilityInfoComponent,
        data: { menuId: _Menu_items.inprogress_applications }
      },
      {
        path: "contact-review",
        component: MyFacilityContactsComponent,
        data: { menuId: _Menu_items.inprogress_applications }
      },
      {
        path: "owner-question",
        component: OwnershipQuestionComponent,
        data: { menuId: _Menu_items.inprogress_applications }
      },
      {
        path: "own-review",
        component: MyFacilityOwnershipComponent,
        data: { menuId: _Menu_items.inprogress_applications }
      },
      {
        path: "faclicense-review",
        component: FacilityLicenseComponent,
        data: { menuId: _Menu_items.inprogress_applications }
      },
      {
        path: "stafflicense-review",
        component: StaffLicenseComponent,
        data: { menuId: _Menu_items.inprogress_applications }
      },
      {
        path: "disciplinary-questions",
        component: DisciplinaryQuestionsComponent,
        data: { menuId: _Menu_items.inprogress_applications }
      },
      {
        path: "application-questions",
        component: ApplicationQuestionsComponent,
        data: { menuId: _Menu_items.inprogress_applications }
      },
      {
        path: "choose-programs",
        component: ChooseProgramsComponent,
        data: { menuId: _Menu_items.inprogress_applications }
      },
      {
        path: "program-questions",
        component: ProgramQuestionsComponent,
        data: { menuId: _Menu_items.inprogress_applications }
      },
      {
        path: "cart",
        component: ReviewCartComponent,
        data: { menuId: _Menu_items.inprogress_applications }
      }
    ]
  }
];
