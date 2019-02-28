import { Component, Inject, OnInit } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material";
import {
  FormControl, 
  Validators,
  FormGroup 
} from "@angular/forms";
import { MyErrorStateMatcher } from "src/app/shared/form-validations";

@Component({
  selector: "app-businesshours-modal",
  templateUrl: "./businesshours-modal.component.html",
  styleUrls: ["./businesshours-modal.component.scss"]
})
export class BusinessHoursModalComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  weekdayId = [1500, 1501, 1502, 1503, 1504, 1505, 1506];
  days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  businessHoursForm = new FormGroup({
    0: new FormGroup({
      weekdayId: new FormControl(),
      dayOfTheWeek: new FormControl(),
      openAllDay: new FormControl(),
      closedAllDay: new FormControl(),
      openingTime: new FormControl(),
      closingTime: new FormControl()
    }),
    1: new FormGroup({
      weekdayId: new FormControl(),
      dayOfTheWeek: new FormControl(),
      openAllDay: new FormControl(),
      closedAllDay: new FormControl(),
      openingTime: new FormControl(),
      closingTime: new FormControl()
    }),
    2: new FormGroup({
      weekdayId: new FormControl(),
      dayOfTheWeek: new FormControl(),
      openAllDay: new FormControl(),
      closedAllDay: new FormControl(),
      openingTime: new FormControl(),
      closingTime: new FormControl()
    }),
    3: new FormGroup({
      weekdayId: new FormControl(),
      dayOfTheWeek: new FormControl(),
      openAllDay: new FormControl(),
      closedAllDay: new FormControl(),
      openingTime: new FormControl(),
      closingTime: new FormControl()
    }),
    4: new FormGroup({
      weekdayId: new FormControl(),
      dayOfTheWeek: new FormControl(),
      openAllDay: new FormControl(),
      closedAllDay: new FormControl(),
      openingTime: new FormControl(),
      closingTime: new FormControl()
    }),
    5: new FormGroup({
      weekdayId: new FormControl(),
      dayOfTheWeek: new FormControl(),
      openAllDay: new FormControl(),
      closedAllDay: new FormControl(),
      openingTime: new FormControl(),
      closingTime: new FormControl()
    }),
    6: new FormGroup({
      weekdayId: new FormControl(),
      dayOfTheWeek: new FormControl(),
      openAllDay: new FormControl(),
      closedAllDay: new FormControl(),
      openingTime: new FormControl(),
      closingTime: new FormControl()
    })
  });

  constructor(
    public dialogRef: MatDialogRef<BusinessHoursModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if (
      this.data.businessHours.length != 0 &&
      this.data.businessHours != null
    ) {
      this.checkValidationsonLoad()
      this.businessHoursForm.patchValue({
        0: {
          weekdayId: this.weekdayId[0],
          dayOfTheWeek: this.data.businessHours[0].dayOfTheWeek,
          openAllDay: this.data.businessHours[0].openAllDay,
          closedAllDay: this.data.businessHours[0].closedAllDay,
          openingTime: this.convertTo24hrs(
            this.data.businessHours[0].openingTime
          ),
          closingTime: this.convertTo24hrs(
            this.data.businessHours[0].closingTime
          )
        },
        1: {
          weekdayId: this.weekdayId[1],
          dayOfTheWeek: this.data.businessHours[1].dayOfTheWeek,
          openAllDay: this.data.businessHours[1].openAllDay,
          closedAllDay: this.data.businessHours[1].closedAllDay,
          openingTime: this.convertTo24hrs(
            this.data.businessHours[1].openingTime
          ),
          closingTime: this.convertTo24hrs(
            this.data.businessHours[1].closingTime
          )
        },
        2: {
          weekdayId:this.weekdayId[2],
          dayOfTheWeek: this.data.businessHours[2].dayOfTheWeek,
          openAllDay: this.data.businessHours[2].openAllDay,
          closedAllDay: this.data.businessHours[2].closedAllDay,
          openingTime: this.convertTo24hrs(
            this.data.businessHours[2].openingTime
          ),
          closingTime: this.convertTo24hrs(
            this.data.businessHours[2].closingTime
          )
        },
        3: {
          weekdayId:this.weekdayId[3],
          dayOfTheWeek: this.data.businessHours[3].dayOfTheWeek,
          openAllDay: this.data.businessHours[3].openAllDay,
          closedAllDay: this.data.businessHours[3].closedAllDay,
          openingTime: this.convertTo24hrs(
            this.data.businessHours[3].openingTime
          ),
          closingTime: this.convertTo24hrs(
            this.data.businessHours[3].closingTime
          )
        },
        4: {
          weekdayId: this.weekdayId[4],
          dayOfTheWeek: this.data.businessHours[4].dayOfTheWeek,
          openAllDay: this.data.businessHours[4].openAllDay,
          closedAllDay: this.data.businessHours[4].closedAllDay,
          openingTime: this.convertTo24hrs(
            this.data.businessHours[4].openingTime
          ),
          closingTime: this.convertTo24hrs(
            this.data.businessHours[4].closingTime
          )
        },
        5: {
          weekdayId: this.weekdayId[5],
          dayOfTheWeek: this.data.businessHours[5].dayOfTheWeek,
          openAllDay: this.data.businessHours[5].openAllDay,
          closedAllDay: this.data.businessHours[5].closedAllDay,
          openingTime: this.convertTo24hrs(
            this.data.businessHours[5].openingTime
          ),
          closingTime: this.convertTo24hrs(
            this.data.businessHours[5].closingTime
          )
        },
        6: {
          weekdayId:this.weekdayId[6],
          dayOfTheWeek: this.data.businessHours[6].dayOfTheWeek,
          openAllDay: this.data.businessHours[6].openAllDay,
          closedAllDay: this.data.businessHours[6].closedAllDay,
          openingTime: this.convertTo24hrs(
            this.data.businessHours[6].openingTime
          ),
          closingTime: this.convertTo24hrs(
            this.data.businessHours[6].closingTime
          )
        }
      });
    } else {
      this.patchValidatons()
    this.patchWeekDayIds();   
    }
  }
  convertTo24hrs(time) {
    if (time == "" || time == null || time.length <= 5) {
      return time;
    } else if (time.slice(-2) == "AM") {
       return time.slice(0, 5);
    } 
    else if((time.slice(-2) == "PM"&&time.slice(0,2)==12)){
      return time.slice(0, 5);
    }else{
      return 12 + parseInt(time.slice(0, 2)) + time.slice(2, 5);
    }
  }

  onSave(form: FormGroup) {
    this.dialogRef.close(form.getRawValue());
    form.reset();
  }
  onClear(form: FormGroup) {
    this.patchValidatons()
    form.reset();
    this.patchWeekDayIds()
  }
  onClose(form: FormGroup) {
    this.dialogRef.close();
    form.reset();
  }


