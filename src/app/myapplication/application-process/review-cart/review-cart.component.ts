import { Component, OnInit } from "@angular/core";
import { ApplicationService } from "../../myapplication.service";
import {
  _Program_Type_Ids,
  _Choose_Program_Constants,
  Application_Confirm_Message,
  _Application_StepIds,
  _Input_Regex
} from "src/app/shared/application-constants";
import { ModalService } from "src/app/shared/modal/modal.service";
import { ApplicationMasterModalComponent } from "../application-master/application-master-modal/application-master-modal.component";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpoptionsService } from "src/app/shared/httpoptions.service";
import { CartObject } from "src/app/payment/make-payment/make-payment.model";
import { PaymentService } from "src/app/payment/payment.service";

@Component({
  selector: "app-review-cart",
  templateUrl: "./review-cart.component.html",
  styleUrls: ["./review-cart.component.scss"]
})
export class ReviewCartComponent implements OnInit {
  constructor(
    private myApplicationService: ApplicationService,
    private modalService: ModalService,
    private httpoptionsService: HttpoptionsService,
    private paymentService: PaymentService
  ) {}
  cartItems = [];
  dataLoaded: boolean = false;
  totalPrice: number;
  discountedPrice: number;
  appliedPaymentCodes;
  paymentCodeForm = new FormGroup({
    paymentCode: new FormControl("", [
      Validators.pattern(_Input_Regex.alpha_numeric_regex)
    ])
  });
  ngOnInit() {
    this.getCartItems();
  }

  getCartItems() {
    this.myApplicationService.getApplicationCartItems().subscribe(
      (response: CartObject) => {
        if (response.applicationFeeDetails.length == 0) {
          this.myApplicationService.checkStepTrackerId(
            _Application_StepIds.choose_programs,
            _Application_StepIds.choose_programs
          );
        } else {
          this.processResponse(response);
        }

        this.dataLoaded = true;
      },
      error => {
        this.httpoptionsService.handleError(error);
      }
    );
  }

  processResponse(response: CartObject) {
    this.cartItems = response.applicationFeeDetails;
    this.totalPrice = response.totalFee;
    this.discountedPrice = response.discountedTotalFee;
    this.paymentService.setReviewCartItemsData(response);
  }
  getImageUrl(programTypeId: number) {
    let selectedProgram = _Choose_Program_Constants.programInfo.find(
      element => {
        return element.programId == programTypeId;
      }
    );
    return selectedProgram.programImage;
  }

  deleteCartItem(facilityId: number, programTypeId: number) {
    this.myApplicationService
      .deleteChildApplicationCart(facilityId, programTypeId)
      .subscribe(
        response => {
          this.getCartItems();
        },
        error => {
          this.httpoptionsService.handleError(error);
        }
      );
  }

  openDeleteConfirmationModal(facilityId: number, programTypeId: number) {
    this.modalService.open(ApplicationMasterModalComponent, {
      width: "500px",
      data: {
        title: "Warning!!",
        message: Application_Confirm_Message.cart_delete_message,
        cancelButton: "Cancel",
        okButton: "Ok, Delete",
        onOkCallBack: () => {
          this.deleteCartItem(facilityId, programTypeId);
        },
        onCancelCallBack: () => {}
      }
    });
  }

  applyDiscountCode() {
    let discountCode = this.paymentCodeForm.controls["paymentCode"].value;
    if (discountCode) {
      this.myApplicationService
        .getDiscountAppliedCartItems(discountCode)
        .subscribe(
          (response: CartObject) => {
            this.modalService.confirm(
              "Your Payment code is applied to your items in cart.Click next to proceed",
              `Success!! Payment Code Applied`,
              () => {
                this.appliedPaymentCodes = discountCode;
                this.processResponse(response);
                this.paymentCodeForm.reset();
              }
            );
          },
          error => {
            this.modalService.confirm(
              "Your Payment code is either used or expired. Please try again with another one",
              `Error!! Inavlid Payment Code`,
              () => {
                this.paymentCodeForm.reset();
              }
            );
          }
        );
    }
  }
}
