import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { ApiEndpoints } from '../../shared/apiendpoints';
import { HttpoptionsService } from '../../shared/httpoptions.service';



@Injectable({
  providedIn: 'root'
})
export class MyFacilityService {

  _toolbar_display_header= new BehaviorSubject<any>("")
  get_tool_bar_header=this._toolbar_display_header.asObservable(); 

 constructor(private http: HttpClient,private httpOptions:HttpoptionsService ) { 
  }
 OrganisationId;
  setOrganisationId(id: any) {
       this.OrganisationId = id;
    }

setToolBarHeader(data){
  this._toolbar_display_header.next(data);
}
 getFacilityInfo(): Observable<any> {
    return this.http.get<any>(ApiEndpoints.get_org_information(this.OrganisationId), this.httpOptions.gethttpOptions())
  }

  getBusinessHoursInfo(): Observable<any> {
    return this.http.get<any>(ApiEndpoints.get_business_hours_info(this.OrganisationId), this.httpOptions.gethttpOptions())
  }
  getFacilityActivities(): Observable<any> {
    return this.http.get<any>(ApiEndpoints.get_facility_activities(this.OrganisationId),this.httpOptions.gethttpOptions())
  }

  updateFacilityActivities(activityData):Observable<any> {
    return this.http.put<any>(ApiEndpoints.put_facility_activities(this.OrganisationId),activityData,this.httpOptions.gethttpOptions())
  }

  getOrganizationContacts(): Observable<any> {
    return this.http.get<any>(ApiEndpoints.get_org_contact(this.OrganisationId),this.httpOptions.gethttpOptions())
  }

  
  getfacilityList(): Observable<any> {
    return this.http.get<any>(ApiEndpoints.get_facilities_list(), this.httpOptions.gethttpOptions())
  }

  getIndividualOwnershipDetails(): Observable<any> {
    return this.http.get<any>(ApiEndpoints.get_individual_ownership(this.OrganisationId), this.httpOptions.gethttpOptions())
  }

  getCompanyOwnershipDetails(): Observable<any> {
    return this.http.get<any>(ApiEndpoints.get_company_ownership(this.OrganisationId), this.httpOptions.gethttpOptions())
  }

  getFacilitylicense(): Observable<any> {
    return this.http.get<any>(ApiEndpoints.get_facilitylicense(this.OrganisationId), this.httpOptions.gethttpOptions())
  }

  uploadFacilityLicenseFile(body): Observable<any> {
    return this.http.post<any>(ApiEndpoints.upload_facility_license_file(this.OrganisationId),body, this.httpOptions.getfilehttpOptions())
  }

  postOrganizationContact(contact): Observable<any> {
    return this.http.post(ApiEndpoints.post_org_contact(this.OrganisationId), contact,this.httpOptions.gethttpOptions())
  }

  putOrganizationContact(contact,contact_id): Observable<any> {
    return this.http.put(ApiEndpoints.put_org_contact(this.OrganisationId,contact_id), contact, this.httpOptions.gethttpOptions())
     
  }

  deleteOrganizationContact(contact_id): Observable<any> {
    return this.http.delete(ApiEndpoints.delete_org_contact(this.OrganisationId,contact_id), this.httpOptions.gethttpOptions())
  }
  putOrganizationAddress(body):Observable<any>{
    return this.http.put(ApiEndpoints.update_org_address(this.OrganisationId),body,this.httpOptions.gethttpOptions())

  }
  putOrganizationAttributes(body):Observable<any>{
    return this.http.put(ApiEndpoints.update_org_attributes(this.OrganisationId),body,this.httpOptions.gethttpOptions())

  }
  putOrganizationBusinessHours(body):Observable<any>{
    return this.http.put(ApiEndpoints.update_org_business_hours(this.OrganisationId),body,this.httpOptions.gethttpOptions())

  }

  getIndividuallicense(): Observable<any> {
    return this.http.get<any>(ApiEndpoints.get_individual_license(this.OrganisationId), this.httpOptions.gethttpOptions());
  }

  deleteIndividualLicence(license_id: number): Observable<any> {
    return this.http.delete(ApiEndpoints.delete_individuallicense(this.OrganisationId, license_id), this.httpOptions.gethttpOptions());
  }
 
  searchIndividualLicence(body): Observable<any> {
    return this.http.get<any>(ApiEndpoints.search_individual_license(body), this.httpOptions.gethttpOptions());
  }

  saveIndividuallicense(body): Observable<any> {
    return this.http.post<any>(ApiEndpoints.get_individual_license(this.OrganisationId), body, this.httpOptions.gethttpOptions());
  }

  deleteLicenseData(licenseid: number): Observable<any> {
    return this.http.delete(ApiEndpoints.delete_facility_license(this.OrganisationId, licenseid), this.httpOptions.gethttpOptions());
  } 

