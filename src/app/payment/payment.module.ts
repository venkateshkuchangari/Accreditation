import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { AppMaterialModule } from "../shared/appmaterial.module";
import { PaymentRoutingModule } from "./payment.routing.module";
import { PaymentComponent } from "./payment.component";
import { MakePaymentComponent } from './make-payment/make-payment.component';
import { PaymentConfirmationComponent } from './payment-confirmation/payment-confirmation.component';

@NgModule({
  imports: [
    CommonModule,
    PaymentRoutingModule,
    SharedModule,
    AppMaterialModule
  ],
  declarations: [PaymentComponent, MakePaymentComponent, PaymentConfirmationComponent],
  providers: [],
  entryComponents: []
})
export class PaymentModule {}
