import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ApiEndpoints } from "../shared/apiendpoints";
import { HttpoptionsService } from "../shared/httpoptions.service";
import { PaymentResponse, CartObject } from "./make-payment/make-payment.model";

@Injectable({
  providedIn: "root"
})
export class PaymentService {
  private applicationId: number;
  private paymentResponse: PaymentResponse;
  private applicationCartData: CartObject;

  constructor(
    private http: HttpClient,
    private httpoptionsservice: HttpoptionsService
  ) {}

  _toolbar_display_header = new BehaviorSubject<any>("");
  get_tool_bar_header = this._toolbar_display_header.asObservable();

  setToolBarHeader(data: any) {
    this._toolbar_display_header.next(data);
  }

  setApplicationId(id: any) {
    this.applicationId = id;
  }

  getApplicationId() {
    return this.applicationId;
  }

  setReviewCartItemsData(data: CartObject) {
    this.applicationCartData = data;
  }

  getReviewCartItemsData(): CartObject {
    return this.applicationCartData;
  }

  savePaymentResponse(body: PaymentResponse) {
    this.paymentResponse = body;
  }

  getPaymentResponse(): PaymentResponse {
    return this.paymentResponse;
  }

  getApplicationCartItems(): Observable<any> {
    return this.http.get(
      ApiEndpoints.get_application_cart_items(this.applicationId),
      this.httpoptionsservice.gethttpOptions()
    );
  }

  getApplicationBillingLocation(): Observable<any> {
    return this.http.get(
      ApiEndpoints.get_application_billing_locations(this.applicationId),
      this.httpoptionsservice.gethttpOptions()
    );
  }

  verifyTransaction(): Observable<any> {
    return this.http.get(
      ApiEndpoints.verify_payment_transaction(this.applicationId),
      this.httpoptionsservice.gethttpOptions()
    );
  }

  makePaymentTransaction(body: any): Observable<any> {
    return this.http.post(
      ApiEndpoints.make_payment_transaction(this.applicationId),
      body,
      this.httpoptionsservice.gethttpOptions()
    );
  }
}
