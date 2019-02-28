import { Component, OnInit } from "@angular/core";
import { MyFacilityService } from "../../services/myfacility.service";
import { _Menu_items } from "src/app/shared/application-constants";
import { MenuAccessGaurd } from "src/app/shared/access-gaurd/access-gaurd.service";

@Component({
  selector: "app-myfacility-ownership",
  templateUrl: "./myfacility-ownership.component.html",
  styleUrls: ["./myfacility-ownership.component.scss"]
})
export class MyFacilityOwnershipComponent implements OnInit {
  constructor(public myFacilityService: MyFacilityService,
    private accessGaurd:MenuAccessGaurd) { }
  tabsAccessIds = [
    {
      menu_access_id: _Menu_items.individual_owners
    },
    {
      menu_access_id: _Menu_items.company_owners
    }
  ]
  tabs_menu_access=[]
  ngOnInit() {
    this.myFacilityService.setToolBarHeader("Ownership Details");
    this.tabs_menu_access=this.tabsAccessIds.map((element)=>{
      return this.getMenuAccess(element.menu_access_id)
    })
  }

  getMenuAccess(id: number): boolean {
    return this.accessGaurd.checkAccesstoMenu(id);
  }
}
