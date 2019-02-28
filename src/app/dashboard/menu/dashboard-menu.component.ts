import { Component, OnInit } from "@angular/core";
import { DashboardService } from "../services/dashboard.service";
import { ModalService } from "../../shared/modal/modal.service";
import { HttpoptionsService } from "../../shared/httpoptions.service";
import { ContactModalComponent } from "src/app/myfacility/facility-profile/facility-contacts/contact-modal/contact-modal.component";
import { _Dashboard_Menu_Tiles } from "src/app/shared/application-constants";
import { MenuAccessGaurd } from "src/app/shared/access-gaurd/access-gaurd.service";
import { UsercontactmodalComponent } from "src/app/userprofile/usercontactmodal/usercontactmodal.component";
import { ServiceTermsModalComponent } from "../service-terms-modal/service-terms-modal.component";
import { AuthService } from "src/app/auth/services/auth.service";

@Component({
  selector: "app-dashboard-menu",
  templateUrl: "./dashboard-menu.component.html",
  styleUrls: ["./dashboard-menu.component.scss"]
})
export class DashboardMenuComponent implements OnInit {
  eProfileId: number;
  userContactData = [];
  dataLoaded: boolean = false;
  tiles = _Dashboard_Menu_Tiles;
  tiles_access = [];
  constructor(
    private modalService: ModalService,
    private dashboardService: DashboardService,
    private httpOptionsService: HttpoptionsService,
    private accessGaurd: MenuAccessGaurd,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.tiles_access = this.tiles.map(element => {
      return this.getMenuAccess(element.menu_access_id);
    });
    this.getUserContact();
  }

  openPostUserContactDioalog() {
    const userContactDioalogRef = this.modalService.open(
      ContactModalComponent,
      {
        width: "1000px",
        data: 0
      }
    );
    userContactDioalogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.postUserContact(result);
      } else {
        this.openPostUserContactDioalog();
      }
    });
  }

  getUserContact() {
    this.dataLoaded = false;
    this.dashboardService.getUserContacts().subscribe(
      response => {
        this.userContactData = response;
        if (
          this.userContactData.length === 0 ||
          !this.userContactData[0].address1
        ) {
          this.openServiceTermsDialog();
        } else {
          this.dataLoaded = true;
        }
      },
      error => {
        if (error.status != 401) this.httpOptionsService.handleError(error);
      }
    );
  }

  postUserContact(result) {
    this.dashboardService.postAccountUserContact(result).subscribe(
      response => {
        this.modalService.confirm("Your Contact is Saved", "Success", () => {
          this.dataLoaded = true;
        });
      },
      error => {
        this.openPostUserContactDioalog();
        this.httpOptionsService.handleError(error);
      }
    );
  }

  openUpdateUserContactDialog() {
    const updateContactDioalogRef = this.modalService.open(
      UsercontactmodalComponent,
      {
        width: "1000px"
      }
    );
    updateContactDioalogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.updateUserContact(result);
      } else {
        this.openUpdateUserContactDialog();
      }
    });
  }
  getMenuAccess(id: number): boolean {
    return this.accessGaurd.checkAccesstoMenu(id);
  }

  updateUserContact(result: any) {
    this.dashboardService.putUserContact(result).subscribe(
      response => {
        this.modalService.confirm("Your Contact is updated", "Success", () => {
          this.dataLoaded = true;
        });
      },
      error => {
        this.openUpdateUserContactDialog();
        this.httpOptionsService.handleError(error);
      }
    );
  }

  openServiceTermsDialog() {
    const openServiceTermsDialogRef = this.modalService.open(
      ServiceTermsModalComponent,
      {
        width: "800px"
      }
    );
    openServiceTermsDialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.userContactData.length === 0) {
          this.openPostUserContactDioalog();
        } else {
          this.openUpdateUserContactDialog();
        }
      } else {
        this.onLogOut();
      }
    });
  }

  onLogOut() {
    this.authService.logout();
    // this.document.location.href = environment.OVID_BASE_URL + "Splash";
  }
}
