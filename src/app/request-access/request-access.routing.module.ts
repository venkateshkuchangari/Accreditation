import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RequestAccsssRoutes } from "./request-access.routes";

@NgModule({
  imports: [RouterModule.forChild(RequestAccsssRoutes)],
  exports: [RouterModule]
})
export class RequestAccessRoutingModule {}
