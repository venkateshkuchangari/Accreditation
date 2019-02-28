import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { FormControl, FormGroup } from "@angular/forms";
import { mixinModalForm } from "../../../../shared/modal/modal.form";
import { MyFacilityService } from "../../../services/myfacility.service";
import {
  formValidations,
  MyErrorStateMatcher
} from "../../../../shared/form-validations";
import { LookupService } from "../../../../shared/lookup.service";
import { DashboardService } from "src/app/dashboard/services/dashboard.service";
import { HttpoptionsService } from "src/app/shared/httpoptions.service";
import { AuthService } from "src/app/auth/services/auth.service";

export class ContactDialogData {}

export class ContactDialogModalBase {
  constructor(public dialog: MatDialogRef<any>, public snackBar: MatSnackBar) {}
}

@Component({
  selector: "app-contact-overlay",
  templateUrl: "./contact-modal.component.html",
  styleUrls: ["./contact-modal.component.scss"]
})
export class ContactModalComponent
  extends mixinModalForm(ContactDialogModalBase)
  implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ContactModalComponent>,
    public snackBar: MatSnackBar,
    public myFacilityService: MyFacilityService,
    private lookUpService: LookupService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dashboardService: DashboardService,
    private httpOptionsService: HttpoptionsService,
    private authService:AuthService
  ) {
    super(dialogRef, snackBar);
  }

  matcher = new MyErrorStateMatcher();
  prefixList = [];
  suffixList = [];
  titleList = [];
  countryList = [];
  statesList = [];
  genderList = [];
  contact: any;
  userContactCheckboxChecked: boolean = false;
  contactForm = new FormGroup({
    IsPrimaryContact: formValidations.IsPrimaryContact,
    PrefixTypeID: formValidations.PrefixTypeID,
    MiddleName: formValidations.MiddleName,
    SuffixTypeID: formValidations.SuffixTypeID,
    Address2: formValidations.Address2,
    PrimaryExtension: formValidations.PrimaryExtension,
    EprofileId: formValidations.EprofileId,
    genderTypeId: formValidations.genderTypeId,
    SecondaryPhone: formValidations.SecondaryPhone,
    SecondaryExtension: formValidations.SecondaryExtension,
    ZipCode: formValidations.ZipCode,
    FirstName: formValidations.FirstName,
    LastName: formValidations.LastName,
    TitleId: formValidations.TitleId,
    CountryId: formValidations.CountryId,
    City: formValidations.City,
    Address1: formValidations.Address1,
    StateId: formValidations.StateId,
    PrimaryPhone: formValidations.PrimaryPhone,
    Email : formValidations.contactEmail,
  });

  ngOnInit() {
    this.contactForm.controls['Email'].enable()
    this.contactForm.controls['TitleId'].enable()
    this.lookUpService.get_lookup_prefixList.subscribe(data => {
      this.prefixList = data;
    });
    this.lookUpService.get_lookup_sufixList.subscribe(data => {
      this.suffixList = data;
    });
    this.lookUpService.get_lookup_titleList.subscribe(data => {
      this.titleList = data;
    });
    this.lookUpService.get_lookup_countryList.subscribe(data => {
      this.countryList = data;
    });
    this.lookUpService.get_lookup_genderList.subscribe(data => {
      this.genderList = data;
    });
    if (this.data) {
      this.contact = this.data.contact;
      this.patchForm();
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key).markAsDirty();
      });
    } else if(this.data == 0) {
      this.contactForm.patchValue({
        IsPrimaryContact: false,
        Email:this.authService.get_loggedin_username()
      });
      this.contactForm.controls['Email'].disable()
      this.contactForm.controls['TitleId'].disable()
    }else{
      this.contactForm.patchValue({
        IsPrimaryContact: false
      });
    }    
  }

  getExistingUserContact() {
    this.dashboardService.getUserContacts().subscribe(
      data => {
        this.contact = data[0];
        this.patchForm();
      },
      error => {
        this.httpOptionsService.handleError(error);
      }
    );
  }

  onClose() {
    this.dialogRef.close();
    this.contactForm.reset();
  }

  onSave() {
    this.dialogRef.close(this.contactForm.value);
    this.contactForm.reset();
  }

  onClear() {
    this.contactForm.reset();
    this.statesList = [];
    this.userContactCheckboxChecked = false;
    this.contactForm.patchValue({
      IsPrimaryContact: false
    });
    if(this.data == 0) {
      this.contactForm.patchValue({       
        Email:this.authService.get_loggedin_username()
      }) 
    }
  }

  getStates(countryId) {
    this.contactForm.controls["StateId"].reset();
    this.statesList = this.lookUpService.get_lookup_statesList(countryId);
  }

  onUserContactCheckboxChanged(event) {
    this.userContactCheckboxChecked = event.checked;
    if (event.checked == true) {
      this.getExistingUserContact();
    }
    if (event.checked == false) {
     this.onClear();
    }
  }

  patchForm() {
    this.getStates(this.contact.countryId);
    this.contactForm.patchValue({
      PrefixTypeID: this.contact.prefixTypeID,
      SuffixTypeID: this.contact.suffixTypeID,
      FirstName: this.contact.firstName,
      MiddleName: this.contact.middleName,
      LastName: this.contact.lastName,
      TitleId: this.contact.titleId,
      Address1: this.contact.address1,
      Address2: this.contact.address2,
      genderTypeId: this.contact.genderTypeId,
      City: this.contact.city,
      ZipCode: this.contact.zipCode,
      StateId: this.contact.stateId,
      CountryId: this.contact.countryId,
      PrimaryPhone: this.contact.primaryPhone,
      PrimaryExtension: this.contact.primaryExtension,
      SecondaryPhone: this.contact.secondaryPhone,
      SecondaryExtension: this.contact.secondaryExtension,
      EprofileId: this.contact.eprofileId,
      IsPrimaryContact: this.contact.isPrimaryContact,
      Email : this.contact.email
    });
  }
}
