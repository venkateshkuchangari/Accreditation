import { Routes } from "@angular/router";
import { MenuAccessGaurd } from "../shared/access-gaurd/access-gaurd.service";
import { _Menu_items } from "../shared/application-constants";
import { PaymentComponent } from "./payment.component";
import { MakePaymentComponent } from "./make-payment/make-payment.component";
import { PaymentConfirmationComponent } from "./payment-confirmation/payment-confirmation.component";

export const PaymentRoutes: Routes = [
  {
    path: "",
    component: PaymentComponent,
    children: [
        {
          path: "make-payment/:appId",
          component: MakePaymentComponent,         
        },
        {
          path: "confirm-payment",
          component: PaymentConfirmationComponent,         
        }]
    }
];
