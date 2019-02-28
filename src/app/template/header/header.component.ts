import { Component, OnInit, Inject } from "@angular/core";
import { Router, NavigationExtras, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../auth/services/auth.service";
import {
  _Dashboard_Menu_Tiles,
  _User_Drop_Down
} from "src/app/shared/application-constants";
import { MenuAccessGaurd } from "src/app/shared/access-gaurd/access-gaurd.service";
import { DOCUMENT } from "@angular/common";
import { HttpoptionsService } from "src/app/shared/httpoptions.service";
import { DashboardService } from "src/app/dashboard/services/dashboard.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  isNotification: boolean = false;
  unreadAlerts = [];
  alertList = [];
  _userName: any;
  tiles = _Dashboard_Menu_Tiles;
  verticalMenuDropdown = _User_Drop_Down;
  tiles_access = [];
  constructor(
    private router: Router,
    private authService: AuthService,
    private accessGaurd: MenuAccessGaurd,
    @Inject(DOCUMENT) private document: any,
    private dashboardService: DashboardService,
    private httpOptionsService: HttpoptionsService
  ) {}

  ngOnInit() {
    this._userName = this.authService.get_loggedin_username();
    this.tiles_access = this.tiles.map(element => {
      return this.getMenuAccess(element.menu_access_id);
    });
    this.showListOfNotifications();
  }

  onLogOut() {
    this.authService.logout();   
    // this.document.location.href = environment.OVID_BASE_URL + "Splash";
  }

  getMenuAccess(id: number): boolean {
    return this.accessGaurd.checkAccesstoMenu(id);
  }

  showListOfNotifications() {
    this.dashboardService.getnotification().subscribe(
      data => {
        if (data) {
          this.alertList = data;
          this.unreadAlerts = this.alertList.filter(element => {
            return !element.isRead;
          });
        }
      },
      error => {
        this.httpOptionsService.handleError(error);
      }
    );
  }

  showNotification(data: any) {
    this.router.navigate(["/dashboard/alerts/", data.externalAuditMessageId]);
  }
}
