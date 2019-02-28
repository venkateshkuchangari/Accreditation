import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ENTER, COMMA } from "@angular/cdk/keycodes";
import { ChiplistinputComponent } from "src/app/shared/chiplistinput/chiplistinput.component";
import { LookupService } from "src/app/shared/lookup.service";

@Component({
  selector: "app-pharmacyactivities-modal",
  templateUrl: "./pharmacyactivities-modal.component.html",
  styleUrls: ["./pharmacyactivities-modal.component.scss"]
})
export class PharmacyactivitiesModalComponent implements OnInit {
  pharmacyActivityLookup = [];
  pharmacyActivity = [];
  selectedActivityIds: any[];
  otherSelectedActivities: any[];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild("otherTypeInput")
  private othertypeChildComponent: ChiplistinputComponent;

  constructor(
    private lookupService: LookupService,
    public dialogRef: MatDialogRef<PharmacyactivitiesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  activityForm = new FormGroup({
    selecetdActivities: new FormControl([], [Validators.required]),
    otherActivities: new FormControl([], [Validators.required])
  });
  ngOnInit() {
    this.getFacilityActivitiesLookup();
    this.otherSelectedActivities = this.data.other;
  }
  getFacilityActivitiesLookup() {
    this.lookupService.getFacilityActivitiesList().subscribe(response => {
      this.pharmacyActivityLookup = response.filter(element => {
        return element.id != 1240;
      });
      setTimeout(
        () =>
          this.activityForm.patchValue({
            selecetdActivities: this.data.selected,
            otherActivities: this.data.other
          }),
        500
      );
    });
  }
  onClose() {
    this.activityForm.reset();
    this.dialogRef.close();
  }
  onSave() {
    this.dialogRef.close(this.activityForm.value);
    this.activityForm.reset();
  }

  getvaluesfromChild(value) {
    this.activityForm.controls["otherActivities"].patchValue(value);
  }

  onClear() {
    this.activityForm.patchValue({
      selecetdActivities: [],
      otherActivities: []
    });
    this.othertypeChildComponent.clearAll();
  }
}
