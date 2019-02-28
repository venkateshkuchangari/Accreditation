import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { PaymentService } from "../payment.service";
import {
  _Choose_Program_Constants,
  Calendar_Months,
  Payment_Types,
  Payment_Type_Ids,
  _Input_Regex
} from "src/app/shared/application-constants";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  MyErrorStateMatcher,
  formValidations
} from "src/app/shared/form-validations";
import { LookupService } from "src/app/shared/lookup.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import {
  PaymentObject,
  Item,
  ApplicationCartItem,
  OrderLineItem,
  PaymentFormObject,
  BillToAddress,
  CartObject
} from "./make-payment.model";
import { AuthService } from "src/app/auth/services/auth.service";
import { HttpoptionsService } from "src/app/shared/httpoptions.service";
import { ModalService } from "src/app/shared/modal/modal.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-make-payment",
  templateUrl: "./make-payment.component.html",
  styleUrls: ["./make-payment.component.scss"]
})
export class MakePaymentComponent implements OnInit, OnDestroy {
  matcher = new MyErrorStateMatcher();
  cartObject: CartObject;
  cartItems: ApplicationCartItem[];
  totalPrice: number;
  discountedPrice: number;
  dataLoaded: boolean;
  appliedPaymentCodes: string;
  billingLocations: any = [];
  hierarchyList: any = [];
  countryList = [];
  statesList = [];
  selectedFacility: any;
  applicationId: number;
  calendarMonths = Calendar_Months;
  calendarYears = [];
  paymentTypes = [];
  ccImgUrl: string = "";
  currentYear = new Date().getFullYear();
  paymentObject = new PaymentObject();
  subscription:Subscription;

  billingLocationForm = new FormGroup({
    billingLocationId: new FormControl("", [Validators.required])
  });

  paymentForm = new FormGroup({
    firstName: formValidations.FirstName,
    middleName: formValidations.MiddleName,
    lastName: formValidations.LastName,
    creditCardType: new FormControl("", [Validators.required]),
    creditCardNumber: new FormControl("", [Validators.required]),
    expirationMonth: new FormControl("", [Validators.required]),
    expirationYear: new FormControl("", [Validators.required]),
    cardCvv: new FormControl("", [
      Validators.required,
      Validators.pattern(_Input_Regex.cvv_regex)
    ]),
    cardPhoneNumber: formValidations.PrimaryPhone,
    billingAddress1: formValidations.Address1,
    billingAddress2: formValidations.Address2,
    billingCity: formValidations.City,
    billingCountry: formValidations.CountryId,
    billingState: formValidations.StateId,
    billingZipCode: formValidations.ZipCode
  });

  constructor(
    private paymentService: PaymentService,
    private lookUpService: LookupService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private httpOptionService: HttpoptionsService,
    private modalService: ModalService
  ) {}

  ngOnInit() {   
    this.subscription=this.activatedRoute.params.subscribe((params: Params) => {
      this.applicationId = params["appId"];
      this.paymentService.setApplicationId(this.applicationId);
    });
    this.paymentService.setToolBarHeader("Make Payment");
    this.calendarYears = Array.from(Array(11), (_, x) => x + this.currentYear);
    this.getCartItems();
    this.getBillingLocations();
    this.lookUpService.get_lookup_countryList.subscribe(data => {
      this.countryList = [...data];
    });
    this.getPaymentTypes();
  }

  getCartItems() {
    this.cartObject = this.paymentService.getReviewCartItemsData();
    if (
      !this.cartObject ||
      this.applicationId != this.cartObject.parentApplicationId
    ) {
      this.router.navigate([
        "/dashboard/myapplications/appmaster",
        this.applicationId
      ]);
    } else {
      this.processResponse(this.cartObject);
    }
  }

  processResponse(response: CartObject) {
    this.cartItems = response.applicationFeeDetails;
    this.totalPrice = response.totalFee;
    this.discountedPrice = response.discountedTotalFee;
    this.paymentObject.applicationId = response.parentApplicationId;
    if (response.discountCodeUsage) {
      this.paymentForm.disable();
      this.appliedPaymentCodes =
        response.discountCodeUsage.paymentDiscountCodeName;
      this.paymentObject.Payment.PaymentTypeId = Payment_Type_Ids.payment_code;
    } else {
      this.paymentForm.enable();
    }
    this.dataLoaded = true;
    this.mapCartItems();
  }

  mapCartItems() {
    this.paymentObject.userName = this.authService.get_loggedin_username();
    this.paymentObject.balanceDue = this.cartObject.totalFee;
    this.paymentObject.paymentDiscountCodeUsage = this.cartObject.discountCodeUsage;
    this.paymentObject.orderLineItems = this.cartItems.map(element => {
      let item = new Item();
      let orderItem = new OrderLineItem();
      item.applicationId = element.applicationId;
      item.applicationProgramTypeId = element.programTypeId;
      item.facilityId = element.facilityId;
      item.itemIdList = element.itemIds;
      item.itemTotal = element.applicationFee;
      item.discountedPrice = element.discountedApplicationFee;
      orderItem.item = item;
      orderItem.quantity = 1;
      return orderItem;
    });
  }

