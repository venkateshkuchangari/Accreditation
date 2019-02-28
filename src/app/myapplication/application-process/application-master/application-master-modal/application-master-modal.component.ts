import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
export interface ConfirmDialogData {
  title?: string;
  message: string;
  cancelButton: string;
  okButton: string;
  onOkCallBack?: Function;
  onCancelCallBack?: Function;
}

@Component({
  selector: "app-application-master-modal",
  templateUrl: "./application-master-modal.component.html",
  styleUrls: ["./application-master-modal.component.scss"]
})
export class ApplicationMasterModalComponent implements OnInit {
  constructor(
    public dialog: MatDialogRef<ApplicationMasterModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  ngOnInit() {}

  save() {
    this.data.onOkCallBack();
  }
  cancel() {
    this.data.onCancelCallBack();
  }
}
