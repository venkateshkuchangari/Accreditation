import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ApiEndpoints } from "../shared/apiendpoints";
import { HttpoptionsService } from "../shared/httpoptions.service";
import { ApplicationStepData } from "./application-process/application-master/application-master.model";
import {
  _Choose_Program_Constants,
  _Application_StepIds
} from "../shared/application-constants";

@Injectable({
  providedIn: "root"
})
export class ApplicationService {
  OrganisationId: number;
  private parentApplicationId: number;
  private applicationData: any[] = [];
  private selectedFacility: any;
  private selectedPrograms: any[] = []; 

  _toolbar_display_header = new BehaviorSubject<any>("");
  get_tool_bar_header = this._toolbar_display_header.asObservable();

  _appid_toolbar = new BehaviorSubject<any>("");
  get_tool_bar_appid = this._appid_toolbar.asObservable();

  _application_process_step_tracker = new BehaviorSubject<any>(0);
  get_step_tracker_id = this._application_process_step_tracker.asObservable();

  _organization_info_tab_index = new BehaviorSubject<any>(0);
  _get_organization_tabindex_number = this._organization_info_tab_index.asObservable();

  _application_question_tab_index_number = new BehaviorSubject<any>(0);
  _get_application_tab_index_number = this._application_question_tab_index_number.asObservable();

  _program_question_tab_index_number = new BehaviorSubject<any>(0);
  _get_program_question_tab_index_number = this._program_question_tab_index_number.asObservable();

  _onclick_next = new BehaviorSubject<boolean>(false);
  _next_click_submit = this._onclick_next.asObservable();

  _can_enable_next = new BehaviorSubject<boolean>(false);
  _enable_next_click = this._can_enable_next.asObservable();

  _application_track_data = new BehaviorSubject<ApplicationStepData[]>([]);
  _get_application_track_data = this._application_track_data.asObservable();

  constructor(
    private http: HttpClient,
    private httpoptionsservice: HttpoptionsService
  ) {}

  setToolBarHeader(data: string) {
    this._toolbar_display_header.next(data);
  }



  checkStepTrackerId(currentStep: number, nextStep: number) {
    if (currentStep >= 0) {
      let body: any;
      if (
        currentStep == _Application_StepIds.review &&
        nextStep > _Application_StepIds.review
      ) {
        body = {
          applicationSectionId: currentStep,
          nextStepSectionId: _Application_StepIds.review
        };
      } else {
        body = {
          applicationSectionId: currentStep,
          nextStepSectionId: nextStep
        };
      }
      this.postApplicationProgress(body).subscribe(
        response => {
          this.setApplicationTrackData(response);
          this._application_process_step_tracker.next(nextStep);
        },
        error => {
          this.httpoptionsservice.handleError(error);
        }
      );
    }
  }

  setStepTrackerId(stepId: number) {
    this._application_process_step_tracker.next(stepId);
  }

  setOrganisationId(id: any) {
    this.OrganisationId = id;
  }

  setParentApplicationId(id: any) {
    this.parentApplicationId = id;
    this._appid_toolbar.next(id);
  }

  setOnClickNext(value: boolean) {
    this._onclick_next.next(value);
  }

  setEnableNextClick(value: boolean) {
    this._can_enable_next.next(value);
  }

  setOrganizationChildtabIndexNumber(id: number) {
    this._organization_info_tab_index.next(id);
  }

  setApplicationCategoryTabIndex(id: number) {
    this._application_question_tab_index_number.next(id);
  }

  setApplicationTrackData(data: ApplicationStepData[]) {
    this._application_track_data.next(data);
  }

  postApplicationFacilities(data: any): Observable<any> {
    return this.http.post(
      ApiEndpoints._post_application_facilities(),
      data,
      this.httpoptionsservice.gethttpOptions()
    );
  }

  getParentApplications(): Observable<any> {
    return this.http.get(
      ApiEndpoints._get_parent_applications(),
      this.httpoptionsservice.gethttpOptions()
    );
  }
  getApplicationFacilities(appId: any): Observable<any> {
    return this.http.get(
      ApiEndpoints._get_application_facilities(appId),
      this.httpoptionsservice.gethttpOptions()
    );
  }

  getOwnershipQuestions(ownershipId: number): Observable<any> {
    return this.http.get(
      ApiEndpoints.get_ownership_question(this.OrganisationId, ownershipId),
      this.httpoptionsservice.gethttpOptions()
    );
  }
  saveOwnershipQuestions(data: any): Observable<any> {
    return this.http.post(
      ApiEndpoints.save_ownership_question(this.OrganisationId),
      data,
      this.httpoptionsservice.gethttpOptions()
    );
  }

  getCategoryQuestions(category_id: number): Observable<any> {
    return this.http.get(
      ApiEndpoints.get_ownership_question_category(
        this.OrganisationId,
        category_id,
        this.parentApplicationId
      ),
      this.httpoptionsservice.gethttpOptions()
    );
  }
  getApplicationCartItems(): Observable<any> {
    return this.http.get(
      ApiEndpoints.get_application_cart_items(this.parentApplicationId),
      this.httpoptionsservice.gethttpOptions()
    );
  }

  saveUniversalQuestions(data: any): Observable<any> {
    return this.http.post(
      ApiEndpoints.save_universal_question(
        this.OrganisationId,
        this.parentApplicationId
      ),
      data,
      this.httpoptionsservice.gethttpOptions()
    );
  }

  getApplicationPrograms(): Observable<any> {
    return this.http.get(
      ApiEndpoints.get_application_program(this.parentApplicationId),
      this.httpoptionsservice.gethttpOptions()
    );
  }