patchValidatons(){
  this.businessHoursForm.enable()
  Object.keys(this.businessHoursForm.controls).forEach(key => {
    this.businessHoursForm
      .get(key + ".openingTime")
      .setValidators([Validators.required]);
    this.businessHoursForm
      .get(key + ".closingTime")
      .setValidators([Validators.required]);
  });
  this.businessHoursForm.updateValueAndValidity();
}

  patchWeekDayIds(){
  this.businessHoursForm.patchValue({
    0: { weekdayId: this.weekdayId[0] },
    1: { weekdayId: this.weekdayId[1] },
    2: { weekdayId: this.weekdayId[2] },
    3: { weekdayId: this.weekdayId[3] },
    4: { weekdayId: this.weekdayId[4] },
    5: { weekdayId: this.weekdayId[5] },
    6: { weekdayId: this.weekdayId[6] }
  });
}

 

onChange24Hours(event, str) {
    if (event.checked == true) {
      this.businessHoursForm
        .get(str + ".openingTime")
        .setValidators([Validators.required]);
      this.businessHoursForm
        .get(str + ".closingTime")
        .setValidators([Validators.required]);
      this.businessHoursForm
        .get(str + ".closedAllDay")
        .setValidators([Validators.required]);
      this.businessHoursForm.updateValueAndValidity();
      this.businessHoursForm.get(str + ".openingTime").disable();
      this.businessHoursForm.get(str + ".closingTime").disable();
      this.businessHoursForm.controls[str].patchValue({ closedAllDay: false });
      this.businessHoursForm.controls[str].patchValue({ openingTime: "" });
      this.businessHoursForm.controls[str].patchValue({ closingTime: "" });
      this.businessHoursForm.get(str + ".closedAllDay").disable();
    } else {
      this.businessHoursForm
        .get(str + ".openingTime")
        .setValidators([Validators.required]);
      this.businessHoursForm
        .get(str + ".closingTime")
        .setValidators([Validators.required]);
      this.businessHoursForm
        .get(str + ".closedAllDay")
        .setValidators([Validators.required]);
      this.businessHoursForm.updateValueAndValidity();
      this.businessHoursForm.get(str + ".openingTime").enable();
      this.businessHoursForm.get(str + ".closingTime").enable();
      this.businessHoursForm.get(str + ".closedAllDay").enable();
    }
  }
  
  
  
  focus(event, str) {
    this.businessHoursForm
      .get(str + ".openingTime")
      .setValidators([Validators.required]);
    this.businessHoursForm
      .get(str + ".closingTime")
      .setValidators([Validators.required]);
    this.businessHoursForm
      .get(str + ".openAllDay")
      .setValidators([Validators.required]);
    this.businessHoursForm
      .get(str + ".closedAllDay")
      .setValidators([Validators.required]);
    this.businessHoursForm.controls[str].patchValue({ openAllDay: false });
    this.businessHoursForm.controls[str].patchValue({ closedAllDay: false });
    this.businessHoursForm.get(str + ".openingTime").updateValueAndValidity();
    this.businessHoursForm.get(str + ".closingTime").updateValueAndValidity();
  }

 
 
 
 
  onChangeClosed(event, str) {
    if (event.checked == true) {
      this.businessHoursForm
        .get(str + ".openingTime")
        .setValidators([Validators.required]);
      this.businessHoursForm
        .get(str + ".closingTime")
        .setValidators([Validators.required]);
      this.businessHoursForm
        .get(str + ".openAllDay")
        .setValidators([Validators.required]);
      this.businessHoursForm.updateValueAndValidity();
      this.businessHoursForm.get(str + ".openingTime").disable();
      this.businessHoursForm.get(str + ".closingTime").disable();
      this.businessHoursForm.controls[str].patchValue({ openAllDay: false });
      this.businessHoursForm.controls[str].patchValue({ openingTime: "" });
      this.businessHoursForm.controls[str].patchValue({ closingTime: "" });
      this.businessHoursForm.get(str + ".openAllDay").disable();
    } else {
      this.businessHoursForm
        .get(str + ".openingTime")
        .setValidators([Validators.required]);
      this.businessHoursForm
        .get(str + ".closingTime")
        .setValidators([Validators.required]);
      this.businessHoursForm
        .get(str + ".openAllDay")
        .setValidators([Validators.required]);
      this.businessHoursForm.updateValueAndValidity();
      this.businessHoursForm.get(str + ".openingTime").enable();
      this.businessHoursForm.get(str + ".closingTime").enable();
      this.businessHoursForm.get(str + ".openAllDay").enable();
    }
  }

checkValidationsonLoad(){
  let event={
    checked:true
  }
  this.data.businessHours.forEach((element,index)=>{
    if(element.openAllDay){
      this.onChange24Hours(event,index)
    }else if(element.closedAllDay){
      this.onChangeClosed(event,index)
    }else{
      this.focus(event,index)
    }
  })
}




}
