import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PaymentRoutes } from "./payment.routes";

@NgModule({
  imports: [RouterModule.forChild(PaymentRoutes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule {}
