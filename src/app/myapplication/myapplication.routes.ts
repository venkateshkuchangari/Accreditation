import { Routes } from "@angular/router";
import { ApplicationComponent } from "./myapplication.component";
import { ApplicationLandingComponent } from "./application-landing/application-landing.component";
import { _Menu_items } from "../shared/application-constants";
import { MenuAccessGaurd } from "../shared/access-gaurd/access-gaurd.service";
import { ApplicationProcessComponent } from "./application-process/application-process.component";
import { MyFacilityListComponent } from "../myfacility/facility-list/myfacility-list.component";
export const ApplicationRoutes: Routes = [
  {
    path: "",
    component: ApplicationComponent,
    canActivate: [MenuAccessGaurd],
    data: { menuId: _Menu_items.application },
    children: [
      {
        path: "application-facilities/:modeid",
        canLoad: [MenuAccessGaurd],
        data: { menuId: _Menu_items.create_application },
        children: [
          {
            path: "",
            component: ApplicationProcessComponent,
            canActivate: [MenuAccessGaurd],
            data: { menuId: _Menu_items.create_application },
            children: [
              {
                path: "",
                component: MyFacilityListComponent,
                canActivate: [MenuAccessGaurd],
                data: { menuId: _Menu_items.create_application }
              }
            ]
          }
        ]
      },
      {
        path: "appmaster/:appid",
        loadChildren:
          "./application-process/application-process.module#ApplicationProcessModule",
        canLoad: [MenuAccessGaurd],
        data: { menuId: _Menu_items.inprogress_applications }
      },
      {
        path: "",
        component: ApplicationLandingComponent,
        canActivate: [MenuAccessGaurd],
        data: { menuId: _Menu_items.application }
      }
    ]
  }
];
