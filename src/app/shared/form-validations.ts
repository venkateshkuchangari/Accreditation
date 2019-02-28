import { ErrorStateMatcher } from "@angular/material";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from "@angular/forms";
import { _Input_Regex } from "./application-constants";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

export const formValidations = {
  adminEmail: new FormControl("", Validators.email),
  faxNumber: new FormControl("", [
    Validators.pattern(_Input_Regex.phone_number_regex)
  ]),
  inspectionAgencyName: new FormControl("", [
    Validators.pattern(_Input_Regex.alpha_numeric_regex)
  ]),
  licensingAgencyId: new FormControl("", [Validators.required]),
  LicenseNumber: new FormControl("", [
    Validators.required,
    Validators.pattern(_Input_Regex.alpha_numeric_regex)
  ]),
  eProfileLicenseState: new FormControl(""),
  eProfileLicenseNumber: new FormControl(""),
  website: new FormControl("", [
    Validators.pattern(_Input_Regex.website_regex)
  ]),
  inspectionDate: new FormControl("", [Validators.required]),
  agencyId: new FormControl("", [Validators.required]),
  agencyName: new FormControl("", [
    Validators.required,
    Validators.pattern(_Input_Regex.alpha_numeric_regex)
  ]),
  IsPrimaryContact: new FormControl(""),
  OrganizationContactID: new FormControl(""),
  PrefixTypeID: new FormControl(""),
  LegalBusinessName: new FormControl("", [
    Validators.required,
    Validators.pattern(_Input_Regex.alpha_numeric_regex)
  ]),
  primaryDba: new FormControl("", [
    Validators.required,
    Validators.pattern(_Input_Regex.alpha_numeric_regex)
  ]),
  dbAs: new FormControl(""),
  fkAs: new FormControl(""),
  StoreNumber: new FormControl("", [
    Validators.pattern(_Input_Regex.number_input_regex)
  ]),
  FeinNumber: new FormControl("", [
    Validators.pattern(_Input_Regex.nine_number_regex),
    Validators.required
  ]),
  eProfileFeinNumber: new FormControl("", [
    Validators.pattern(_Input_Regex.nine_number_regex)
  ]),
  NpiNumbers: new FormControl("", [
    Validators.required,
    Validators.pattern(_Input_Regex.ten_number_regex)
  ]),
  NcpdpNumbers: new FormControl("", [
    Validators.required,
    Validators.pattern(_Input_Regex.seven_number_regex)
  ]),
  eProfileNpiNumbers: new FormControl("", [
    Validators.pattern(_Input_Regex.ten_number_regex)
  ]),
  eProfileNcpdpNumbers: new FormControl("", [
    Validators.pattern(_Input_Regex.seven_number_regex)
  ]),
  MiddleName: new FormControl("", [
    Validators.pattern(_Input_Regex.alpha_only_single_regex)
  ]),
  SuffixTypeID: new FormControl(""),
  Address2: new FormControl("", [
    Validators.pattern(_Input_Regex.alpha_numeric_regex)
  ]),
  PrimaryExtension: new FormControl("", [
    Validators.pattern(_Input_Regex.phone_extension_regex)
  ]),
  EprofileId: new FormControl("", [
    Validators.pattern(_Input_Regex.eprofileid_regex)
  ]),
  staffEprofileId: new FormControl("", [
    Validators.required,
    Validators.pattern(_Input_Regex.eprofileid_regex)
  ]),
  SecondaryPhone: new FormControl("", [
    Validators.pattern(_Input_Regex.phone_number_regex)
  ]),
  SecondaryExtension: new FormControl("", [
    Validators.pattern(_Input_Regex.phone_extension_regex)
  ]),
  ZipCode: new FormControl("", [
    Validators.pattern(_Input_Regex.zip_code_regex),
    Validators.required
  ]),
  FirstName: new FormControl("", [
    Validators.required,
    Validators.pattern(_Input_Regex.alpha_only_regex)
  ]),
  LastName: new FormControl("", [
    Validators.required,
    Validators.pattern(_Input_Regex.alpha_only_regex)
  ]),
  TitleId: new FormControl("", [Validators.required]),
  CountryId: new FormControl(null, [Validators.required]),
  City: new FormControl("", [
    Validators.required,
    Validators.pattern(_Input_Regex.alpha_only_regex)
  ]),
  Address1: new FormControl("", [
    Validators.required,
    Validators.pattern(_Input_Regex.alpha_numeric_regex)
  ]),
  StateId: new FormControl(null, [Validators.required]),
  PrimaryPhone: new FormControl("", [
    Validators.pattern(_Input_Regex.phone_number_regex),
    Validators.required
  ]),
  usergenderTypeId: new FormControl(null,[Validators.required]),
  genderTypeId: new FormControl(null,[Validators.required]),
  contactEmail: new FormControl("", [Validators.required, Validators.email]),
  Email: new FormControl("", [Validators.required, Validators.email]),
  accreditationId: new FormControl(""),
  accreditationBusinessName: new FormControl("", [
    Validators.required,
    Validators.pattern(_Input_Regex.alpha_numeric_regex)
  ]),
  accreditationAgencyTypeId: new FormControl("", [Validators.required]),
  accreditationAgencyTypeOtherDesc: new FormControl(
    { value: "", disabled: true },
    [Validators.required, Validators.pattern(_Input_Regex.alpha_numeric_regex)]
  ),
  accreditationTypeId: new FormControl("", [Validators.required]),
  accreditationTypeOtherDesc: new FormControl({ value: "", disabled: true }, [
    Validators.required,
    Validators.pattern(_Input_Regex.alpha_numeric_regex)
  ]),
  IsAccreditationFull: new FormControl("", [Validators.required]),
  accreditationDate: new FormControl("", [Validators.required]),
  accreditationValidTo: new FormControl("", [Validators.required]),
  accreditationSurveyDate: new FormControl("", [Validators.required]),
  isAccreditationActionExits: new FormControl("", [Validators.required]),
  accreditationActionTypeId: new FormControl({ value: "", disabled: true }, [
    Validators.required
  ]),
  accreditationActionTypeOtherDesc: new FormControl(
    { value: "", disabled: true },
    [Validators.required, Validators.pattern(_Input_Regex.alpha_numeric_regex)]
  ),
  accreditationActionDate: new FormControl({ value: "", disabled: true }, [
    Validators.required
  ]),
  accreditationActionExplanation: new FormControl(
    { value: "", disabled: true },
    [Validators.required,Validators.maxLength(500)]
  ),
  percentOwned: new FormControl("", [
    Validators.required,
    Validators.max(100),
    Validators.min(5)
  ]),
  relationshipId: new FormControl(""),
  isPreviousOwner: new FormControl("", Validators.required),
  ownershipTypeId: new FormControl("", Validators.required),
  isParentCompany: new FormControl("", Validators.required),
  licenseTypeID: new FormControl("", Validators.required),
  nameOnLicense: new FormControl("", [
    Validators.required,
    Validators.pattern(_Input_Regex.alpha_numeric_regex)
  ]),
  licenseStatusTypeID: new FormControl("", Validators.required),
  licenseCategoryTypeID: new FormControl("", Validators.required),
  originalIssueDate: new FormControl(""),
  licenseValidTo: new FormControl("", Validators.required),
  isPICAssociated: new FormControl("", Validators.required),
  picEprofileID: new FormControl(
    { value: "", disabled: true },
    [Validators.required, Validators.pattern(_Input_Regex.eprofileid_regex)]
  ),
  picHours: new FormControl(
    { value: "", disabled: true },
    [Validators.required, Validators.pattern(_Input_Regex.number_input_regex)]
  )
};
