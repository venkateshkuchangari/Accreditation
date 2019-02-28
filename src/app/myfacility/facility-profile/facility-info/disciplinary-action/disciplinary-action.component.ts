import { Component, OnInit } from '@angular/core';
import { MyFacilityService } from 'src/app/myfacility/services/myfacility.service';
import { HttpoptionsService } from 'src/app/shared/httpoptions.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-disciplinary-action',
  templateUrl: './disciplinary-action.component.html',
  styleUrls: ['./disciplinary-action.component.scss']
})
export class DisciplinaryActionComponent implements OnInit {
  columnDefs : any;
  rowData = [];
  subscription: Subscription;
  disciplinaryactionmsg = "Disciplanary Actions on File";
  dataLoaded: boolean = false;
  constructor(
    public myFacilityInfoService: MyFacilityService,
    private httpoptionsservice: HttpoptionsService,
    private _datePipe: DatePipe,
    private activatedRoute: ActivatedRoute,
  ) {
    let a = this;
    this.columnDefs = [
      {
        headerName: "State",
        field: "stateName",
        width: 50,
      },
      {
        headerName: "Action",
        field: "disciplinaryAction",
        width: 300,
        cellClass: "cell-wrap-text",
        autoHeight: true
      },
      {
        headerName: "Date",
        field: "disciplinaryActionDate",
        width: 50,
        filter: "agDateColumnFilter",
        valueFormatter: function(param) {
          return param.data.disciplinaryActionDate == null
            ? ""
            : a._datePipe.transform(param.data.disciplinaryActionDate, "MM/dd/yyyy");
        }
      },
    ];
  }
  ngOnInit() {
    this.subscription = this.activatedRoute.queryParams.subscribe(
      queryParams => {
        this.showDisciplinaryActions();
      }
    );
  }

  showDisciplinaryActions() {
    if (this.myFacilityInfoService.OrganisationId == undefined) {
      setTimeout(() => {
        this.showDisciplinaryActions();
      }, 300);
    } else {
      this.myFacilityInfoService.getDisciplinaryActions().subscribe(
        data => {          
            this.dataLoaded = true;
            this.rowData = data;
        },
        error => {
          this.httpoptionsservice.handleError(error);
        }
      );
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
