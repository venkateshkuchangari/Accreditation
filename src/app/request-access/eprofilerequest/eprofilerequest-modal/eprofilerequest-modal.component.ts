import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { formValidations } from 'src/app/shared/form-validations';
import { LookupService } from 'src/app/shared/lookup.service';
import { ChiplistinputComponent } from 'src/app/shared/chiplistinput/chiplistinput.component';
import { MyErrorStateMatcher } from 'src/app/auth/user-login/user-login.component';


@Component({
  selector: 'app-eprofilerequest-modal',
  templateUrl: './eprofilerequest-modal.component.html',
  styleUrls: ['./eprofilerequest-modal.component.scss']
})
export class EprofilerequestModalComponent implements OnInit {
  eprofileForm = new FormGroup({
    legalBusinessName:formValidations.LegalBusinessName,
    storeNumber: formValidations.StoreNumber,
    eprofileId: formValidations.EprofileId,
    ncpdpNumber: formValidations.eProfileNcpdpNumbers,
    npiNumber: formValidations.eProfileNpiNumbers,
    eProfileID: formValidations.EprofileId,
    feinNumber: formValidations.eProfileFeinNumber,
    primaryDBA:formValidations.primaryDba,
    doingBusinessAs:formValidations.dbAs,
    residentLicenseStateName: formValidations.eProfileLicenseState,
    licenseNumber: formValidations.eProfileLicenseNumber,
    countryID: formValidations.CountryId,
    organizationAddress1: formValidations.Address1,
    organizationAddress2: formValidations.Address2,
    organizationCity: formValidations.City,
    organizationState: formValidations.StateId,
    organizationZip: formValidations.ZipCode,
    primaryExtension: formValidations.PrimaryExtension,
    phoneNumber: formValidations.PrimaryPhone
  });
  @ViewChild(ChiplistinputComponent)
  private childComponent:ChiplistinputComponent;
  matcher = new MyErrorStateMatcher();
  inputChips=[]
  countryList=[]
  statesList=[]
  licenseCountries=[]
  

  constructor( public dialogRef: MatDialogRef<EprofilerequestModalComponent>,
   private lookUpService:LookupService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.lookUpService.get_lookup_countryList.subscribe((data)=>{this.countryList=data});
    this.licenseCountries=[this.getCountry(230),this.getCountry(38)]
  }
 
  getStates(countryId) {
    this.eprofileForm.controls['organizationState'].reset()
    this.statesList = this.lookUpService.get_lookup_statesList(countryId);
  }
 
getCountry(countryId){
  for(var i=0;i<this.countryList.length;i++){
    if(countryId==this.countryList[i].countryId){
    return this.countryList[i]; 
}
}
}

onClose() {
  this.dialogRef.close();
  this.eprofileForm.reset();
}
onSave() {
  this.dialogRef.close(this.eprofileForm.value);
  this.eprofileForm.reset();

}
getDbaValuesfromChild(value){
  this.eprofileForm.controls['doingBusinessAs'].patchValue(value)
}
onClear() {
  this.statesList=[]
  this.childComponent.clearAll()  
  this.eprofileForm.reset();
}

}

