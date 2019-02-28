import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { DashboardMenuComponent } from "./menu/dashboard-menu.component";
import { AuthGuard } from "../auth/services/auth-guard.service";
import { UserprofileComponent } from "../userprofile/userprofile.component";
import { _Menu_items } from "../shared/application-constants";
import { MenuAccessGaurd } from "../shared/access-gaurd/access-gaurd.service";
import { UserAlertsComponent } from "../user-alerts/user-alerts.component";

export const dashboardRoutes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: "",
        component: DashboardMenuComponent
      },

      {
        path: "myfacility/:modeid",
        loadChildren: "../myfacility/myfacility.module#MyFacilityModule",
        canLoad: [MenuAccessGaurd],
        data: { menuId: _Menu_items.my_facilities }
      },
      {
        path: "myapplications",
        loadChildren: "../myapplication/myapplication.module#ApplicationModule",
        canLoad: [MenuAccessGaurd],
        data: { menuId: _Menu_items.application }
      },
      {
        path: "request-access",
        loadChildren:
          "../request-access/request-access.module#RequestAccessModule",
        canLoad: [MenuAccessGaurd],
        data: { menuId: _Menu_items.request_access }
      },
      {
        path: "user-profile",
        component: UserprofileComponent,
        canActivate: [MenuAccessGaurd],
        data: { menuId: _Menu_items.account_details }
      },
      {
        path: "payment",
        loadChildren:"../payment/payment.module#PaymentModule"
      },
      {
        path: "alerts/:alertid",
        component: UserAlertsComponent,
        canActivate: [MenuAccessGaurd],
        data: { menuId: _Menu_items.org_applications}
      }
    ]
  }
];
