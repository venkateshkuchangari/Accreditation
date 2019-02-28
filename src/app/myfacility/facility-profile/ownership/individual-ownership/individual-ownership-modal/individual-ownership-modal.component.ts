import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { LookupService } from "src/app/shared/lookup.service";
import { FormGroup, FormControl } from "@angular/forms";
import {
  formValidations,
  MyErrorStateMatcher
} from "src/app/shared/form-validations";

@Component({
  selector: "app-individual-ownership-modal",
  templateUrl: "./individual-ownership-modal.component.html",
  styleUrls: ["./individual-ownership-modal.component.scss"]
})
export class IndividualOwnershipModalComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  prefixList = [];
  suffixList = [];
  countryList = [];
  statesList = [];
  ownerRelationshipTypes = [];
  individualOwnerForm = new FormGroup({
    prefixTypeID: formValidations.PrefixTypeID,
    middleName: formValidations.MiddleName,
    suffixTypeID: formValidations.SuffixTypeID,
    address2: formValidations.Address2,
    primaryExtension: formValidations.PrimaryExtension,
    eprofileId: formValidations.EprofileId,
    zipCode: formValidations.ZipCode,
    firstName: formValidations.FirstName,
    lastName: formValidations.LastName,
    title: new FormControl(""),
    countryId: formValidations.CountryId,
    city: formValidations.City,
    address1: formValidations.Address1,
    stateId: formValidations.StateId,
    primaryPhone: formValidations.PrimaryPhone,
    percentOwned: formValidations.percentOwned,
    isPreviousOwner: formValidations.isPreviousOwner,
    relationshipId: formValidations.relationshipId
  });
  constructor(
    private dialogRef: MatDialogRef<IndividualOwnershipModalComponent>,
    private lookupService: LookupService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.lookupService.get_lookup_prefixList.subscribe(data => {
      this.prefixList = data;
    });
    this.lookupService.get_lookup_sufixList.subscribe(data => {
      this.suffixList = data;
    });
    this.lookupService.get_lookup_countryList.subscribe(data => {
      this.countryList = data;
    });
    this.getRelationshipTypes();
    if (this.data != null) {
      this.getStates(this.data.countryId);
      this.individualOwnerForm.patchValue({
        prefixTypeID: this.data.prefixTypeID,
        middleName: this.data.middleName,
        suffixTypeID: this.data.suffixTypeID,
        address2: this.data.address2,
        primaryExtension: this.data.primaryExtension,
        eprofileId: this.data.eprofileId,
        zipCode: this.data.zipCode,
        firstName: this.data.firstName,
        lastName: this.data.lastName,
        title: this.data.title,
        countryId: this.data.countryId,
        city: this.data.city,
        address1: this.data.address1,
        stateId: this.data.stateId,
        primaryPhone: this.data.primaryPhone,
        percentOwned: this.data.percentOwned,
        isPreviousOwner: this.data.isPreviousOwner,
        relationshipId: this.data.relationshipId
      });
      Object.keys(this.individualOwnerForm.controls).forEach(key => {
        this.individualOwnerForm.get(key).markAsDirty();
      });
    }
  }
  onClose() {
    this.dialogRef.close();
    this.individualOwnerForm.reset();
  }
  onClear() {
    this.statesList = [];
    this.individualOwnerForm.reset();
  }

  onSave() {
    this.dialogRef.close(this.individualOwnerForm.value);
    this.individualOwnerForm.reset();
  }

  getStates(countryId) {
    this.individualOwnerForm.controls["stateId"].reset();
    this.statesList = this.lookupService.get_lookup_statesList(countryId);
  }

  getRelationshipTypes() {
    this.lookupService.getRelationshipTypes().subscribe(
      response => {
        this.ownerRelationshipTypes = response;
      },
      error => {
      }
    );
  }
}
