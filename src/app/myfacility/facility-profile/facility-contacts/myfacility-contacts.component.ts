import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MyFacilityService } from '../../services/myfacility.service';
import { ModalService } from '../../../shared/modal/modal.service';
import { ContactModalComponent } from './contact-modal/contact-modal.component';
import { ApplicationService } from '../../../myapplication/myapplication.service';
import { HttpoptionsService } from '../../../shared/httpoptions.service';
import { ActivatedRoute, Params } from '../../../../../node_modules/@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-myfacility-contacts',
  templateUrl: './myfacility-contacts.component.html',
  styleUrls: ['./myfacility-contacts.component.scss']
})
export class MyFacilityContactsComponent implements OnInit {
  eprofileId: any;
  subscription: Subscription;
  personContacts = [];
  dataLoaded:boolean=false;
  constructor(
    private modalService: ModalService,
    private myFacilityService: MyFacilityService,
    private myApplicationService: ApplicationService,
    private httpOptionsService: HttpoptionsService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.myFacilityService.setToolBarHeader("Contact Details")
    this.subscription = this.activatedRoute.queryParams.subscribe(
      queryParams => {
        this.showcontactInfo();
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  addContactDetails() {
    const addContactDetailsRef = this.modalService.open(ContactModalComponent, {
      width: '1000px',
      data:null 
     });
    addContactDetailsRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.saveOrganizationContact(result);
      }
    });
  }

  saveOrganizationContact(result: any) {
    this.myFacilityService.postOrganizationContact(result)
      .subscribe(
        (response) => {
          this.modalService.confirm("Your Contact is Saved", 'Success', () => { this.showcontactInfo() })
        },
        (error) => {
          this.httpOptionsService.handleError(error);
        }
      )
  }
  editContactDetails(contact: any) {
    const editContactDetailsRef = this.modalService.open(ContactModalComponent, {
      width: '1000px',
      data: {      
        contact: contact,
      }
    });
    editContactDetailsRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.updateOrganizationContact(result, contact.organizationContactID);
      }

    });
  }

  updateOrganizationContact(result: any, organizationContactID: number) {
    this.myFacilityService
      .putOrganizationContact(result, organizationContactID)
      .subscribe(
        response => {
            this.modalService.confirm(
              "Your Contact is Updated",
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
  deleteContactDetails(org_contact_id: any) {
    this.myFacilityService.deleteOrganizationContact(org_contact_id)
      .subscribe((response) => {
          this.modalService.confirm("Your Contact is Deleted", 'Success', () => { this.showcontactInfo() })
      },
        (error) => {
            this.httpOptionsService.handleError(error);
        }
      )
  }
  showcontactInfo() {
    this.dataLoaded=false;
    if (this.myFacilityService.OrganisationId == undefined) {
      setTimeout(() => {
        this.showcontactInfo();
      }, 300);
    } else {
      this.myFacilityService.getOrganizationContacts()
        .subscribe((data) => {
          this.personContacts = data.organizationContactInfoDetails;
          this.checkifValid();
          this.dataLoaded=true;
        },
          (error) => {
            this.httpOptionsService.handleError(error);
          })
    }
  }

  checkifValid() {
    if (this.personContacts.length != 0) {
      this.myApplicationService.setEnableNextClick(true);
    } else {
      this.myApplicationService.setEnableNextClick(false);
    }
  }
}
