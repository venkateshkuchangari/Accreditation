import { Component, OnInit } from "@angular/core";
import { ApplicationService } from "../../myapplication.service";
import { MyFacilityService } from "../../../myfacility/services/myfacility.service";
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import { HttpoptionsService } from "../../../shared/httpoptions.service";
import { Subscription } from "rxjs";
import {
  applicationFlowStepsData,
  applicationFlowTabs,
  ApplicationStepData
} from "./application-master.model";
import {
  _Application_StepIds,
  _Facility_Info_TabIds,
  _Application_Questions_TabIds,
  Application_Confirm_Message,
  _Question_Categories
} from "src/app/shared/application-constants";
import { ModalService } from "src/app/shared/modal/modal.service";
import { ApplicationMasterModalComponent } from "./application-master-modal/application-master-modal.component";
import { AttestationModalComponent } from "../attestation-modal/attestation-modal.component";
import { LookupService } from "src/app/shared/lookup.service";

@Component({
  selector: "app-application-master",
  templateUrl: "./application-master.component.html",
  styleUrls: ["./application-master.component.scss"]
})
export class ApplicationMasterComponent implements OnInit {
  expandPanel = false;
  applicationFacilities = [];
  selectedFacility: any;
  stepFlowId = 0;
  subscription: Subscription;
  subscription1: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;
  enableNext: boolean;
  progressBarValue = 0;
  applicationStepIds = _Application_StepIds;
  tabs = applicationFlowTabs;
  applicationFlowSteps = applicationFlowStepsData;
  applicationTrackData: ApplicationStepData[] = [];
  parentApplicationId: number;
  constructor(
    private applicationService: ApplicationService,
    private myfacilityService: MyFacilityService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private lookupService: LookupService,
    private httpOptionsService: HttpoptionsService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.applicationTrackData = [];
    this.resetTabsData();
    this.subscription = this.activatedRoute.params.subscribe(params => {
      this.parentApplicationId = params["appid"];
      this.applicationService.setParentApplicationId(this.parentApplicationId);
      if (this.parentApplicationId != undefined) {
        this.getApplicationFacilities(this.parentApplicationId);
      }
    });
    this.applicationService.setApplicationTrackData([]);

    this.subscription1 = this.applicationService._enable_next_click.subscribe(
      value => {
        this.enableNext = value;
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscription1) {
      this.subscription1.unsubscribe();
    }
    if (this.subscription2) {
      this.subscription2.unsubscribe();
    }
    if (this.subscription3) {
      this.subscription3.unsubscribe();
    }
  }

  closePanel(event: any) {
    if (this.expandPanel) {
      this.expandPanel = false;
    }
  }

  openPanel() {
    this.expandPanel = true;
  }

  getApplicationFacilities(appId: number) {
    this.applicationService.getApplicationFacilities(appId).subscribe(
      response => {
        if (response != null) {
          this.applicationFacilities = response;
          this.selectedFacility = response[0];
          this.setOrganizationId(this.selectedFacility);
          this.getApplicationProgress();
        }
      },
      error => {
        this.httpOptionsService.handleError(error);
      }
    );
  }

  getStepTrackerId() {
    this.subscription2 = this.applicationService.get_step_tracker_id.subscribe(
      value => {
        if (value) {
          this.stepFlowId = value;
        }
      }
    );
    if (
      this.stepFlowId == _Application_StepIds.choose_programs ||
      this.stepFlowId == _Application_StepIds.review
    ) {
      // debugger;
      this.performGlobalValidation();
    } else {
      // debugger;
      this.navigateThroughSteps(this.stepFlowId);
    }
    this.getProgressValue();
    this.applicationService.setEnableNextClick(true);
  }

  changeFacilitySelection(event: any) {
    this.subscription3.unsubscribe();
    let result = this.applicationFacilities.find(element => {
      return element.organizationId == event;
    });
    this.selectedFacility = result;
    this.setOrganizationId(this.selectedFacility);
    this.getApplicationProgress();
  }

  setOrganizationId(facility: any) {
    this.myfacilityService.setOrganisationId(facility.organizationId);
    this.applicationService.setOrganisationId(facility.organizationId);
  }

  getProgressValue() {
    this.progressBarValue =
      100 *
      (this.applicationTrackData.length / this.applicationFlowSteps.length);
  }

  getApplicationProgress() {
    this.applicationService.getApplicationProgress().subscribe(
      response => {
        this.applicationTrackData = response;
        this.applicationService.setApplicationTrackData(
          this.applicationTrackData
        );
        this.processApplicationTrackData();
      },
      error => {
        this.httpOptionsService.handleError(error);
      }
    );
  }

  jumpToStep(ind: string | number) {
    let nextStep = this.tabs[ind].sequenceId;
    this.verifyCurrentStep();
    let childTabs = this.filterChildTabs(this.tabs[ind]);
    let progressTab = childTabs.find(element => {
      return element.inProgress;
    });
    if (progressTab != undefined) {
      nextStep = progressTab.sectionId;
    }
    while (this.checkifDependent(nextStep)) {
      nextStep--;
    }
    this.applicationService.checkStepTrackerId(this.stepFlowId, nextStep);
  }

  filterChildTabs(element) {
    let childTabs = this.applicationTrackData.filter(stepData => {
      return (
        stepData.sectionId < element.completionId &&
        stepData.sectionId >= element.sequenceId
      );
    });
    return childTabs;
  }

  verifyCurrentStep() {
    if (
      this.applicationTrackData.length != 0 &&
      this.stepFlowId != _Application_StepIds.review
    ) {
      let currentStepData = this.applicationTrackData.find(
        (element: ApplicationStepData) => {
          return element.sectionId == this.stepFlowId;
        }
      );
      if (currentStepData && !currentStepData.isAttempted) {
        this.stepFlowId--;
      }
      while (this.checkifDependent(this.stepFlowId)) {
        this.stepFlowId--;
      }
    } else {
      return;
    }
  }

  checkifDependent(stepId: number): boolean {
    return this.applicationFlowSteps.find(element => {
      return element.stepId == stepId;
    }).isdependent;
  }

  goToNextStep() {
    if (
      this.stepFlowId == _Application_StepIds.facility_info_bquestions ||
      this.stepFlowId == _Application_StepIds.ownership_question ||
      this.stepFlowId == _Application_StepIds.disciplinary_questions ||
      this.stepFlowId == _Application_StepIds.app_questions_general ||
      this.stepFlowId == _Application_StepIds.app_questions_supplychain ||
      this.stepFlowId == _Application_StepIds.app_questions_ecommerce ||
      this.stepFlowId == _Application_StepIds.app_questions_nuclearpharmacy ||
      this.stepFlowId == _Application_StepIds.app_questions_compounding ||
      this.stepFlowId == _Application_StepIds.choose_programs ||
      this.stepFlowId == _Application_StepIds.prog_questions_vpp
    ) {
      this.applicationService.setOnClickNext(true);
    } else {
      this.applicationService.checkStepTrackerId(
        this.stepFlowId,
        this.stepFlowId + 1
      );
    }
  }

  goToLastStep() {
    let nextStep = this.processNextStep(this.stepFlowId);
    this.verifyCurrentStep();
    this.applicationService.checkStepTrackerId(this.stepFlowId, nextStep);
  }

  processNextStep(stepId: number): number {
    let nStep = stepId - 1;
    while (this.checkifDependent(nStep)) {
      nStep--;
    }
    return nStep;
  }

  processApplicationTrackData() {
    this.subscription3 = this.applicationService._get_application_track_data.subscribe(
      data => {
        this.applicationTrackData = data;
        if (this.applicationTrackData.length != 0) {
          let currentStepData = this.applicationTrackData.find(
            (element: ApplicationStepData) => {
              return element.inProgress == true;
            }
          );
          this.stepFlowId = currentStepData.sectionId;
        } else {
          this.stepFlowId = _Application_StepIds.facility_info_details;
        }
        this.updateTabsData(this.applicationTrackData);
        this.applicationService.setStepTrackerId(this.stepFlowId);
        this.getStepTrackerId();
      }
    );
  }

  resetTabsData() {
    this.tabs.forEach(element => {
      element.isCompleted = false;
      element.isValid = false;
    });
  }

  updateTabsData(data: ApplicationStepData[]) {
    this.resetTabsData();
    this.tabs.forEach(element => {
      let childTabs = this.filterChildTabs(element);
      if (childTabs.length != 0) {
        element.isValid = childTabs.every(childTab => {
          return childTab.isValid;
        });
        element.isCompleted = childTabs.every(tabs => {
          return tabs.isAttempted;
        });
      }
    });
  }

  navigateThroughSteps(stepId: number) {
    let navigationExtras: NavigationExtras = {
      relativeTo: this.activatedRoute,
      queryParams: { facid: this.selectedFacility.organizationId },
      queryParamsHandling: "merge"
    };
    window.scroll(0, 0);
    switch (stepId) {
      case _Application_StepIds.facility_info_details:
        this.router.navigate(["./fac-review/_rev_accr9"], navigationExtras);
        this.applicationService.setOrganizationChildtabIndexNumber(
          _Facility_Info_TabIds.info_details
        );
        this.applicationService.setToolBarHeader("Facility Information Review");
        break;
      case _Application_StepIds.facility_info_bhours:
        this.router.navigate(["./fac-review/_rev_accr9"], navigationExtras);
        this.applicationService.setOrganizationChildtabIndexNumber(
          _Facility_Info_TabIds.info_bhours
        );
        this.applicationService.setToolBarHeader("Facility Information Review");
        break;
      case _Application_StepIds.facility_info_bquestions:
        this.router.navigate(["./fac-review/_rev_accr9"], navigationExtras);
        this.applicationService.setOrganizationChildtabIndexNumber(
          _Facility_Info_TabIds.info_bquestions
        );
        this.applicationService.setToolBarHeader("Facility Information Review");
        break;
      case _Application_StepIds.facility_info_pharmacyactivities:
        this.router.navigate(["./fac-review/_rev_accr9"], navigationExtras);
        this.applicationService.setOrganizationChildtabIndexNumber(
          _Facility_Info_TabIds.info_pharmacyactivities
        );
        this.applicationService.setToolBarHeader("Facility Information Review");
        break;
      case _Application_StepIds.facility_info_inspectionhistory:
        this.router.navigate(["./fac-review/_rev_accr9"], navigationExtras);
        this.applicationService.setOrganizationChildtabIndexNumber(
          _Facility_Info_TabIds.info_inspectionhistory
        );
        this.applicationService.setToolBarHeader("Facility Information Review");
        break;
      case _Application_StepIds.facility_info_accreditationhistory:
        this.router.navigate(["./fac-review/_rev_accr9"], navigationExtras);
        this.applicationService.setOrganizationChildtabIndexNumber(
          _Facility_Info_TabIds.info_accreditationhistory
        );
        this.applicationService.setToolBarHeader("Facility Information Review");
        break;
      case _Application_StepIds.facility_info_disciplinary_actions:
        this.router.navigate(["./fac-review/_rev_accr9"], navigationExtras);
        this.applicationService.setOrganizationChildtabIndexNumber(
          _Facility_Info_TabIds.info__disciplinary_actions
        );
        this.applicationService.setToolBarHeader("Facility Information Review");
        break;
      case _Application_StepIds.facility_contacts:
        this.router.navigate(["./contact-review"], navigationExtras);
        this.applicationService.setToolBarHeader("Facility Contact Review");
        break;
      case _Application_StepIds.ownership_question:
        this.router.navigate(["./owner-question"], navigationExtras);
        this.applicationService.setToolBarHeader("Facility Ownership Review");
        break;
      case _Application_StepIds.ownership_details:
        this.router.navigate(["./own-review"], navigationExtras);
        break;
      case _Application_StepIds.facility_licenses:
        this.router.navigate(["./faclicense-review"], navigationExtras);
        this.applicationService.setToolBarHeader("Facility License Review");
        break;
      case _Application_StepIds.staff_licenses:
        this.router.navigate(["./stafflicense-review"], navigationExtras);
        this.applicationService.setToolBarHeader("Staff License Review");
        break;
      case _Application_StepIds.disciplinary_questions:
        this.router.navigate(["./disciplinary-questions"], navigationExtras);
        this.applicationService.setToolBarHeader("Disciplinary Questions");
        break;
      case _Application_StepIds.app_questions_general:
        this.router.navigate(["./application-questions"], navigationExtras);
        this.applicationService.setApplicationCategoryTabIndex(
          _Application_Questions_TabIds.questions_general
        );
        this.applicationService.setToolBarHeader(
          "Application General Questions"
        );
        break;
      case _Application_StepIds.app_questions_supplychain:
        this.router.navigate(["./application-questions"], navigationExtras);
        this.applicationService.setApplicationCategoryTabIndex(
          _Application_Questions_TabIds.questions_supplychain
        );
        this.applicationService.setToolBarHeader(
          "Application Supply Chain Questions"
        );
        break;
      case _Application_StepIds.app_questions_ecommerce:
        this.router.navigate(["./application-questions"], navigationExtras);
        this.applicationService.setApplicationCategoryTabIndex(
          _Application_Questions_TabIds.questions_ecommerce
        );
        this.applicationService.setToolBarHeader(
          "Application e-Commerce Questions"
        );
        break;
      case _Application_StepIds.app_questions_nuclearpharmacy:
        this.router.navigate(["./application-questions"], navigationExtras);
        this.applicationService.setApplicationCategoryTabIndex(
          _Application_Questions_TabIds.questions_nuclearpharmacy
        );
        this.applicationService.setToolBarHeader(
          "Application Nuclear Pharmacy Questions"
        );
        break;
      case _Application_StepIds.app_questions_compounding:
        this.router.navigate(["./application-questions"], navigationExtras);
        this.applicationService.setApplicationCategoryTabIndex(
          _Application_Questions_TabIds.questions_compounding
        );
        this.applicationService.setToolBarHeader(
          "Application Compounding Questions"
        );
        break;
      case _Application_StepIds.choose_programs:
        this.router.navigate(["./choose-programs"], navigationExtras);
        this.applicationService.setToolBarHeader("Choose Programs");
        break;
      case _Application_StepIds.prog_questions_vpp:
      case _Application_StepIds.prog_questions_dotpharmacy:
      case _Application_StepIds.prog_questions_dmepos:
      case _Application_StepIds.prog_questions_vawd:
      case _Application_StepIds.prog_questions_vdip:
      case _Application_StepIds.prog_questions_vipps:
      case _Application_StepIds.prog_questions_state_inspection:
        this.router.navigate(["./program-questions"], navigationExtras);
        this.applicationService.setToolBarHeader("Program Questions");
        this.applicationService.setProgramCategoryTabIndex(stepId);
        break;
      case _Application_StepIds.review:
        this.router.navigate(["./cart"], navigationExtras);
        this.applicationService.setToolBarHeader("Review");
        break;
      case _Application_StepIds.payment:
        this.getTestamentTypes();
        break;
    }
  }

  performGlobalValidation() {   
    let body = {
      applicationSectionId: this.stepFlowId,
      nextStepSectionId: this.stepFlowId + 1
    };
    this.applicationService.performGlobalValidation1(body).subscribe(
      result => {
        this.navigateThroughSteps(this.stepFlowId);
      },
      error => {
        this.openConfirmationModal(error);
      }
    );
  }

  openConfirmationModal(error: { error: any }) {
    this.modalService.open(ApplicationMasterModalComponent, {
      width: "500px",
      data: {
        title: "Confirm",
        message: Application_Confirm_Message.validation1_message,
        cancelButton: "Cancel, Stay",
        okButton: "Ok, Proceed",
        onOkCallBack: () => {
          this.changeFacilitySelection(error.error);
        },
        onCancelCallBack: () => {
          this.goToLastStep();
        }
      }
    });
  }

  getTestamentTypes() {
    this.lookupService.getTestamentTypes().subscribe(
      response => {       
        this.openApplicationAttestaion(response);
      },
      error => {
        this.httpOptionsService.handleError(error);
      }
    );
  }

  openApplicationAttestaion(response: any) {
    const attestationModalRef = this.modalService.open(
      AttestationModalComponent,
      {
        width: "800px",
        data: response
      }
    );
    attestationModalRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.router.navigate([
          "/dashboard/payment/make-payment",
          this.parentApplicationId
        ]);
      } else {
        this.goToLastStep();
      }
    });
  }
}
