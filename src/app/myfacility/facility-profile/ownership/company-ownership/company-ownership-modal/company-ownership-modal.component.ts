import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MyFacilityService } from 'src/app/myfacility/services/myfacility.service';
import { LookupService } from 'src/app/shared/lookup.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { formValidations, MyErrorStateMatcher } from 'src/app/shared/form-validations';

@Component({
  selector: 'app-company-ownership-modal',
  templateUrl: './company-ownership-modal.component.html',
  styleUrls: ['./company-ownership-modal.component.scss']
})
export class CompanyOwnershipModalComponent implements OnInit {
  countryList=[]
  statesList=[]
  ownerShipTypes=[]
  showOwnerDescription=false;
  matcher=new MyErrorStateMatcher();
  companyOwnerForm=new FormGroup({ 
    addressLine2: formValidations.Address2,
    extension: formValidations.PrimaryExtension,
    businessName:formValidations.LegalBusinessName,
    ownershipTypeId:formValidations.ownershipTypeId,
    ownershipTypeOtherDesc:new FormControl({value: '', disabled: true},[Validators.required]),
    eprofileId: formValidations.EprofileId,
    zipCode: formValidations.ZipCode,
    countryId: formValidations.CountryId,
    city: formValidations.City,
    addressLine1: formValidations.Address1,
    stateId: formValidations.StateId,
    phoneNumber: formValidations.PrimaryPhone,
    percentageOwned:formValidations.percentOwned,
    isPreviousOwner:formValidations.isPreviousOwner,
    isParentCompany:formValidations.isParentCompany
   })
  constructor( private dialogRef: MatDialogRef<CompanyOwnershipModalComponent>,
    private myFacilityService: MyFacilityService,
   private lookupService:LookupService,
   @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {  
    this.lookupService.get_lookup_countryList.subscribe((data)=>{this.countryList=data})
    this.getOwnershipTypes();
    if(this.data!=null){
  this.getStates(this.data.countryID)
this.companyOwnerForm.patchValue({
  addressLine2: this.data.address2,
  extension: this.data.extension,
  businessName:this.data.organizationName,
  ownershipTypeId:this.data.ownershipTypeId,
  ownershipTypeOtherDesc:this.data.otherOwnershipTypeDesc,
  eprofileId: this.data.ownerEProfileId,
  zipCode: this.data.zipCode,
  countryId: this.data.countryID,
  city: this.data.city,
  addressLine1: this.data.address1,
  stateId: this.data.stateId,
  phoneNumber: this.data.phoneNumber,
  percentageOwned:this.data.ownerShipStake,
  isPreviousOwner:this.data.isPreviousOwner,
  isParentCompany:this.data.isParent
})
Object.keys(this.companyOwnerForm.controls).forEach(key => {
  this.companyOwnerForm.get(key).markAsDirty();
});
    }
     }
  onClose() {
    this.dialogRef.close();
    this.companyOwnerForm.reset();
  }
  onClear() {
    this.statesList=[]
    this.companyOwnerForm.reset();
    }

  onSave() {
    this.dialogRef.close(this.companyOwnerForm.value);
    this.companyOwnerForm.reset();
  }

  getStates(countryId) {
    this.companyOwnerForm.controls['stateId'].reset()
    this.statesList = this.lookupService.get_lookup_statesList(countryId);
  }


  getOwnershipTypes(){
    this.lookupService.getOwnershipTypes()
    .subscribe((response) => {
      this.ownerShipTypes = response;
      if(this.data!=null){
        this.selectedOwnershipType(this.data.ownershipTypeId)
      }
    },
    (error)=>{
    })
  } 
  
  selectedOwnershipType(value){
    this.ownerShipTypes.forEach(element => {
      if (element.id == value) {
        this.showOwnerDescription = element.isOwnershipTypeNameRequired;
        if (this.showOwnerDescription) {
          this.companyOwnerForm
            .get("ownershipTypeOtherDesc")
            .enable();
          this.companyOwnerForm
            .get("ownershipTypeOtherDesc")
            .updateValueAndValidity();
        } else {
          this.companyOwnerForm
            .get("ownershipTypeOtherDesc")
            .disable();
        }
      }
    });

  }
  }
