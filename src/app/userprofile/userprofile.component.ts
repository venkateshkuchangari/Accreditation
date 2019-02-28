import { Component, OnInit } from "@angular/core";
import { ModalService } from "../shared/modal/modal.service";
import { HttpoptionsService } from "../shared/httpoptions.service";
import { DashboardService } from "../dashboard/services/dashboard.service";
import { UsercontactmodalComponent } from "./usercontactmodal/usercontactmodal.component";

@Component({
  selector: "app-userprofile",
  templateUrl: "./userprofile.component.html",
  styleUrls: ["./userprofile.component.scss"]
})
export class UserprofileComponent implements OnInit {
  dataFetched: boolean = false;
  userContact: any;
  constructor(
    private modalService: ModalService,
    private httpOptionsService: HttpoptionsService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit() {
    this.showcontactInfo();
  }

  editContactDetails() {
    const editUserContactDetailsRef = this.modalService.open(
      UsercontactmodalComponent,
      {
        width: "1000px",
        data:this.userContact
      }
    );
    editUserContactDetailsRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.dashboardService.putUserContact(result).subscribe(
          response => {
            this.modalService.confirm(
              "Your Contact is updated",
              "Success",
              () => {
                this.showcontactInfo();
              }
            );
          },
          error => {
            this.httpOptionsService.handleError(error);
          }
        );
      }
    });
  }

  showcontactInfo() {
    this.dashboardService.getUserContacts().subscribe(
      data => {
        this.userContact = data[0];
        this.dataFetched = true;
      },
      error => {
        this.httpOptionsService.handleError(error);
      }
    );
  }
}
