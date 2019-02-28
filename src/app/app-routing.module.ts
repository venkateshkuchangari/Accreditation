import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {routes} from './app.routes'
import { config } from 'rxjs';
import { AppLoaderIndicatorService } from './app-loader-indicator.service';


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers:[AppLoaderIndicatorService],
  exports:[RouterModule]
})
export class AppRoutingModule { }