import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DashboardService } from '../dashboard/services/dashboard.service';
import { HttpoptionsService } from '../shared/httpoptions.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './user-alerts.component.html',
  styleUrls: ['./user-alerts.component.scss']
})

export class UserAlertsComponent implements OnInit
{
  alertList= [];
  dataLoaded : boolean;
  alertIdonRoutes: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private dashboardService: DashboardService,
    private httpOptionsService: HttpoptionsService,
  ) { 
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.alertIdonRoutes = params["alertid"];
    });
    this.get_single_notification();
  }

  get_single_notification() {
    this.dashboardService.get_notification.subscribe((element => {
      this.alertList = element;
      this.dataLoaded = true;
    }),
    (error) => {
      this.httpOptionsService.handleError(error);
    })
  }

}
