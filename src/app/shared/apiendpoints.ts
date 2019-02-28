import { environment } from "../../environments/environment";
export class ApiEndpoints {
  public static get_auth_url() {
    return environment.API_BASE_URL + "v1/oauth2/token";
  }
  public static get_facility_activities(id: number) {
    return environment.API_BASE_URL + "v1/facilities/" + id + "/activities";
  }
  public static put_facility_activities(id: number) {
    return environment.API_BASE_URL + "v1/facilities/" + id + "/activities";
  }

  public static get_facility_activities_list() {
    return environment.API_BASE_URL + "v1/lookups/activity/types";
  }
  public static get_org_contact(id: number) {
    return environment.API_BASE_URL + "v1/facilities/" + id + "/contacts";
  }

  public static get_facilities_list() {
    return environment.API_BASE_URL + "v1/facilities";
  }

  public static get_individual_ownership(id: number) {
    return (
      environment.API_BASE_URL + "v1/facilities/" + id + "/owners/individual"
    );
  }

  public static get_company_ownership(id: number) {
    return environment.API_BASE_URL + "v1/facilities/" + id + "/owners/company";
  }

  public static get_facilitylicense(id: number) {
    return environment.API_BASE_URL + "v1/facilities/" + id + "/licenses";
  }

  public static upload_facility_license_file(id: number) {
    return (
      environment.API_BASE_URL + "v1/facilities/" + id + "/licenses/import"
    );
  }

  public static get_contact_lookups() {
    return environment.API_BASE_URL + "v1/lookups/usercontact";
  }

  public static get_title_list() {
    return environment.API_BASE_URL + "v1/lookups/person/titles ";
  }

  public static get_gender_list() {
    return environment.API_BASE_URL + "v1/lookups/gender/types";
  }

  public static post_org_contact(id: number) {
    return environment.API_BASE_URL + "v1/facilities/" + id + "/contacts";
  }
  public static get_org_information(id: number) {
    return environment.API_BASE_URL + "v1/facilities/" + id;
  }
  public static get_business_hours_info(id: number) {
    return (
      environment.API_BASE_URL + "v1/facilities/" + id + "/attributes/hours"
    );
  }
  public static get_user_contact() {
    return environment.API_BASE_URL + "v1/user/contact";
  }

  public static get_user_menu_access() {
    return environment.API_BASE_URL + "v1/menus";
  }

  public static post_user_contact() {
    return environment.API_BASE_URL + "v1/user/contact";
  }
  public static put_org_contact(org_id: number, contact_id: number) {
    return (
      environment.API_BASE_URL +
      "v1/facilities/" +
      org_id +
      "/contacts/" +
      contact_id
    );
  }

  public static put_user_contact() {
    return environment.API_BASE_URL + "v1/user/contact";
  }
  public static delete_org_contact(org_id: number, contact_id: number) {
    return (
      environment.API_BASE_URL +
      "v1/facilities/" +
      org_id +
      "/contacts/" +
      contact_id
    );
  }
  public static update_org_address(org_id: number) {
    return (
      environment.API_BASE_URL +
      "v1/facilities/" +
      org_id +
      "/attributes/contact"
    );
  }
  public static update_org_attributes(org_id: number) {
    return (
      environment.API_BASE_URL +
      "v1/facilities/" +
      org_id +
      "/attributes/business"
    );
  }
  public static update_org_business_hours(org_id: number) {
    return (
      environment.API_BASE_URL + "v1/facilities/" + org_id + "/attributes/hours"
    );
  }

  public static delete_individuallicense(org_d: number, license_id: number) {
    return (
      environment.API_BASE_URL +
      "v1/facilities/" +
      org_d +
      "/licenses/individual/" +
      license_id
    );
  }

  

  public static get_individual_license_types(angencyId: number) {
    return (
      environment.API_BASE_URL +
      "v1/lookups/license/individual/agencies/" +
      angencyId +
      "/types"
    );
  }

  public static get_individual_license_agencies() {
    return environment.API_BASE_URL + "v1/lookups/license/individual/agencies";
  }
  