  getImageUrl(programTypeId: number) {
    let selectedProgram = _Choose_Program_Constants.programInfo.find(
      element => {
        return element.programId == programTypeId;
      }
    );
    return selectedProgram.programImage;
  }

  getBillingLocations() {
    this.paymentService.getApplicationBillingLocation().subscribe(
      response => {
        let response1 = response;
        this.billingLocations = response1.reverse();
        this.updateHierarchyList();
      },
      error => {
        this.httpOptionService.handleError(error);
      }
    );
  }

  changeFacilitySelection(event: any) {
    let result = this.billingLocations.find(element => {
      return element.organizationID == event;
    });
    this.selectedFacility = result;
    this.paymentObject.billingOrganizationId = this.selectedFacility.organizationID;
  }

  updateHierarchyList() {
    this.billingLocations.forEach(element => {
      let step = 0;
      this.getHierarchy(element, step);
    });
  }

  getHierarchy(element: any, step: number) {
    let pElement: any;
    let id = element.parentOrganizationID;
    if (id != null) {
      pElement = this.billingLocations.find(element => {
        return element.organizationID === id;
      });
      if (pElement != undefined) {
        this.getHierarchy(pElement, ++step);
      } else {
        this.hierarchyList.push(step);
      }
    } else {
      this.hierarchyList.push(step);
    }
  }

  getStates(countryId: number) {
    this.paymentForm.controls["billingState"].reset();
    this.statesList = this.lookUpService.get_lookup_statesList(countryId);
  }

  getPaymentTypes() {
    this.lookUpService.getPaymentTypes().subscribe(
      response => {
        this.paymentTypes = response;
      },
      error => {}
    );
  }

  paymentTypeChange(value: number) {
    this.paymentForm.get("creditCardNumber").reset();
    this.paymentForm.get("expirationMonth").reset();
    this.paymentForm.get("expirationYear").reset();
    this.paymentForm.get("cardCvv").reset();
    if (
      value == Payment_Type_Ids.visa ||
      value == Payment_Type_Ids.master ||
      value == Payment_Type_Ids.amex
    ) {
      this.getCCImageUrl(value);
    }
  }

  getCCImageUrl(value: number) {
    let selectedCard = Payment_Types.find(element => {
      return element.id == value;
    });
    this.ccImgUrl = selectedCard.url;
    this.paymentForm
      .get("creditCardNumber")
      .setValidators([
        Validators.pattern(selectedCard.regEx),
        Validators.required
      ]);
  }

  submitPayment() {
    this.verifyTransaction();
    if (!this.cartObject.discountCodeUsage) {
      let paymentFormValue: PaymentFormObject = this.paymentForm.value;
      let billingAddress = new BillToAddress();
      this.paymentObject.Payment.FirstName = paymentFormValue.firstName;
      this.paymentObject.Payment.MiddleName = paymentFormValue.middleName;
      this.paymentObject.Payment.LastName = paymentFormValue.lastName;
      this.paymentObject.Payment.PaymentTypeId =
        paymentFormValue.creditCardType;
      this.paymentObject.Payment.AccountNumber =
        paymentFormValue.creditCardNumber;
      this.paymentObject.Payment.ExpirationMonth =
        paymentFormValue.expirationMonth;
      this.paymentObject.Payment.ExpirationYear =
        paymentFormValue.expirationYear;
      this.paymentObject.Payment.Cvv = paymentFormValue.cardCvv;
      this.paymentObject.Payment.PaymentAdditionalDetails.PaymentPhoneNumber =
        paymentFormValue.cardPhoneNumber;
      billingAddress.AddressId = 0;
      billingAddress.AddressLine1 = paymentFormValue.billingAddress1;
      billingAddress.AddressLine2 = paymentFormValue.billingAddress2;
      billingAddress.City = paymentFormValue.billingCity;
      billingAddress.CountryId = paymentFormValue.billingCountry;
      billingAddress.State = paymentFormValue.billingState;
      billingAddress.ZipOrPostalCode = paymentFormValue.billingZipCode;
      this.paymentObject.Payment.BillToAddress = billingAddress;
    }
    console.log(JSON.stringify(this.paymentObject));
  }

  verifyTransaction() {
    this.paymentService.verifyTransaction().subscribe(
      response => {
        this.makePaymentTransaction();
      },
      error => {
        if (error.status == 409) {
          this.modalService.confirm(
            "Payment for this application has already recieved.",
            `Warning!! Duplicate Transaction`,
            () => {
              this.router.navigate(["/dashboard/myapplications"]);
            }
          );
        } else {
          this.httpOptionService.handleError(error);
        }
      }
    );
  }

  makePaymentTransaction() {
    this.paymentService.makePaymentTransaction(this.paymentObject).subscribe(
      response => {
        this.paymentService.savePaymentResponse(response);      
        this.router.navigate(["/dashboard/payment/confirm-payment"]);
      },
      error => {
        this.httpOptionService.handleError(error);
      }
    );
  }

  resetFormData() {
    this.paymentForm.reset();
    this.billingLocationForm.reset();
  }

  ngOnDestroy(){
    this.resetFormData();
    this.subscription.unsubscribe();
  }
}
