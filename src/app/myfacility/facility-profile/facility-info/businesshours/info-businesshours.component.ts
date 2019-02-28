import { Component, OnInit, Input, OnDestroy, ViewChild } from "@angular/core";
import "ag-grid-enterprise";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { MatDialog, MatDatepickerInputEvent } from "@angular/material";
import { BusinessHoursModalComponent } from "./businesshours-modal/businesshours-modal.component";
import { ModalService } from "../../../../shared/modal/modal.service";
import { MyFacilityService } from "../../../services/myfacility.service";
import { HttpoptionsService } from "src/app/shared/httpoptions.service";
import { FileUploadComponent } from "../../../../shared/file-upload/file-upload.component";
import { ApplicationService } from "../../../../myapplication/myapplication.service";
import {
  _Question_Categories,
  _Question_Ids,
  _Document_Type_Ids
} from "src/app/shared/application-constants";
import { ENTER, COMMA } from "@angular/cdk/keycodes";
import { Subscription } from "rxjs";

@Component({
  selector: "app-info-businesshours",
  templateUrl: "./info-businesshours.component.html",
  styleUrls: ["./info-businesshours.component.scss"]
})
export class InfoBusinessHoursComponent implements OnInit, OnDestroy {
  businesshoursCount: number;
  schematicFileCount: number;
  storeFileCount: number;
  businesshoursdataLoaded = false;
  schematicdataLoaded = false;
  storeFrontdataLoaded = false;
  actionIdonRoutes: string;
  businessHours = [];
  SchematicPreviewURL = "";
  StorefrontPreviewURL = "";
  subscription: Subscription;
  isFileRequired: boolean = false;
  existingSchematicFileMetadatas = [];
  existingStoreFileMetadatas = [];
  balckOutDates = [];
  submitStoreFile = [];
  schematicQuestionId = _Question_Ids.schematic_QuestionId;
  storeFrontQuestionId = _Question_Ids.storefront_QuestionId;
  schematicDocumentId=_Document_Type_Ids.schematic_document_id;
  storeFrontDocumentId=_Document_Type_Ids.storefront_document_id;
  selectable = true;
  removable = false;
  showPicker = false;
  editMode = false;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild("schematic") private schematicfileUpload: FileUploadComponent;
  @ViewChild("storefront") private storefrontfileUpload: FileUploadComponent;
  constructor(
    private httpOptionService: HttpoptionsService,
    private myFacilityService: MyFacilityService,
    public modalService: ModalService,
    private activatedRoute: ActivatedRoute,
    private myapplicationService: ApplicationService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.actionIdonRoutes = params["modeid"];
    });
    this.subscription = this.activatedRoute.queryParams.subscribe(
      queryParams => {
        if (this.actionIdonRoutes == "_rev_accr9") {
          this.getBlackOutDates();
          this.isFileRequired = true;
        }
        this.showBusinessHoursInfo();
        this.getSchematicDiagramFiles();
        this.getStoreFrontFiles();
      }
    );
  }
  openbusinessHoursDialog(): void {
    const businessHoursDialogRef = this.modalService.open(
      BusinessHoursModalComponent,
      {
        width: "800px",
        data: {
          businessHours: this.businessHours
        }
      }
    );

    businessHoursDialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.postBusinessHoursInfo(result);
      }
    });
  }

  showBusinessHoursInfo() {
    if (this.myFacilityService.OrganisationId == undefined) {
      setTimeout(() => {
        this.showBusinessHoursInfo();
      }, 300);
    } else {
      this.myFacilityService.getBusinessHoursInfo().subscribe(
        data => {
          this.businessHours = data;
          this.businesshoursCount = Object.keys(data).length;
          this.businesshoursdataLoaded = true;
          this.checkifValid();
        },
        error => {
          this.httpOptionService.handleError(error);
        }
      );
    }
  }

  postBusinessHoursInfo(result: any) {
    this.myFacilityService
      .putOrganizationBusinessHours(JSON.stringify(Object.values(result)))
      .subscribe(
        response => {
            this.modalService.confirm(
              "Your Information is Updated",
              "Success",
              () => {
                this.showBusinessHoursInfo();
              }
            );
        },
        error => {
          this.httpOptionService.handleError(error);
        }
      );
  }

  convertTo12hrs(time) {
    if (time == "" || time == null) {
      return "";
    } else if (time.slice(-2) == "AM" || time.slice(-2) == "PM") {
      return time;
    } else if (time.slice(0, 2) <= 12) {
      return time + " AM";
    } else {
      return -12 + parseInt(time.slice(0, 2)) + time.slice(2, 5) + " PM";
    }
  }

  getSchematicDiagramFiles() {
    this.myFacilityService
      .getFileperQuestion(this.schematicQuestionId)
      .subscribe(data => {
        this.schematicdataLoaded = true;
        if (data != null && data.fileMetaDatas.length != 0) {
          this.existingSchematicFileMetadatas = data.fileMetaDatas;
          this.schematicFileCount = this.existingSchematicFileMetadatas.length;
          this.checkifValid();
          this.getFileDownloadUrl(
            this.existingSchematicFileMetadatas[0].fileId,
            1
          );
        }
      });
  }

  getStoreFrontFiles() {
    this.myFacilityService
      .getFileperQuestion(this.storeFrontQuestionId)
      .subscribe(data => {
        this.storeFrontdataLoaded = true;
        if (data != null && data.fileMetaDatas.length != 0) {
          this.existingStoreFileMetadatas = data.fileMetaDatas;
          this.storeFileCount = this.existingStoreFileMetadatas.length;
          this.checkifValid();
          this.getFileDownloadUrl(this.existingStoreFileMetadatas[0].fileId, 2);
        }
      });
  }

  getFileDownloadUrl(fileId: any, id: number) {
    this.myFacilityService.getFileDownloadUrl(fileId).subscribe(
      response => {
        if (id == 1) {
          this.SchematicPreviewURL = response.downloadUrl;
        } else if (id == 2) {
          this.StorefrontPreviewURL = response.downloadUrl;
        }
      },
      error => {
      }
    );
  }
  getFilesfromChild(event, index) {
    if (event.length > 0) {
      let body = {
        fileMetaDatas: event
      };
      if (index == 1) {
        this.postStoreQuestions(body, this.schematicQuestionId);
      } else if (index == 2) {
        this.postStoreQuestions(body, this.storeFrontQuestionId);
      }
    }
  }

  postStoreQuestions(submitStoreFile: any, questionId: number) {
    this.myFacilityService
      .postFileperQuestion(submitStoreFile, questionId)
      .subscribe(
        success => {
          this.modalService.confirm(
            "File has been saved successfully",
            "Success!!!",
            () => {
              this.showBusinessHoursInfo();
              this.getSchematicDiagramFiles();
              this.getStoreFrontFiles();
              this.schematicfileUpload.onFilesClear();
              this.storefrontfileUpload.onFilesClear();
            }
          );
        },
        error => {
          this.httpOptionService.handleError(error);
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getBlackOutDates() {
  if (this.myapplicationService.OrganisationId == undefined) {
      setTimeout(() => {
        this.getBlackOutDates();
      }, 300);
    } else {
      this.myapplicationService.getBlackoutDates().subscribe(
        response => {
          if (response != null) {
            this.balckOutDates = response.blackOutDates;
          }
        },
        error => {
          this.httpOptionService.handleError(error);
        }
      );
    }
  }

  add(event: MatDatepickerInputEvent<Date>) {
    const input = event.target;
    const value = event.value;
    if (value || "") {
      let exist = this.balckOutDates.find(element => {
        return (
          new Date(element).toDateString() == new Date(value).toDateString()
        );
      });
      if (exist == undefined) {
        this.balckOutDates.push(value);
      }
    }
    if (input) {
      input.value = new Date("");
    }
  }
  editBlackOutDates() {
    this.removable = true;
    this.showPicker = true;
    this.editMode = true;
  }

  saveBlackOutDates() {
    let body = {
      blackOutDates: this.balckOutDates
    };
    this.myapplicationService.updateBlackoutDates(body).subscribe(
      response => {
        this.modalService.confirm(
          "Blackout Dates for this facility are updated",
          "Success!!",
          () => {
            this.getBlackOutDates();
            this.editMode = false;
            this.removable = false;
            this.showPicker = false;
          }
        );
      },
      error => {
        this.httpOptionService.handleError(error);
      }
    );
  }

  remove(date: any): void {
    const index = this.balckOutDates.indexOf(date);
    if (index >= 0) {
      this.balckOutDates.splice(index, 1);
    }
  }

  checkifValid() {
    if (
      this.businesshoursCount == 7 &&
      this.schematicFileCount == 1 &&
      this.storeFileCount == 1
    ) {
      this.myapplicationService.setEnableNextClick(true);
    } else {
      this.myapplicationService.setEnableNextClick(false);
    }
  }
}