  public static get_payment_types() {
    return environment.API_BASE_URL + "v1/lookups/payment/types";
  }
  
  public static get_testament_types() {
    return environment.API_BASE_URL + "v1/lookups/testament/types";
  }

  public static search_individual_license(body) {
    return environment.API_BASE_URL + "v1/licenses/individual/search?" + body;
  }

  public static get_individual_license(id: number) {
    return (
      environment.API_BASE_URL + "v1/facilities/" + id + "/licenses/individual"
    );
  }

  public static get_license_agency_types() {
    return (
      environment.API_BASE_URL +
      "v1/lookups/license/organization/agencies"
    );
  }

  public static get_license_agency(agencyId: number) {
    return environment.API_BASE_URL + "v1/lookups/license/organization/agencies/"+agencyId+"/types";
  }

  public static get_facility_regex(agencyId: number, typeId: number) {
    return environment.API_BASE_URL + "v1/lookups/license/agencies/"+agencyId+"/types/"+typeId+"/regex"
  }

  public static get get_license_status_types() {
    return environment.API_BASE_URL + "v1/Lookups/license/status/types";
  }

  public static update_facility_license(
    facility_id: number,
    license_id: number
  ) {
    return (
      environment.API_BASE_URL +
      "v1/facilities/" +
      facility_id +
      "/licenses/" +
      license_id
    );
  }

  public static delete_facility_license(
    facility_id: number,
    license_id: number
  ) {
    return (
      environment.API_BASE_URL +
      "v1/facilities/" +
      facility_id +
      "/licenses/" +
      license_id
    );
  }

  public static post_facility_licence(facility_id: number) {
    return (
      environment.API_BASE_URL + "v1/facilities/" + facility_id + "/licenses"
    );
  }

  public static delete_ownership_data(
    facility_id: number,
    ownership_id: number
  ) {
    return (
      environment.API_BASE_URL +
      "v1/facilities/" +
      facility_id +
      "/owners/" +
      ownership_id
    );
  }

  public static post_eprofile_request() {
    return environment.API_BASE_URL + "v1/facilities";
  }

  public static get_inspection(id: number) {
    return (
      environment.API_BASE_URL +
      "v1/facilities/" +
      id +
      "/inspections/stateboard"
    );
  }

  public static get_OtherInspection(id: number) {
    return (
      environment.API_BASE_URL +
      "v1/facilities/" +
      id +
      "/inspections/otheragency"
    );
  }

  public static get_Govt_Inspection(id: number) {
    return (
      environment.API_BASE_URL +
      "v1/facilities/" +
      id +
      "/inspections/otheragency/gov"
    );
  }

  public static get_accreditation_history(id: number) {
    return environment.API_BASE_URL + "v1/facilities/" + id + "/accreditations";
  }

  public static _post_accreditation_history(id: number) {
    return environment.API_BASE_URL + "v1/facilities/" + id + "/accreditations";
  }

  public static _put_accreditation_actions(id: number, accredId: number) {
    return (
      environment.API_BASE_URL +
      "v1/facilities/" +
      id +
      "/accreditations/" +
      accredId +
      "/actions"
    );
  }

  public static get_acreditation_actions(id: number, accredId: number) {
    return (
      environment.API_BASE_URL +
      "v1/facilities/" +
      id +
      "/accreditations/" +
      accredId +
      "/actions"
    );
  }

  public static update_individualownership(facilityId, entityOwnershipXrefID) {
    return (
      environment.API_BASE_URL +
      "v1/facilities/" +
      facilityId +
      "/owners/individual/" +
      entityOwnershipXrefID
    );
  }

  public static save_individualownership(facilityId) {
    return (
      environment.API_BASE_URL +
      "v1/facilities/" +
      facilityId +
      "/owners/individual"
    );
  }

  public static save_company_ownership(facilityId) {
    return (
      environment.API_BASE_URL +
      "v1/facilities/" +
      facilityId +
      "/owners/company"
    );
  }

