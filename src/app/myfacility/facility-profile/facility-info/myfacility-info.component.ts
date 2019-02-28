import { Component, OnInit } from "@angular/core";
import { MyFacilityService } from "../../services/myfacility.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ModalService } from "../../../shared/modal/modal.service";
import { HttpoptionsService } from "../../../shared/httpoptions.service";
import { ApplicationService } from "src/app/myapplication/myapplication.service";
import { MenuAccessGaurd } from "src/app/shared/access-gaurd/access-gaurd.service";
import { _Menu_items } from "src/app/shared/application-constants";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-myfacility-info",
  templateUrl: "./myfacility-info.component.html",
  styleUrls: ["./myfacility-info.component.scss"],
  providers: [DatePipe]
})
export class MyFacilityInfoComponent implements OnInit {
  constructor(
    private myFacilityService: MyFacilityService,
    private myApplicationService: ApplicationService,
    private activatedRoute: ActivatedRoute,
    private accessGaurd: MenuAccessGaurd
  ) {}

  actionIdonRoutes: string;
  tabIndexNumber = 0;
  tabsAccessIds = [
    {
      menu_access_id: _Menu_items.org_details
    },
    {
      menu_access_id: _Menu_items.business_information
    },
    {
      menu_access_id: _Menu_items.pharmacy_activities
    },
    {
      menu_access_id: _Menu_items.inspection_history
    },
    {
      menu_access_id: _Menu_items.accreditation_history
    }
  ];

  tabs_menu_access=[]

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.actionIdonRoutes = params["modeid"];
    });
    if (this.actionIdonRoutes == "_rev_accr9") {
      this.myApplicationService._get_organization_tabindex_number.subscribe(value => {
        this.tabIndexNumber = value;
      });
    }
    this.myFacilityService.setToolBarHeader("Facility Details");
    this.tabs_menu_access=this.tabsAccessIds.map((element)=>{
      return this.getMenuAccess(element.menu_access_id)
    })
  }

  getMenuAccess(id: number): boolean {
    return this.accessGaurd.checkAccesstoMenu(id);
  }
}
