import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApplicationService } from '../../myapplication.service';
import { HttpoptionsService } from 'src/app/shared/httpoptions.service';

@Component({
  selector: 'app-application-landing-modal',
  templateUrl: './application-landing-modal.component.html',
  styleUrls: ['./application-landing-modal.component.scss']
})
export class ApplicationLandingModalComponent implements OnInit {
  appId: number;
  details: any;
  dataLoaded: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<ApplicationLandingModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private myApplicationService: ApplicationService,
    private httpOptionService: HttpoptionsService,
  ) { }

  ngOnInit() {
    this.appId = this.dialogData;
    this.showApplicationFacilitiesInfo(this.appId);
  }

  showApplicationFacilitiesInfo(appId) {
    this.myApplicationService.getApplicationProgramsPreview(appId).subscribe(
      response => {
        this.details = response;
        this.dataLoaded = true;
      },
      error => {
        this.httpOptionService.handleError(error);
      }
    );
  }

  onClose() {
    this.dialogRef.close();
  }
}
