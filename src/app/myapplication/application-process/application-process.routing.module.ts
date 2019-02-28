import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationProcessRoutes } from './application-process.routes';


@NgModule({
  imports: [
    RouterModule.forChild(ApplicationProcessRoutes)
  ],
  exports:[RouterModule]
})
export class ApplicationProcessRoutingModule { }
