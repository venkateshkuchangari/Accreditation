import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyFacilityComponent } from './myfacility.component';
import { MyFacilityRoutingModule } from './myfacility.routing.module';
import { MyFacilityDetailComponent } from './facility-profile/myfacility-details.component';
import { SharedModule } from '../shared/shared.module';
import { MyFacilityService } from './services/myfacility.service';
import { AppMaterialModule } from '../shared/appmaterial.module';
import { FacilityApplicationsComponent } from './facility-profile/facility-applications/facility-applications.component';


@NgModule({
  imports: [
    CommonModule,
    MyFacilityRoutingModule,
    SharedModule,
    AppMaterialModule,
  ],
  declarations: [
    MyFacilityComponent,
    MyFacilityDetailComponent,
    FacilityApplicationsComponent,
   
      ],
  entryComponents: [],
  exports: [],
  providers: [MyFacilityService]

})
export class MyFacilityModule { }
