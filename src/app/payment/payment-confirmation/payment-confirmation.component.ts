import { Component, OnInit } from '@angular/core';
import { _Payment_Confirmation_Message } from 'src/app/shared/application-constants';
import { PaymentService } from '../payment.service';
import { PaymentResponse } from '../make-payment/make-payment.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-confirmation',
  templateUrl: './payment-confirmation.component.html',
  styleUrls: ['./payment-confirmation.component.scss']
})
export class PaymentConfirmationComponent implements OnInit {
  confirmationMessage=_Payment_Confirmation_Message;
  applicationId:number;
  paymentResponse:PaymentResponse
  dataLoaded:boolean=false;
  constructor(private paymentService:PaymentService,
    private router:Router) { }

  ngOnInit() {
    this.paymentService.setToolBarHeader("Payment Confirmation");
    this.applicationId=this.paymentService.getApplicationId()
    this.paymentResponse=this.paymentService.getPaymentResponse()
    if(this.paymentResponse && this.applicationId){
      this.dataLoaded=true;
    }else{
      this.router.navigate(['/dashboard'])
    }
  }

}
