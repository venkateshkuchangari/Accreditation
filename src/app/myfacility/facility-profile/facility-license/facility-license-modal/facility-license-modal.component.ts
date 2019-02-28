import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import {
  formValidations,
  MyErrorStateMatcher
} from "src/app/shared/form-validations";
import { HttpoptionsService } from "src/app/shared/httpoptions.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { LookupService } from "src/app/shared/lookup.service";
import { _Input_Regex } from "src/app/shared/application-constants";

@Component({
  selector: "app-facility-license-modal",
  templateUrl: "./facility-license-modal.component.html",
  styleUrls: ["./facility-license-modal.component.scss"]
})
export class FacilityLicenseModalComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  selectedLicenseTypes = [];
  licenseAgencyList = [];
  statusTypes = [];
  showPharmacistInchargeSection = false;
  selectedAgencyId: number;
  licenseFormatMessage: string = "";
  picExistRadioGroup = [
    {
      id: true,
      text: "Yes"
    },
    {
      id: false,
      text: "No"
    }
  ];
  licenseForm = new FormGroup({
    licenseNumber: new FormControl("", [
      Validators.required,
      Validators.pattern(_Input_Regex.alpha_numeric_regex)
    ]),
    licenseTypeID: formValidations.licenseTypeID,
    nameOnLicense: formValidations.nameOnLicense,
    licenseStatusTypeID: formValidations.licenseStatusTypeID,
    stateId: formValidations.licensingAgencyId,
    originalIssueDate: formValidations.originalIssueDate,
    licenseValidTo: formValidations.licenseValidTo,
    isPICAssociated: formValidations.isPICAssociated,
    picEprofileID: formValidations.picEprofileID,
    picHours: formValidations.picHours
  });
  constructor(
    private httpOptionsService: HttpoptionsService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private lookupService: LookupService,
    public dialogRef: MatDialogRef<FacilityLicenseModalComponent>
  ) {}

  ngOnInit() {
    this.getLicenseAgencyTypes();
    this.getStatusTypes();
    if (this.dialogData != null) {
      this.getSelectedLicenseTypes(this.dialogData.stateID);
      this.getFacilityLicenseRegex(
        this.dialogData.stateID,
        this.dialogData.licenseTypeID
      );
      this.licenseForm.patchValue({
        licenseNumber: this.dialogData.licenseNumber,
        nameOnLicense: this.dialogData.nameOnLicense,
        licenseStatusTypeID: this.dialogData.licenseStatusTypeID,
        licenseTypeID: this.dialogData.licenseTypeID,
        stateId: this.dialogData.stateID,
        originalIssueDate: this.lookupService.getFormattedDate(
          this.dialogData.originalIssueDate
        ),
        licenseValidTo: this.lookupService.getFormattedDate(
          this.dialogData.licenseValidTo
        ),
        isPICAssociated: this.dialogData.isPICAssociated,
        picEprofileID: this.dialogData.picEprofileID,
        picHours: this.dialogData.picHours
      });
      let event = {
        value: this.dialogData.isPICAssociated
      };
      this.resetPICeProfileId(event);
      Object.keys(this.licenseForm.controls).forEach(key => {
        this.licenseForm.get(key).markAsDirty();
      });
    }
  }

  getLicenseAgencyTypes() {
    this.lookupService.getLicenseAgencyTypes().subscribe(
      data => {
        this.licenseAgencyList = data;
      },
      error => {
        this.httpOptionsService.handleError(error);
      }
    );
  }

  getStatusTypes() {
    this.lookupService.getLicenseStatusTypes().subscribe(
      data => {
        this.statusTypes = data;
      },
      error => {
        this.httpOptionsService.handleError(error);
      }
    );
  }

  getSelectedLicenseTypes(value: any) {
    this.licenseForm.controls["licenseTypeID"].reset();
    this.licenseForm.controls["licenseNumber"].reset();
    this.licenseFormatMessage = "";
    this.selectedAgencyId = value;
    this.getLicenseTypes(value);
  }

  getLicenseTypes(agencyId: any) {
    this.lookupService.getLicenseAgency(agencyId).subscribe(
      data => {
        this.selectedLicenseTypes = data;
      },
      error => {
        this.httpOptionsService.handleError(error);
      }
    );
  }

  getLicenseTypeRegex(typeId: number) {
    this.licenseForm.get("licenseNumber").reset();
    this.getFacilityLicenseRegex(this.selectedAgencyId, typeId);
  }

  getFacilityLicenseRegex(agencyId: number, typeId: number) {
    this.lookupService.getFacilityLicenseRegex(agencyId, typeId).subscribe(
      data => {
        if (data) {
          this.setLicenseNumberPattern(
            data.regularExpression,
            data.userMessage
          );
        } else {
          this.setLicenseNumberPattern(_Input_Regex.alpha_numeric_regex, "");
        }
      },
      error => {
        this.httpOptionsService.handleError(error);
      }
    );
  }

  setLicenseNumberPattern(pattern: string, userMessage: string) {
    this.licenseForm.controls["licenseNumber"].setValidators([
      Validators.pattern(pattern),
      Validators.required
    ]);
    this.licenseForm.controls["licenseNumber"].updateValueAndValidity();
    this.licenseFormatMessage = userMessage;
  }

  onClose() {
    this.dialogRef.close();
    this.licenseForm.reset();
  }

  resetPICeProfileId(event) {
    this.showPharmacistInchargeSection = event.value;
    if (this.showPharmacistInchargeSection) {
      this.licenseForm.controls["picEprofileID"].enable();
      this.licenseForm.controls["picHours"].enable();
    } else {
      this.licenseForm.controls["picEprofileID"].reset();
      this.licenseForm.controls["picEprofileID"].disable();
      this.licenseForm.controls["picHours"].reset();
      this.licenseForm.controls["picHours"].disable();
    }
  }

  onSave() {
    this.dialogRef.close(this.licenseForm.value);
    this.licenseForm.reset();
  }

  clearForm() {
    this.licenseForm.reset();
    this.licenseForm.controls["picEprofileID"].disable();
    this.licenseForm.controls["picHours"].disable();
    this.showPharmacistInchargeSection = false;
    this.selectedLicenseTypes = [];
  }
}
