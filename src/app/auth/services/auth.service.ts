import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject, merge } from "rxjs";
import { HttpHeaders } from "@angular/common/http";
import { ApiEndpoints } from "../../shared/apiendpoints";
import { Router, NavigationExtras } from "@angular/router";
import { environment } from "../../../environments/environment";
import { authModel, loginParams } from "./auth-model";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/x-www-form-urlencoded",
    "x-api-key": environment.X_API_KEY
  })
};

@Injectable({
  providedIn: "root"
})
export class AuthService {
  authModel = authModel;
  loginParams = loginParams;
  redirectUrl: string = "dashboard";
  redirectQueryParams: { [x: string]: any };

  constructor(private http: HttpClient, private router: Router) {}

  authLogin(authData: string): Observable<any> {
    return this.http.post(ApiEndpoints.get_auth_url(), authData, httpOptions);
  }

  login(username: string): void {
    var auth_id = JSON.parse(localStorage.getItem("authToken"));
    this.expiryTimer(auth_id.expires_in);
    this.loginParams.loggedInUserName = username;
    this.loginParams.isNotValid = false;
    this.loginParams.isLoggedIn =
      auth_id.access_token != null ||
      auth_id.access_token != undefined ||
      auth_id.access_token != "" ||
      this.loginParams.isNotValid;
    localStorage.setItem("*%lP%*", btoa(JSON.stringify(this.loginParams)));
    let navigationExtras: NavigationExtras = {
      queryParams: this.redirectQueryParams,
      queryParamsHandling: "merge"
    };
    this.router.navigate([this.redirectUrl], navigationExtras);
  }

  isUserLoggedIn(): boolean {
    let isLoggedIn = this.getIsLoggedIn();
    let isNotValid = this.getIsNotValid();
    var auth_id = JSON.parse(localStorage.getItem("authToken"));
    return !(
      auth_id.access_token === null ||
      auth_id.access_token === undefined ||
      auth_id.access_token === "" ||
      !isLoggedIn ||
      isNotValid
    );
  }

  logout(): void {
    this.loginParams.isLoggedIn = false;
    localStorage.clear();
    this.router.navigate(["/login"]);
  }

  expiryTimer(validFor: number) {
    setTimeout(() => {
      this.loginParams.isNotValid = true;
    }, 1000 * validFor);
  }

  getAuthorizationToken() {
    var auth_id = JSON.parse(localStorage.getItem("authToken"));
    return auth_id.token_type + " " + auth_id.access_token;
  }

  getIsLoggedIn() {
    if (atob(localStorage.getItem("*%lP%*")) != null) {
      return JSON.parse(atob(localStorage.getItem("*%lP%*"))).isLoggedIn;
    } else return false;
  }

  getIsNotValid() {
    if (atob(localStorage.getItem("*%lP%*")) != null) {
      return JSON.parse(atob(localStorage.getItem("*%lP%*"))).isNotValid;
    } else return false;
  }

  get_loggedin_username() {
    if (atob(localStorage.getItem("*%lP%*")) != null) {
      return JSON.parse(atob(localStorage.getItem("*%lP%*"))).loggedInUserName;
    } else return false;
  }
}
