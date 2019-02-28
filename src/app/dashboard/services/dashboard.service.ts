import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { ApiEndpoints } from "../../shared/apiendpoints";
import { HttpClient } from "@angular/common/http";
import { HttpoptionsService } from "../../shared/httpoptions.service";

@Injectable({
  providedIn: "root"
})
export class DashboardService {

  notification = new BehaviorSubject<any>("");
  
  constructor(
    private http: HttpClient,
    private httpOptions: HttpoptionsService
  ) {}

  get_notification = this.notification.asObservable();

  set_notification(data: any) {
    this.notification.next(data);
  }

  getnotification(): Observable<any> {
    return this.http.get<any>(
      ApiEndpoints.get_alerts(),
      this.httpOptions.gethttpOptions()
    );
  }

  getUserContacts(): Observable<any> {
    return this.http.get<any>(
      ApiEndpoints.get_user_contact(),
      this.httpOptions.gethttpOptions()
    );
  }
  postAccountUserContact(contact: any): Observable<any> {
    return this.http.post(
      ApiEndpoints.post_user_contact(),
      contact,
      this.httpOptions.gethttpOptions()
    );
  }

  putUserContact(contact: any): Observable<any> {
    return this.http.put(
      ApiEndpoints.put_user_contact(),
      contact,
      this.httpOptions.gethttpOptions()
    );
  }

  getUserMenuData(): Observable<any> {
    return this.http.get<any>(
      ApiEndpoints.get_user_menu_access(),
      this.httpOptions.gethttpOptions()
    );
  }

  set_menu_access_data(data: any) {
    localStorage.setItem("*%%*###", btoa(JSON.stringify(data)));
  }

}
