import { Component, OnInit } from '@angular/core';
import { LookupService } from '../shared/lookup.service';
import { HttpoptionsService } from '../shared/httpoptions.service';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dataLoaded: boolean = false;
  constructor(private lookupService: LookupService,
    private httpOptionsService: HttpoptionsService,
    private dashboardService: DashboardService) { }

  ngOnInit() {
    this.getMenuAccessData();
    this.getLookUpData();
    this.getTitleLookup();
    this.getGenderTypeLookup();
    this.getuserNotification();
  }

  getGenderTypeLookup() {
    this.lookupService.getGenderTypeLookup()
      .subscribe((data) => {
        this.lookupService.set_gender_lookup(data);
      },
        (error) => {
        })
  }

  getLookUpData() {
    this.lookupService.getLookUpData()
      .subscribe((data) => {
        this.lookupService.set_lookup_data(data);
      },
        (error) => {
        })

  }

  getTitleLookup() {
    this.lookupService.getTitleLookup()
      .subscribe((data) => {
        this.lookupService.set_title_lookup(data)
      }, (error) => {
      })
  }

  getMenuAccessData() {
    this.dashboardService.getUserMenuData()
      .subscribe((response) => {
        this.dashboardService.set_menu_access_data(response)
        this.dataLoaded = true
      }, (error) => {
        this.httpOptionsService.handleError(error);
      })
  }

  getuserNotification(){
    this.dashboardService.getnotification()
    .subscribe((data) => {
      this.dashboardService.set_notification(data);
    },
      (error) => {
      })
  }

}



