import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MyFacilityService } from '../services/myfacility.service';
import { _Menu_items } from 'src/app/shared/application-constants';
import { MenuAccessGaurd } from 'src/app/shared/access-gaurd/access-gaurd.service';

@Component({
  selector: 'app-myfacility-details',
  templateUrl: './myfacility-details.component.html',
  styleUrls: ['./myfacility-details.component.scss']
})
export class MyFacilityDetailComponent implements OnInit {
   organizationid;
   eprofileId;
   _toolbar_header;
   tabs_menu_access=[]
  constructor(private activatedRoute: ActivatedRoute,
     private myFacilityService: MyFacilityService,
     private accessGaurd:MenuAccessGaurd) { }

  ngOnInit() {
    this.myFacilityService.get_tool_bar_header.subscribe((data)=>this._toolbar_header=data)
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          this.organizationid = params['id'];
         this.myFacilityService.setOrganisationId(this.organizationid);
        }
      );
    this.eprofileId = this.activatedRoute.snapshot.queryParams.eprofileid;
   this.tabs_menu_access=this.tabs.map((element)=>{
     return this.getMenuAccess(element.menu_access_id)
   })
}

  tabs = [
    {name:'Facility Info',url:'./',menu_access_id:_Menu_items.facility_info},
    { name: 'Contact', url: 'contacts',menu_access_id:_Menu_items.org_contact },
    { name: 'Ownership', url: 'ownership',menu_access_id:_Menu_items.ownership },
    { name: 'Facility Licenses', url: 'facilityLicense',menu_access_id:_Menu_items.facility_licenses },
    { name: 'Staff Licenses', url: 'individualLicense',menu_access_id:_Menu_items.staff_licenses},
    { name: 'Applications', url:'fac_application',menu_access_id:_Menu_items.org_applications },
    { name: 'Documents',url:"",menu_access_id:_Menu_items.org_documents  }
  ]

  getMenuAccess(id: number): boolean {
    return this.accessGaurd.checkAccesstoMenu(id);
  }
}
