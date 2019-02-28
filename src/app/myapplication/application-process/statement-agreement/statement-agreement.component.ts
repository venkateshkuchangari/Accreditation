import { Component, Inject } from "@angular/core";
import { _Agreement_Statement, _Agreement_Checkbox_Text } from "./statement.model";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "statement-agreement",
  templateUrl: "statement-agreement.component.html",
  styleUrls: ["statement-agreement.component.scss"]
})
export class StatementAgreementComponent {
  info = _Agreement_Statement;
  checkboxText = _Agreement_Checkbox_Text;
  agreementCheckboxChecked: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<StatementAgreementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  goToBack() {
    this.dialogRef.close();
  }

  agreementCheckboxChanged(event) {
    this.agreementCheckboxChecked = event.checked;
  }

  goContinue() {
    this.dialogRef.close(this.agreementCheckboxChecked);
  }
}
