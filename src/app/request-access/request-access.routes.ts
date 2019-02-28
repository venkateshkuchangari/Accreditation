import { Routes } from "@angular/router";
import { EprofileLandingComponent } from "./eprofile-landing/eprofile-landing.component";
import { EprofilerequestComponent } from "./eprofilerequest/eprofilerequest.component";
import { MenuAccessGaurd } from "../shared/access-gaurd/access-gaurd.service";
import { _Menu_items } from "../shared/application-constants";
import { RequestAccessComponent } from "./request-access.component";

export const RequestAccsssRoutes: Routes = [
  {
    path: "",
    component: RequestAccessComponent,
    canActivateChild: [MenuAccessGaurd],
    children: [
      {
        path: "make-request",
        component: EprofilerequestComponent,
        canActivate: [MenuAccessGaurd],
        data: { menuId: _Menu_items.request_eprofile_id }
      },
      {
        path: "",
        component: EprofileLandingComponent,
        canActivate: [MenuAccessGaurd],
        data: { menuId: _Menu_items.request_access }
      }
    ]
  }
];
