import { Injectable } from "@angular/core";
import { Observable, of, Subscription, BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ApiEndpoints } from "./apiendpoints";
import { HttpoptionsService } from "./httpoptions.service";
import { DatePipe } from "@angular/common";

@Injectable({
  providedIn: "root"
})
export class LookupService {
  Lookupdata;
  personPrefixTypeList = new BehaviorSubject<any>("");
  personSuffixTypeResponses = new BehaviorSubject<any>("");
  titleResponses = new BehaviorSubject<any>("");
  countryList = new BehaviorSubject<any>("");
  genderList = new BehaviorSubject<any>("");

  constructor(
    private http: HttpClient,
    private httpOptions: HttpoptionsService,
    private _datepipe: DatePipe
  ) {}
  get_lookup_prefixList = this.personPrefixTypeList.asObservable();
  get_lookup_sufixList = this.personSuffixTypeResponses.asObservable();
  get_lookup_titleList = this.titleResponses.asObservable();
  get_lookup_countryList = this.countryList.asObservable();
  get_lookup_genderList = this.genderList.asObservable();

  getLookUpData(): Observable<any> {
    return this.http.get<any>(
      ApiEndpoints.get_contact_lookups(),
      this.httpOptions.gethttpOptions()
    );
  }
  getTitleLookup(): Observable<any> {
    return this.http.get<any>(
      ApiEndpoints.get_title_list(),
      this.httpOptions.gethttpOptions()
    );
  }
  getGenderTypeLookup(): Observable<any> {
    return this.http.get<any>(
      ApiEndpoints.get_gender_list(),
      this.httpOptions.gethttpOptions()
    );
  }

  getLicenseAgencyTypes(): Observable<any> {
    return this.http.get<any>(
      ApiEndpoints.get_license_agency_types(),
      this.httpOptions.gethttpOptions()
    );
  }

  getInspectionAgencyTypes(): Observable<any> {
    return this.http.get<any>(
      ApiEndpoints.get_inspection_agency_types(),
      this.httpOptions.gethttpOptions()
    );
  }
  getLicenseStatusTypes(): Observable<any> {
    return this.http.get<any>(
      ApiEndpoints.get_license_status_types,
      this.httpOptions.gethttpOptions()
    );
  }

  getLicenseAgency(agencyId: number): Observable<any> {
    return this.http.get<any>(
      ApiEndpoints.get_license_agency(agencyId),
      this.httpOptions.gethttpOptions()
    );
  }

  getFacilityLicenseRegex(agencyId: number, typeId: number): Observable<any> {
    return this.http.get<any>(
      ApiEndpoints.get_facility_regex(agencyId, typeId),
      this.httpOptions.gethttpOptions()
    );
  }

  getAccreditationTypes(): Observable<any> {
    return this.http.get<any>(
      ApiEndpoints.get_accreditation_types(),
      this.httpOptions.gethttpOptions()
    );
  }

  getAccreditationActionTypes(): Observable<any> {
    return this.http.get<any>(
      ApiEndpoints.get_accreditation_action_types(),
      this.httpOptions.gethttpOptions()
    );
  }

  getOwnershipTypes(): Observable<any> {
    return this.http.get<any>(
      ApiEndpoints.get_ownership_types(),
      this.httpOptions.gethttpOptions()
    );
  }

  getRelationshipTypes(): Observable<any> {
    return this.http.get<any>(
      ApiEndpoints.get_relationship_types(),
      this.httpOptions.gethttpOptions()
    );
  }

  getAccreditationAgencyTypes(): Observable<any> {
    return this.http.get<any>(
      ApiEndpoints.get_accreditation_agency_types(),
      this.httpOptions.gethttpOptions()
    );
  }

  getStaffLicenseRegex(agencyId: number): Observable<any> {
    return this.http.get<any>(
      ApiEndpoints.get_staff_regex(agencyId),
      this.httpOptions.gethttpOptions()
    );
  }

  getFacilityActivitiesList(): Observable<any> {
    return this.http.get<any>(
      ApiEndpoints.get_facility_activities_list(),
      this.httpOptions.gethttpOptions()
    );
  }

  getIndividualLicenseTypes(angencyId): Observable<any> {
    return this.http.get<any>(
      ApiEndpoints.get_individual_license_types(angencyId),
      this.httpOptions.gethttpOptions()
    );
  }
  getIndividualLicenseAgencies(): Observable<any> {
    return this.http.get<any>(
      ApiEndpoints.get_individual_license_agencies(),
      this.httpOptions.gethttpOptions()
    );
  }

  getPaymentTypes(): Observable<any> {
    return this.http.get<any>(
      ApiEndpoints.get_payment_types(),
      this.httpOptions.gethttpOptions()
    );
  }

  getTestamentTypes(): Observable<any> {
    return this.http.get<any>(
      ApiEndpoints.get_testament_types(),
      this.httpOptions.gethttpOptions()
    );
  }

  set_lookup_data(data: any) {
    this.Lookupdata = data;
    this.personPrefixTypeList.next(this.Lookupdata.personPrefixTypeList);
    this.personSuffixTypeResponses.next(
      this.Lookupdata.personSuffixTypeResponses
    );
    this.countryList.next(this.Lookupdata.countryList);
  }

  set_title_lookup(data: any) {
    this.titleResponses.next(data);
  }

  set_gender_lookup(data: any) {
    this.genderList.next(data);
  }

  get_lookup_statesList(countryId: number) {
    let countryList = this.Lookupdata.countryList;
    for (var i = 0; i < countryList.length; i++) {
      if (countryId == countryList[i].countryId) {
        return countryList[i].states;
      }
    }
  }

  getFormattedDate(date: string) {
    if (date) {
      return new Date(
        this._datepipe.transform(date, "yyyy/MM/dd")
      ).toISOString();
    } else return date;
  }
}
