import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationRoutes } from './myapplication.routes';


@NgModule({
  imports: [
    RouterModule.forChild(ApplicationRoutes)
  ],
  exports:[RouterModule]
})
export class ApplicationRoutingModule { }
