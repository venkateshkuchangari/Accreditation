import { Component, OnInit } from '@angular/core';
import { MyFacilityService } from '../../services/myfacility.service';
import { DatePipe } from '@angular/common';
import { HttpoptionsService } from '../../../shared/httpoptions.service';


@Component({
  selector: 'app-facility-applications',
  templateUrl: './facility-applications.component.html',
  styleUrls: ['./facility-applications.component.scss'],
  providers: [DatePipe]
})
export class FacilityApplicationsComponent implements OnInit {
  rowData = []
  columnDefs
  dataLoaded=false

  constructor(private myFacilityInfoService: MyFacilityService,
    private datepipe: DatePipe, private httpOptionsService: HttpoptionsService) {
    this.columnDefs = [

      {
        headerName: "Status",
        field: "status",
        rowGroup: true,
        hide: true
      },
      {
        headerName: "Program",
        field: "program"
      },
      {
        headerName: "Application ID",
        field: "parentApplicationId"
      },
      {
        headerName: "Submitted Date",
        field: "submittedDate",
      },
      {
        headerName: "Valid From",
        field: "applicationValidFrom",
      },
      {
        headerName: "Valid To",
        field: "applicationValidTo",
      },
      {
        headerName: "Completed Date",
        field: "applicationCompletedDate",
      }
    ]
  }

  ngOnInit() {
    this.myFacilityInfoService.setToolBarHeader("Applications")
    this.myFacilityInfoService.getFacilityApplications()
      .subscribe(
        (data) => {
          this.dateFormat(data)
          this.rowData = data;
          this.dataLoaded=true
        },
        (error) => {
          this.httpOptionsService.handleError(error);
        })
  }
  dateFormat(data) {
    data.forEach(data => {
      data.submittedDate = this.datepipe.transform(data.submittedDate, 'shortDate')
      data.applicationValidFrom = this.datepipe.transform(data.applicationValidFrom, 'shortDate')
      data.applicationValidTo = this.datepipe.transform(data.applicationValidTo, 'shortDate')
      data.applicationCompletedDate = this.datepipe.transform(data.applicationCompletedDate, 'shortDate')

    }
    );



  }
}

