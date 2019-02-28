import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyFacilityRoutes } from './myfacility.routes';


@NgModule({
  imports: [
    RouterModule.forChild(MyFacilityRoutes)
  ],
  exports:[RouterModule]
})
export class MyFacilityRoutingModule { }
