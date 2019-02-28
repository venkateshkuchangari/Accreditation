import { Component, OnInit } from "@angular/core";
import { PaymentService } from "./payment.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.scss"]
})
export class PaymentComponent implements OnInit {
  _toolbar_header: string;
  subscription:Subscription;
  constructor(private paymentService: PaymentService, private router: Router) {}

  ngOnInit() {
   this.subscription= this.paymentService.get_tool_bar_header.subscribe(data => {     
      this._toolbar_header = data;
    });
  }

  goBacktoApplication() {
    let appId = this.paymentService.getApplicationId();
    this.router.navigate(["/dashboard/myapplications/appmaster", appId]);
  }

  ngOnDestroy(){
   this.subscription.unsubscribe() 
  }
}
