import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dashboardRoutes } from './dashboard.routes';


@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes)
  ],
  exports:[RouterModule]
})
export class DashboardRoutingModule { }
