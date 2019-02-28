import { Routes } from "@angular/router";
import { AuthGuard } from "../auth/services/auth-guard.service";
import { MyFacilityListComponent } from "./facility-list/myfacility-list.component";
import { MyFacilityDetailComponent } from "./facility-profile/myfacility-details.component";
import { MyFacilityOwnershipComponent } from "./facility-profile/ownership/myfacility-ownership.component";
import { FacilityLicenseComponent } from "./facility-profile/facility-license/facility-license.component";
import { StaffLicenseComponent } from "./facility-profile/staff-license/staff-license.component";
import { FacilityApplicationsComponent } from "./facility-profile/facility-applications/facility-applications.component";
import { MyFacilityInfoComponent } from "./facility-profile/facility-info/myfacility-info.component";
import { MyFacilityContactsComponent } from "./facility-profile/facility-contacts/myfacility-contacts.component";
import { _Menu_items } from "../shared/application-constants";
import { MenuAccessGaurd } from "../shared/access-gaurd/access-gaurd.service";

export const MyFacilityRoutes: Routes = [
  {
    path: "",
    component: MyFacilityListComponent
  },
  {
    path: "detail-info/:id",
    component: MyFacilityDetailComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: "",
        component: MyFacilityInfoComponent,
        canActivate: [MenuAccessGaurd],
        data: { menuId: _Menu_items.facility_info }
      },
      {
        path: "contacts",
        component: MyFacilityContactsComponent,
        canActivate: [MenuAccessGaurd],
        data: { menuId: _Menu_items.org_contact }
      },
      {
        path: "ownership",
        component: MyFacilityOwnershipComponent,
        canActivate: [MenuAccessGaurd],
        data: { menuId: _Menu_items.ownership }
      },
      {
        path: "facilityLicense",
        component: FacilityLicenseComponent,
        canActivate: [MenuAccessGaurd],
        data: { menuId: _Menu_items.facility_licenses }
      },
      {
        path: "individualLicense",
        component: StaffLicenseComponent,
        canActivate: [MenuAccessGaurd],
        data: { menuId: _Menu_items.staff_licenses }
      },
      {
        path: "fac_application",
        component: FacilityApplicationsComponent,
        canActivate: [MenuAccessGaurd],
        data: { menuId: _Menu_items.org_applications }
      }
    ]
  }
];
