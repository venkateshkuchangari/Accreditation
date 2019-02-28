import { Component, OnInit, Inject, Input, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  formValidations,
  MyErrorStateMatcher
} from "../../../../../shared/form-validations";
import { ChiplistinputComponent } from "src/app/shared/chiplistinput/chiplistinput.component";

@Component({
  selector: "app-details-tab-modal",
  templateUrl: "./details-tab-modal.component.html",
  styleUrls: ["./details-tab-modal.component.scss"]
})
export class DetailsTabModalComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  inputDbaChips = [];
  inputFkaChips = [];
  @ViewChild("dbaInput")
  private dbachildComponent: ChiplistinputComponent;
  @ViewChild("fkaInput")
  private fkachildComponent: ChiplistinputComponent;

  constructor(
    public dialogRef: MatDialogRef<DetailsTabModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  addressForm = new FormGroup({
    phoneNumber: formValidations.PrimaryPhone,
    extension: formValidations.PrimaryExtension,
    email: formValidations.Email,
    faxNumber: formValidations.faxNumber,
    faxExtension: formValidations.SecondaryExtension,
    website: formValidations.website
  });
  organizationForm = new FormGroup({
    storeNumber: formValidations.StoreNumber,
    fein: formValidations.FeinNumber,
    npiNumber: formValidations.NpiNumbers,
    ncpdpNumber: formValidations.NcpdpNumbers,
    dbAs: formValidations.dbAs,
    fkAs: formValidations.fkAs,
    primaryDBA: formValidations.primaryDba
  });
  ngOnInit() {
    if (this.data.id == 1) {
      this.inputDbaChips = this.data.org_details.dbaList;
      this.inputFkaChips = this.data.org_details.fkaList;
      this.organizationForm.patchValue({
        storeNumber: this.data.org_details.storeNumber,
        fein: this.data.org_details.feinNumber,
        npiNumber: this.data.org_details.npiNumber,
        ncpdpNumber: this.data.org_details.ncpdpNumber,
        dbAs: this.data.org_details.dbaList,
        fkAs: this.data.org_details.fkaList,
        primaryDBA: this.data.org_details.primaryDBA
      });
      Object.keys(this.organizationForm.controls).forEach(key => {
        this.organizationForm.get(key).markAsDirty();
      });
      if (
        this.data.org_details.feinNumber != null &&
        this.data.org_details.feinNumber != ""
      ) {
        this.organizationForm.controls["fein"].disable();
      } else {
        this.organizationForm.controls["fein"].enable();
      }
    } else if (this.data.id == 2) {
      this.addressForm.patchValue({
        phoneNumber: this.data.phone.phoneNumber,
        extension: this.data.phone.extension,
        faxNumber: this.data.fax.phoneNumber,
        email: this.data.email,
        website: this.data.website
      });

      Object.keys(this.addressForm.controls).forEach(key => {
        this.addressForm.get(key).markAsDirty();
      });
    }
  }
  onClose() {
    this.organizationForm.reset();
    this.addressForm.reset();
    this.dialogRef.close();
  }

  onSave(form: FormGroup) {
    this.dialogRef.close(form.getRawValue());
    form.reset();
  }

  getDBAvaluesfromChild(value) {
    this.organizationForm.controls["dbAs"].patchValue(value);
  }

  getFKAvaluesfromChild(value) {
    this.organizationForm.controls["fkAs"].patchValue(value);
  }

  onClear(form: FormGroup) {
    form.reset();
    if (this.data.id == 1) {
      this.dbachildComponent.clearAll();
      this.fkachildComponent.clearAll();
      this.organizationForm.controls["fein"].patchValue(
        this.data.org_details.feinNumber
      );
    }
  }
}