  getApplicationProgramsPreview(parentApplicationId): Observable<any> {
    return this.http.get(
      ApiEndpoints.get_application_program(parentApplicationId),
      this.httpoptionsservice.gethttpOptions()
    );
  }

  postApplicationPrograms(body: any): Observable<any> {
    return this.http.put(
      ApiEndpoints.post_application_program(this.parentApplicationId),
      body,
      this.httpoptionsservice.gethttpOptions()
    );
  }

  postApplicationProgress(body: {
    applicationSectionId: any;
  }): Observable<any> {
    return this.http.put(
      ApiEndpoints.put_application_progress(
        this.OrganisationId,
        this.parentApplicationId
      ),
      body,
      this.httpoptionsservice.gethttpOptions()
    );
  }

  getApplicationProgress(): Observable<any> {
    return this.http.get(
      ApiEndpoints.get_application_progress(
        this.OrganisationId,
        this.parentApplicationId
      ),
      this.httpoptionsservice.gethttpOptions()
    );
  }

  performGlobalValidation1(body): Observable<any> {
    return this.http.put(
      ApiEndpoints.get_global_validation_level1(this.parentApplicationId),
      body,
      this.httpoptionsservice.gethttpOptions()
    );
  }

  saveBusinessQuestions(data: any): Observable<any> {
    return this.http.post(
      ApiEndpoints.save_business_question(this.OrganisationId),
      data,
      this.httpoptionsservice.gethttpOptions()
    );
  }

  getBlackoutDates(): Observable<any> {
    return this.http.get(
      ApiEndpoints.get_application_blackout_dates(
        this.parentApplicationId,
        this.OrganisationId
      ),
      this.httpoptionsservice.gethttpOptions()
    );
  }

  updateBlackoutDates(body: { blackOutDates: any[] }): Observable<any> {
    return this.http.put(
      ApiEndpoints.put_application_blackout_dates(
        this.parentApplicationId,
        this.OrganisationId
      ),
      body,
      this.httpoptionsservice.gethttpOptions()
    );
  }

  getBusinessQuestions(category_id: number): Observable<any> {
    return this.http.get(
      ApiEndpoints.get_business_question_category(
        this.OrganisationId,
        category_id
      ),
      this.httpoptionsservice.gethttpOptions()
    );
  }

  saveVPPQuestions(data: any): Observable<any> {
    return this.http.post(
      ApiEndpoints.save_vpp_question(
        this.OrganisationId,
        this.parentApplicationId
      ),
      data,
      this.httpoptionsservice.gethttpOptions()
    );
  }

  setApplicationData(data: any) {
    this.applicationData = [...data];
    this.selectedPrograms = [];
    this.selectedFacility = this.applicationData.find(element => {
      return element.organizationId == this.OrganisationId;
    });
    this.selectedPrograms = this.selectedFacility.programTypes.filter(
      element => {
        return element.isSelected == true;
      }
    );
    this.selectedPrograms.forEach(program => {
      program.stepId = _Choose_Program_Constants.programInfo.find(element => {
        return program.programTypeId == element.programId;
      }).application_stepId;
    });
  }

  getSelectedProgramData() {
    return this.selectedPrograms;
  }

  navigateThroughProgramQuestions(progId) {
    let currentProgram = this.selectedPrograms.find(element => {
      return element.programTypeId == progId;
    });
    let index = this.selectedPrograms.indexOf(currentProgram);
    if (index + 1 < this.selectedPrograms.length) {
      this.checkStepTrackerId(
        currentProgram.stepId,
        this.selectedPrograms[index + 1].stepId
      );
    } else {
      this.checkStepTrackerId(
        currentProgram.stepId,
        _Application_StepIds.review
      );
    }
  }

  setProgramCategoryTabIndex(stepId) {
    if (this.selectedPrograms.length != 0) {
      let index = this.selectedPrograms.findIndex(element => {
        return element.stepId == stepId;
      });
      this._program_question_tab_index_number.next(index);
    }
  }

  deleteChildApplication(programId: number): Observable<any> {
    return this.http.delete(
      ApiEndpoints.delete_child_application(
        this.parentApplicationId,
        this.OrganisationId,
        programId
      ),
      this.httpoptionsservice.gethttpOptions()
    );
  }

  deleteChildApplicationCart(
    OrganizationId: number,
    programId: number
  ): Observable<any> {
    return this.http.delete(
      ApiEndpoints.delete_child_application(
        this.parentApplicationId,
        OrganizationId,
        programId
      ),
      this.httpoptionsservice.gethttpOptions()
    );
  }

  getDiscountAppliedCartItems(discountCode: number): Observable<any> {
    return this.http.get<any>(
      ApiEndpoints.get_discounted_cart_items(
        this.parentApplicationId,
        discountCode
      ),
      this.httpoptionsservice.gethttpOptions()
    );
  }
  getDisciplinaryActionQuestions(): Observable<any> {
    return this.http.get<any>(
      ApiEndpoints.get_disciplinary_actions_questions(
        this.OrganisationId,
        this.parentApplicationId
      ),
      this.httpoptionsservice.gethttpOptions()
    );
  }

  getDisciplineEntityList(): Observable<any> {
    return this.http.get<any>(
      ApiEndpoints.get_discipline_entity_list(),
      this.httpoptionsservice.gethttpOptions()
    );
  }

  postDisciplinaryActionQuestions(data: any): Observable<any> {
    return this.http.post(
      ApiEndpoints.post_disciplinary_action_questions(
        this.OrganisationId,
        this.parentApplicationId
      ),
      data,
      this.httpoptionsservice.gethttpOptions()
    );
  }
}
