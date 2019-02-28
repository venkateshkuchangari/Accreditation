import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { FormGroup } from "@angular/forms";
import { MyFacilityService } from "../../myfacility/services/myfacility.service";
import { LookupService } from "../../shared/lookup.service";
import {
  MyErrorStateMatcher,
  formValidations
} from "../../shared/form-validations";

@Component({
  selector: "app-usercontactmodal",
  templateUrl: "./usercontactmodal.component.html",
  styleUrls: ["./usercontactmodal.component.scss"]
})
export class UsercontactmodalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<UsercontactmodalComponent>,
    public snackBar: MatSnackBar,
    public myFacilityService: MyFacilityService,
    private lookUpService: LookupService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  matcher = new MyErrorStateMatcher();

  prefixList = [];
  countryList = [];
  statesList: any[]; 
  genderList = [];
  contactForm = new FormGroup({
    PrefixTypeID: formValidations.PrefixTypeID,
    Address2: formValidations.Address2,
    PrimaryExtension: formValidations.PrimaryExtension,
    SecondaryPhone: formValidations.SecondaryPhone,
    SecondaryExtension: formValidations.SecondaryExtension,
    ZipCode: formValidations.ZipCode,
    CountryId: formValidations.CountryId,
    City: formValidations.City,
    Address1: formValidations.Address1,
    StateId: formValidations.StateId,
    PrimaryPhone: formValidations.PrimaryPhone,
    genderTypeId: formValidations.usergenderTypeId
  });

  ngOnInit() {
    this.contactForm.controls["genderTypeId"].enable();
    this.lookUpService.get_lookup_prefixList.subscribe(data => {
      this.prefixList = data;
    });
    this.lookUpService.get_lookup_countryList.subscribe(data => {
      this.countryList = data;
    });
    this.lookUpService.get_lookup_genderList.subscribe(data => {
      this.genderList = data;
    });
    if (this.data) {
      this.getStates(this.data.countryId);
      this.contactForm.patchValue({
        PrefixTypeID: this.data.prefixTypeID,
        Address2: this.data.address2,
        PrimaryExtension: this.data.primaryExtension,
        SecondaryPhone: this.data.secondaryPhone,
        SecondaryExtension: this.data.secondaryExtension,
        ZipCode: this.data.zipCode,
        CountryId: this.data.countryId,
        City: this.data.city,
        Address1: this.data.address1,
        StateId: this.data.stateId,
        PrimaryPhone: this.data.primaryPhone,
        genderTypeId: this.data.genderTypeId
      });
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key).markAsDirty();
      });
      if (this.data.genderTypeId) {
        this.contactForm.controls["genderTypeId"].disable();
      }
    }
  }

  onClose() {
    this.dialogRef.close();
    this.contactForm.reset();
  }

  onUpdate() {
    this.dialogRef.close(this.contactForm.getRawValue());
    this.contactForm.reset();
  }

  onClear() {
    this.contactForm.reset();
    this.statesList = [];
    if (this.data) {
      this.contactForm.controls["genderTypeId"].patchValue(
        this.data.genderTypeId
      );
    }
  }

  getStates(countryId: number) {
    this.contactForm.controls["StateId"].reset();
    this.statesList = this.lookUpService.get_lookup_statesList(countryId);
  }
}
