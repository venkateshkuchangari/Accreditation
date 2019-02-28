import { Component, OnInit, Inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatRadioChange
} from "@angular/material";
import {
  MyErrorStateMatcher,
  formValidations
} from "src/app/shared/form-validations";
import { FormGroup } from "@angular/forms";
import { LookupService } from "src/app/shared/lookup.service";

@Component({
  selector: "app-accreditation-modal",
  templateUrl: "./accreditation-modal.component.html",
  styleUrls: ["./accreditation-modal.component.scss"]
})
export class AccreditationModalComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  maxDate:Date;
  maxValidTillDate:Date;
  showAccreditationActionSection = false;
  showAccreditationSection = false;
  showAgencyName = false;
  showAccreditationName = false;
  showAccreditationActionName = false;
  accreditationAgencyTypes = [];
  accreditationTypes = [];
  accreditationActionTypes = [];
  partialorFullRadioGroup = [
    {
      id: false,
      text: "Partial"
    },
    {
      id: true,
      text: "Full"
    }
  ];
  actionExistRadioGroup = [
    {
      id: true,
      text: "Yes"
    },
    {
      id: false,
      text: "No"
    }
  ];

  accreditationForm = new FormGroup({  
    accreditationBusinessName: formValidations.accreditationBusinessName,
    accreditationAgencyTypeId: formValidations.accreditationAgencyTypeId,
    accreditationAgencyTypeOtherDesc:
      formValidations.accreditationAgencyTypeOtherDesc,
    accreditationTypeId: formValidations.accreditationTypeId,
    accreditationTypeOtherDesc: formValidations.accreditationTypeOtherDesc,
    IsAccreditationFull: formValidations.IsAccreditationFull,
    accreditationDate: formValidations.accreditationDate,
    accreditationValidTo: formValidations.accreditationValidTo,
    accreditationSurveyDate: formValidations.accreditationSurveyDate,
    isAccreditationActionExits: formValidations.isAccreditationActionExits,
    accreditationActionTypeId: formValidations.accreditationActionTypeId,
    AccreditationActionOtherTypeDesc:
      formValidations.accreditationActionTypeOtherDesc,
    accreditationActionDate: formValidations.accreditationActionDate,
    accreditationActionExplanation:
      formValidations.accreditationActionExplanation
  });

  constructor(
    private lookupService: LookupService,
    public dialogRef: MatDialogRef<AccreditationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if (this.data==0) {
      this.disableAccreditation();
      this.enableAccreditationAction();
      this.showAccreditationActionSection = true;
    } else {
      this.maxDate = new Date();
      this.enableAccreditation();
      this.getAccreditationAgencyTypes();
      this.getAccreditationTypes();
      this.showAccreditationSection = true;
    }
  }
  validFromChange(event) {
    this.maxValidTillDate = event.value;
  }

  onClose() {
    this.accreditationForm.reset();
    this.dialogRef.close();
  }

  getAccreditationAgencyTypes() {
    this.lookupService.getAccreditationAgencyTypes().subscribe(
      response => {
        this.accreditationAgencyTypes = response;
      },
      error => {}
    );
  }

  getAccreditationTypes() {
    this.lookupService.getAccreditationTypes().subscribe(
      response => {
        this.accreditationTypes = response;
      },
      error => {}
    );
  }
  accreditationActionExistsChange(event: MatRadioChange) {
    this.showAccreditationActionSection = event.value;
    if (this.showAccreditationActionSection) {
      this.enableAccreditationAction();
      this.getAccreditationActionTypes();
    } else {
      this.disableAccreditationActions();
    }
  }

  disableAccreditation() {   
    this.accreditationForm.get("accreditationBusinessName").disable();
    this.accreditationForm.get("accreditationAgencyTypeId").disable();
    this.accreditationForm.get("accreditationAgencyTypeOtherDesc").disable();
    this.accreditationForm.get("accreditationTypeId").disable();
    this.accreditationForm.get("accreditationTypeOtherDesc").disable();
    this.accreditationForm.get("IsAccreditationFull").disable();
    this.accreditationForm.get("accreditationDate").disable();
    this.accreditationForm.get("accreditationValidTo").disable();
    this.accreditationForm.get("accreditationSurveyDate").disable();
    this.accreditationForm.get("isAccreditationActionExits").disable();
    this.accreditationForm.updateValueAndValidity();
  }

  enableAccreditation() {   
    this.accreditationForm.get("accreditationBusinessName").enable();
    this.accreditationForm.get("accreditationAgencyTypeId").enable();
    this.accreditationForm.get("accreditationTypeId").enable();
    this.accreditationForm.get("IsAccreditationFull").enable();
    this.accreditationForm.get("accreditationDate").enable();
    this.accreditationForm.get("accreditationValidTo").enable();
    this.accreditationForm.get("accreditationSurveyDate").enable();
    this.accreditationForm.get("isAccreditationActionExits").enable();
    this.accreditationForm.updateValueAndValidity();
  }

  enableAccreditationAction() {
    this.accreditationForm.get("accreditationActionTypeId").enable();
    this.accreditationForm.get("accreditationActionDate").enable();
    this.accreditationForm.get("accreditationActionExplanation").enable();
    this.accreditationForm.updateValueAndValidity();
    this.getAccreditationActionTypes();
  }

  disableAccreditationActions() {
    this.accreditationForm.get("accreditationActionTypeId").disable();
    this.accreditationForm.get("AccreditationActionOtherTypeDesc").disable();
    this.accreditationForm.get("accreditationActionDate").disable();
    this.accreditationForm.get("accreditationActionExplanation").disable();
    this.accreditationForm.updateValueAndValidity();
  }

  selectedAgencyType(value) {
    this.accreditationAgencyTypes.forEach(element => {
      if (element.id == value) {
        this.showAgencyName = element.isAgencyNameRequired;
        if (this.showAgencyName) {
          this.accreditationForm
            .get("accreditationAgencyTypeOtherDesc")
            .enable();
          this.accreditationForm
            .get("accreditationAgencyTypeOtherDesc")
            .updateValueAndValidity();
        } else {
          this.accreditationForm
            .get("accreditationAgencyTypeOtherDesc")
            .disable();
        }
      }
    });
  }

  selectedAccreditationType(value) {
    this.accreditationTypes.forEach(element => {
      if (element.id == value) {
        this.showAccreditationName = element.isAccreditationTypeRequired;
        if (this.showAccreditationName) {
          this.accreditationForm.get("accreditationTypeOtherDesc").enable();
          this.accreditationForm
            .get("accreditationTypeOtherDesc")
            .updateValueAndValidity();
        } else {
          this.accreditationForm.get("accreditationTypeOtherDesc").disable();
        }
      }
    });
  }
  selectedAccreditationActionType(value) {
    this.accreditationActionTypes.forEach(element => {
      if (element.id == value) {
        this.showAccreditationActionName =
          element.isAccreditationActionTypeRequired;
        if (this.showAccreditationActionName) {
          this.accreditationForm
            .get("AccreditationActionOtherTypeDesc")
            .enable();
          this.accreditationForm
            .get("AccreditationActionOtherTypeDesc")
            .updateValueAndValidity();
        } else {
          this.accreditationForm
            .get("AccreditationActionOtherTypeDesc")
            .disable();
        }
      }
    });
  }

  getAccreditationActionTypes() {
    this.lookupService.getAccreditationActionTypes().subscribe(
      response => {
        this.accreditationActionTypes = response;
      },
      error => {}
    );
  }
  onSave() {
    this.dialogRef.close(this.accreditationForm.value);
    this.accreditationForm.reset();
  }

  onClear() {
    if (this.data != null) {
      this.accreditationForm.reset();
      this.showAccreditationActionName = false;
      this.accreditationForm.get("AccreditationActionOtherTypeDesc").disable();
    } else {
      this.accreditationForm.reset();
      this.showAccreditationActionSection = false;
      this.showAgencyName = false;
      this.showAccreditationActionName = false;
      this.showAccreditationName = false;
      this.disableAccreditationActions();
      this.accreditationForm.get("accreditationTypeOtherDesc").disable();
      this.accreditationForm.get("accreditationAgencyTypeOtherDesc").disable();
    }
  }
}
