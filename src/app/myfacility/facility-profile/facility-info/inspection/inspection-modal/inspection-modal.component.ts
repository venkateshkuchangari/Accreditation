import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  formValidations,
  MyErrorStateMatcher
} from "src/app/shared/form-validations";
import { FileUploadComponent } from "src/app/shared/file-upload/file-upload.component";
import { LookupService } from "src/app/shared/lookup.service";
import { _Document_Type_Ids } from "src/app/shared/application-constants";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-inspection-modal",
  templateUrl: "./inspection-modal.component.html",
  styleUrls: ["./inspection-modal.component.scss"]
})
export class InspectionModalComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  maxDate;
  inspectionList = [];
  fileList: FileList;
  fileId = "";
  disableUpload = true;
  showAgencyName = false;
  fileName = "";
  documentTypeId = _Document_Type_Ids.inspection_document_id;
  inspectionId;
  existingFileMetadatas = [];
  objectProps = [];
  @ViewChild(FileUploadComponent) private fileUpload: FileUploadComponent;
  inspectionForm = new FormGroup({
    inspectionDate: formValidations.inspectionDate,
    agencyId: formValidations.agencyId,
    agencyName: formValidations.inspectionAgencyName,
    fileMetaDatas: new FormControl("", [Validators.required])
  });
  minDate: Date;
  constructor(
    private lookupService: LookupService,
    public dialogRef: MatDialogRef<InspectionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _datepipe: DatePipe
  ) {}

  ngOnInit() {
    this.maxDate = new Date();
    this.minDate = new Date("1/1/" + (this.maxDate.getFullYear() - 5));
    this.getInspectionAgencyTypes();
    if (this.data != null) {
      this.inspectionForm.patchValue({
        inspectionId: this.data.inspectionId,
        inspectionDate: this.lookupService.getFormattedDate(
          this.data.inspectionDate
        ),
        agencyId: this.data.agencyId,
        agencyName: this.data.agency,
        fileMetaDatas: this.data.fileMetaDatas
      });
      this.existingFileMetadatas = this.data.fileMetaDatas;
    }
  }

  getInspectionAgencyTypes() {
    this.lookupService.getInspectionAgencyTypes().subscribe(
      response => {
        this.inspectionList = response;
        if (this.data != null) {
          this.selectedAgency(this.data.agencyId);
        }
      },
      error => {}
    );
  }
  onClose() {
    this.dialogRef.close();
    this.inspectionForm.reset();
  }
  onClear() {
    this.inspectionForm.reset();
    this.fileUpload.onFilesClear();
  }
  onSave() {
    this.dialogRef.close(this.inspectionForm.value);
    this.inspectionForm.reset();
  }
  selectedAgency(value) {
    this.inspectionList.forEach(element => {
      if (element.id == value) {
        this.showAgencyName = element.isAgencyNameRequired;
        if (this.showAgencyName) {
          this.inspectionForm.get("agencyName").enable();
        } else {
          this.inspectionForm.get("agencyName").disable();
        }
      }
    });
  }

  getFilesfromChild(event) {
    this.inspectionForm.controls["fileMetaDatas"].patchValue(event);
  }
}
