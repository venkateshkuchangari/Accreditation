import { Component, OnInit, Inject } from "@angular/core";
import { _Service_Terms } from "./service-terms.model";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-service-terms-modal",
  templateUrl: "./service-terms-modal.component.html",
  styleUrls: ["./service-terms-modal.component.scss"]
})
export class ServiceTermsModalComponent implements OnInit {
  info = _Service_Terms;
  constructor(
    public dialogRef: MatDialogRef<ServiceTermsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}
  goToBack() {
    this.dialogRef.close();
  }

  goContinue() {
    this.dialogRef.close(1);
  }
}