  public static update_ownership(facilityId, entityOwnershipXrefID) {
    return (
      environment.API_BASE_URL +
      "v1/facilities/" +
      facilityId +
      "/owners/company/" +
      entityOwnershipXrefID
    );
  }
  public static _getfacility_application(organizationId) {
    return (
      environment.API_BASE_URL +
      "v1/facilities/" +
      organizationId +
      "/applications"
    );
  }

  public static _post_application_facilities() {
    return environment.API_BASE_URL + "v1/applications";
  }

  public static _get_parent_applications() {
    return environment.API_BASE_URL + "v1/applications";
  }
  public static _get_application_facilities(appId) {
    return environment.API_BASE_URL + "v1/applications/" + appId;
  }
  public static get_ownership_question(
    facilityId: number,
    ownershipId: number
  ) {
    return (
      environment.API_BASE_URL +
      "v1/facilities/" +
      facilityId +
      "/questions/" +
      ownershipId
    );
  }

  public static getBusinessQuestions(facilityId: number, categoryId: number) {
    return (
      environment.API_BASE_URL +
      "v1/facilities/" +
      facilityId +
      "/questions/" +
      categoryId
    );
  }

  public static save_ownership_question(facilityId: number) {
    return (
      environment.API_BASE_URL +
      "v1/facilities/" +
      facilityId +
      "/questions/owners"
    );
  }

  public static save_Business_Questions(facilityId: number) {
    return (
      environment.API_BASE_URL + "v1/facilities/" + facilityId + "/questions"
    );
  }

  public static get_inspection_agency_types() {
    return environment.API_BASE_URL + "v1/lookups/inspection/agencies";
  }

  public static _get_file_upload_url(id: number) {
    return environment.API_BASE_URL + "v1/facilities/" + id + "/files";
  }

  public static _get_file_download_url(facid: number, fileid: number) {
    return (
      environment.API_BASE_URL + "v1/facilities/" + facid + "/files/" + fileid
    );
  }

  public static _post_inspection_history(id: number) {
    return environment.API_BASE_URL + "v1/facilities/" + id + "/inspections";
  }

  public static _put_inspection_history(id: number, inspectionId: number) {
    return (
      environment.API_BASE_URL +
      "v1/facilities/" +
      id +
      "/inspections/" +
      inspectionId
    );
  }

  public static delete_Inspection_History(
    facility_id: number,
    inspectionId: number
  ) {
    return (
      environment.API_BASE_URL +
      "v1/facilities/" +
      facility_id +
      "/inspections/" +
      inspectionId
    );
  }

  public static get_accreditation_agency_types() {
    return environment.API_BASE_URL + "v1/lookups/accreditation/agency/types";
  }

  public static get_accreditation_types() {
    return environment.API_BASE_URL + "v1/lookups/accreditation/types";
  }

  public static get_accreditation_action_types() {
    return environment.API_BASE_URL + "v1/lookups/accreditation/action/types";
  }

  public static get_application_cart_items(applicationId:number) {
    return environment.API_BASE_URL + "v1/applications/"+applicationId+"/cart";
  }

  public static get_application_billing_locations(applicationId:number) {
    return environment.API_BASE_URL + "v1/applications/"+applicationId +"/billing/locations";
  }

  
  public static verify_payment_transaction(applicationId:number) {
    return environment.API_BASE_URL + "v1/payments/transactions/application/"+applicationId;
  }

    
  public static make_payment_transaction(applicationId:number) {
    return environment.API_BASE_URL + "v1/payments/"+applicationId;
  }


  public static get_ownership_question_category(
    facility_id: number,
    question_category_id: number,
    parent_application_id: number
  ) {
    return (
      environment.API_BASE_URL +
      "v1/facilities/" +
      facility_id +
      "/questions/" +
      question_category_id +
      "/applications/" +
      parent_application_id
    );
  }

  public static save_universal_question(
    facilityId: number,
    applicationId: any
  ) {
    return (
      environment.API_BASE_URL +
      "v1/facilities/" +
      facilityId +
      "/questions/application/" +
      applicationId
    );
  }

  public static get_application_program(applicationId: number) {
    return (
      environment.API_BASE_URL +
      "v1/applications/" +
      applicationId +
      "/programs"
    );
  }

