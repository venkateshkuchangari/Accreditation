import { Component, OnInit, Inject } from '@angular/core';
import { _Attestation_Statement, _Attestation_Checkbox_Text } from './attestation.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-attestation-modal',
  templateUrl: './attestation-modal.component.html',
  styleUrls: ['./attestation-modal.component.scss']  
})
export class AttestationModalComponent implements OnInit {
  info=_Attestation_Statement;
  checkboxText=_Attestation_Checkbox_Text;
  attestationCheckboxChecked:boolean=false;
  questionText="Please select the following option that applies to the AO:" 
  testamentTypes=[]
  form=new FormGroup({
    attestationQuestion:new FormControl(null,[Validators.required])
  })
  constructor(public dialogRef: MatDialogRef<AttestationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {     
   this.testamentTypes=this.data; 
  }
  goToBack() {
    this.dialogRef.close();
  }

  attestationCheckboxChanged(event) {
    this.attestationCheckboxChecked = event.checked;
  } 

  goContinue() {
    this.dialogRef.close(this.form.value);
  }
}
