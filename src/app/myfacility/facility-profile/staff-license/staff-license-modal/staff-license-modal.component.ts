import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MyFacilityService } from "../../../services/myfacility.service";
import { MatDialogRef } from "@angular/material";
import {
  formValidations,
  MyErrorStateMatcher
} from "../../../../shared/form-validations";
import { DatePipe } from "@angular/common";
import { HttpoptionsService } from "../../../../shared/httpoptions.service";
import { LookupService } from "src/app/shared/lookup.service";
import {
  _License_Types,
  _Input_Regex
} from "src/app/shared/application-constants";

@Component({
  selector: "staff-license-modal",
  templateUrl: "staff-license-modal.component.html",
  styleUrls: ["staff-license-modal.component.scss"],
  providers: [DatePipe]
})
export class StaffLicenseModalComponent {
  countryId: number;
  countries = [];
  statesList = [];
  agencyId: number;
  individualForm: FormGroup = new FormGroup({
    licenseTypeID: formValidations.licenseTypeID,
    eProfileId: formValidations.staffEprofileId,
    licenseNumber: new FormControl({ value: "", disabled: true }, [
      Validators.required
    ]),
    licensingAgencyId: formValidations.licensingAgencyId
  });
  allowSubmit: boolean = false;
  licenseTypes = [];
  searchLicence = [];
  columnDefs;
  licenseFormatMessage: string = "";
  datafetched: boolean = false;
  agencyTypes = [];
  confirmMsg =
    " I affirm that this information is correct and that I have obtained consent from the person to link their name and license details to this facility as an employee. ";
  constructor(
    private myfacilityService: MyFacilityService,
    public dialogRef: MatDialogRef<StaffLicenseModalComponent>,
    private httpOptionService: HttpoptionsService,
    private _datePipe: DatePipe,
    private lookupService: LookupService
  ) {
    let me = this;
    this.columnDefs = [
      {
        headerName: "Name",
        field: "fullName",
        width: 125
      },
      {
        headerName: "State/Agency",
        field: "stateCodeOrAgencyName",
        width: 125
      },
      {
        headerName: "License Type",
        field: "licenseTypeDescription",
        width: 175
      },
      {
        headerName: "License Number",
        field: "licenseNumber",
        width: 175
      },
      {
        headerName: "Expiration Date",
        field: "licenseValidTo",
        width: 175,
        valueFormatter: function(param) {
          return param.data.licenseValidTo == null
            ? ""
            : me._datePipe.transform(param.data.licenseValidTo, "MM/dd/yyyy");
        }
      },
      {
        headerName: "Status",
        field: "licenseStatusTypeDescription",
        width: 175
      },
      {
        headerName: "e-ProfileID",
        field: "eProfileID",
        width: 300
      }
    ];
  }

  matcher = new MyErrorStateMatcher();

  ngOnInit() {
    this.getIndividualLicenseAgencies();
  }

  getIndividualLicenseAgencies() {
    this.lookupService.getIndividualLicenseAgencies().subscribe(
      data => {
        this.agencyTypes = data;
      },
      error => {
        this.httpOptionService.handleError(error);
      }
    );
  }

  getIndividualLicenseTypes(angencyId: any) {
    this.licenseTypes = [];
    this.lookupService.getIndividualLicenseTypes(angencyId).subscribe(
      data => {
        this.licenseTypes = data;
      },
      error => {
        this.httpOptionService.handleError(error);
      }
    );
  }

  getSelectedLicenseTypes(value: any) {
    this.agencyId = value;
    this.individualForm.controls["licenseTypeID"].reset();
    this.setLicenseNumberPattern(_Input_Regex.alpha_numeric_regex, "");
    this.individualForm.get("licenseNumber").disable();
    this.getIndividualLicenseTypes(this.agencyId);
  }

  searchIndividualData() {
    this.searchLicence = [];
    let searchData = this.individualForm.value;
    let body = `eProfileId=${encodeURIComponent(
      searchData.eProfileId
    )}&licensingAgencyStateID=${encodeURIComponent(
      searchData.licensingAgencyId
    )}&licenseTypeId=${encodeURIComponent(
      searchData.licenseTypeID
    )}&licenseNumber=${encodeURIComponent(searchData.licenseNumber)}`;
    this.myfacilityService.searchIndividualLicence(body).subscribe(
      data => {
        this.datafetched = true;
        if (data != null) {
          this.searchLicence.push(data);
        }
      },
      error => {
        this.httpOptionService.handleError(error);
      }
    );
  }

  submit() {
    this.dialogRef.close(this.searchLicence);
    this.individualForm.reset();
  }

  onClose() {
    this.dialogRef.close();
    this.individualForm.reset();
  }

  getStafflicenseNumberRegex(value: number) {
    this.individualForm.get("licenseNumber").enable();
    if (value == _License_Types.pharmacist) {
      this.getStaffLicenseRegex(this.agencyId);
    } else {
      this.setLicenseNumberPattern(_Input_Regex.alpha_numeric_regex, "");
    }
  }

  getStaffLicenseRegex(agencyId: number) {
    this.lookupService.getStaffLicenseRegex(agencyId).subscribe(
      data => {
        this.setLicenseNumberPattern(data.regularExpression, data.userMessage);
      },
      error => {
        this.httpOptionService.handleError(error);
      }
    );
  }

  setLicenseNumberPattern(pattern: string, userMessage: string) {
    this.individualForm.get("licenseNumber").reset();
    this.individualForm
      .get("licenseNumber")
      .setValidators([Validators.pattern(pattern),Validators.required]);
    this.licenseFormatMessage = userMessage;
  }

  enableSubmit(event) {
    this.allowSubmit = event.checked;
  }

  onClear() {
    this.searchLicence = [];
    this.datafetched = false;
    this.licenseTypes = [];
    this.licenseFormatMessage = "";
    this.individualForm.reset();
    this.allowSubmit=false;
    this.individualForm.controls["licenseNumber"].disable();
  }
}