  public static post_application_program(applicationId: number) {
    return environment.API_BASE_URL + "v1/applications/" + applicationId;
  }

  public static put_application_progress(
    facilityId: number,
    applicationId: any
  ) {
    return (
      environment.API_BASE_URL +
      "v2/facilities/" +
      facilityId +
      "/applications/" +
      applicationId +
      "/progress"
    );
  }

  public static get_application_progress(
    facilityId: number,
    applicationId: any
  ) {
    return (
      environment.API_BASE_URL +
      "v2/facilities/" +
      facilityId +
      "/applications/" +
      applicationId +
      "/progress"
    );
  }

  public static get_global_validation_level1(applicationId: any) {
    return (
      environment.API_BASE_URL +
      "v1/applications/"+applicationId+"/progress"
    );
  }

  public static save_business_question(facilityId: number) {
    return (
      environment.API_BASE_URL + "v1/facilities/" + facilityId + "/questions"
    );
  }

  public static get_application_blackout_dates(
    applicationId: number,
    facilityId: number
  ) {
    return (
      environment.API_BASE_URL +
      "v1/applications/" +
      applicationId +
      "/facilities/" +
      facilityId +
      "/blackoutdates"
    );
  }

  public static put_application_blackout_dates(
    applicationId: number,
    facilityId: number
  ) {
    return (
      environment.API_BASE_URL +
      "v1/applications/" +
      applicationId +
      "/facilities/" +
      facilityId +
      "/blackoutdates"
    );
  }

  public static get_relationship_types() {
    return environment.API_BASE_URL + "v1/lookups/person/relationships";
  }

  public static get_ownership_types() {
    return environment.API_BASE_URL + "v1/lookups/ownership/types";
  }

  public static _post_file_(facId: number, questionId: number) {
    return (
      environment.API_BASE_URL +
      "v1/facilities/" +
      facId +
      "/questions/" +
      questionId +
      "/responses"
    );
  }

  public static _get_File_(facility_Id: number, question_Id: number) {
    return (
      environment.API_BASE_URL +
      "v1/facilities/" +
      facility_Id +
      "/questions/" +
      question_Id +
      "/responses"
    );
  }

  public static get_business_question_category(
    facility_id: number,
    question_category_id: number
  ) {
    return (
      environment.API_BASE_URL +
      "v1/facilities/" +
      facility_id +
      "/questions/" +
      question_category_id
    );
  }

  public static get_eprofile_requests() {
    return environment.API_BASE_URL + "v1/facilities/requests";
  }

  public static get_staff_regex(agencyId: number) {
    return (
      environment.API_BASE_URL + "v1/lookups/license/regex/agencies/" + agencyId
    );
  }

  public static delete_child_application(appId: number, orgId: number, programId: number) {
    return environment.API_BASE_URL + 'v1/applications/' + appId + '/facility/' + orgId + '/program/' + programId
  }

  public static get_discounted_cart_items(appId: number, discountCode: number) {
    return environment.API_BASE_URL + 'v1/applications/' + appId + '/cart/discount/' + discountCode
  }
  
  public static save_vpp_question(facilityId: number, applicationId: any) {
    return environment.API_BASE_URL + 'v1/facilities/' + facilityId + '/questions/application/' + applicationId + '/vpp';
  }

  public static get_disciplinary_actions(facilityId: number) {
    return environment.API_BASE_URL + "v1/facilities/" + facilityId + "/disciplinaryactions";
  }

  public static get_disciplinary_actions_questions(id: number, applicationId: number) {
    return environment.API_BASE_URL + "v1/facilities/" + id + "/disciplinaryactions/" + applicationId;
  }

  public static get_discipline_entity_list() {
    return environment.API_BASE_URL + "v1/lookups/disciplinaryactions/entities";
  }

  public static post_disciplinary_action_questions(facilityId: number, applicationId: any) {
    return environment.API_BASE_URL + 'v1/facilities/' + facilityId + '/disciplinaryactions/' + applicationId;
  }

  public static get_alerts() {
    return environment.API_BASE_URL + "v1/alerts/types/email";
  }
}