  updateFacilityLicenseData(licenseid: number, data): Observable<any> {
    return this.http.put(ApiEndpoints.update_facility_license(this.OrganisationId, licenseid), data, this.httpOptions.gethttpOptions());
  }

  addFacilityLicenceData(body): Observable<any> {
    return this.http.post(ApiEndpoints.post_facility_licence(this.OrganisationId), body, this.httpOptions.gethttpOptions());
  }

  deleteOwnershipData(ownershipId: number): Observable<any> {
    return this.http.delete(ApiEndpoints.delete_ownership_data(this.OrganisationId, ownershipId), this.httpOptions.gethttpOptions());
  }

  getInspection(): Observable<any> {
    return this.http.get<any>(ApiEndpoints.get_inspection(this.OrganisationId), this.httpOptions.gethttpOptions());
  }

  getOtherInspection(): Observable<any> {
    
    return this.http.get<any>(ApiEndpoints.get_OtherInspection(this.OrganisationId), this.httpOptions.gethttpOptions());
  }

  getGovtInspection(): Observable<any>{
    return this.http.get<any>(ApiEndpoints.get_Govt_Inspection(this.OrganisationId), this.httpOptions.gethttpOptions());
  }

  getAccreditations(): Observable<any> {
    return this.http.get<any>(ApiEndpoints.get_accreditation_history(this.OrganisationId), this.httpOptions.gethttpOptions());
  }

  postAccreditationHistory(body):Observable<any>{
    return this.http.post<any>(ApiEndpoints._post_accreditation_history(this.OrganisationId),body,this.httpOptions.gethttpOptions())
  }

  putAccreditationActions(body,accreditationId):Observable<any>{
    return this.http.put<any>(ApiEndpoints._put_accreditation_actions(this.OrganisationId,accreditationId),body,this.httpOptions.gethttpOptions())
  }

  getAcreditationActions(accredid:number): Observable<any> {
    return this.http.get<any>(ApiEndpoints.get_acreditation_actions(this.OrganisationId,accredid), this.httpOptions.gethttpOptions());
  }

  updateIndividualOwnershipData(body,ownershipId): Observable<any> {
    return this.http.put(ApiEndpoints.update_individualownership(this.OrganisationId,ownershipId), body, this.httpOptions.gethttpOptions());
  }

  updateCompanyOwnershipData(body,ownershipId): Observable<any> {
    return this.http.put(ApiEndpoints.update_ownership(this.OrganisationId,ownershipId), body, this.httpOptions.gethttpOptions());
  }

  saveIndividualOwnershipData(body): Observable<any> {
    return this.http.post(ApiEndpoints.save_individualownership(this.OrganisationId), body, this.httpOptions.gethttpOptions());
  }

 saveCompanyOwnershipData(body): Observable<any> {
    return this.http.post(ApiEndpoints.save_company_ownership(this.OrganisationId), body, this.httpOptions.gethttpOptions());
  }

  getFacilityApplications():Observable<any>{
    return this.http.get<any>(ApiEndpoints._getfacility_application(this.OrganisationId),this.httpOptions.gethttpOptions())
  }

  getFileUploadUrl(body):Observable<any>{
    return this.http.post<any>(ApiEndpoints._get_file_upload_url(this.OrganisationId),body,this.httpOptions.gethttpOptions())
  }

  getFileDownloadUrl(fileId):Observable<any>{
    return this.http.get<any>(ApiEndpoints._get_file_download_url(this.OrganisationId,fileId),this.httpOptions.gethttpOptions())
  }

  uploadFilestoBucket(url,formdata):Observable<any>{
    return this.http.put<any>(url,formdata)
  }

  postInspectionHistory(body):Observable<any>{
    return this.http.post<any>(ApiEndpoints._post_inspection_history(this.OrganisationId),body,this.httpOptions.gethttpOptions())
  }

  putInspectionHistory(body, inspectionId):Observable<any>{
    return this.http.put<any>(ApiEndpoints._put_inspection_history(this.OrganisationId, inspectionId),body,this.httpOptions.gethttpOptions())
  }

  deleteInspectionHistory(inspectionId: number): Observable<any> {
    return this.http.delete(ApiEndpoints.delete_Inspection_History(this.OrganisationId, inspectionId), this.httpOptions.gethttpOptions());
  }

 
  postFileperQuestion(body,question_Id):Observable<any>{
    return this.http.post<any>(ApiEndpoints._post_file_(this.OrganisationId,question_Id),body,this.httpOptions.gethttpOptions())
  }

  getFileperQuestion(questions_Id):Observable<any> {
    return this.http.get<any>(ApiEndpoints._get_File_(this.OrganisationId,questions_Id),this.httpOptions.gethttpOptions())
  }

  getDisciplinaryActions(): Observable<any> {
    return this.http.get<any>(ApiEndpoints.get_disciplinary_actions(this.OrganisationId), this.httpOptions.gethttpOptions())
  }

}
