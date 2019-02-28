import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { ApiEndpoints } from "../shared/apiendpoints";
import { HttpClient } from "@angular/common/http";
import { HttpoptionsService } from "../shared/httpoptions.service";

@Injectable({
  providedIn: "root"
})
export class RequestAccessService {
  constructor(
    private http: HttpClient,
    private httpOptions: HttpoptionsService
  ) {}

  _toolbar_display_header= new BehaviorSubject<any>("")
  get_tool_bar_header=this._toolbar_display_header.asObservable(); 

  setToolBarHeader(data: any){
    this._toolbar_display_header.next(data);
  }

  postEprofileRequests(body: any[]): Observable<any> {
    return this.http.post<any>(
      ApiEndpoints.post_eprofile_request(),
      body,
      this.httpOptions.gethttpOptions()
    );
  }

  getEprofileRequestList(): Observable<any> {
    return this.http.get<any>(ApiEndpoints.get_eprofile_requests(), this.httpOptions.gethttpOptions())
  }
  
}
