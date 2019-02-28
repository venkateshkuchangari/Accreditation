import { Injectable } from "@angular/core";
import { HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { AuthService } from "../auth/services/auth.service";
import { environment } from "../../environments/environment";
import { throwError } from "rxjs";
import { ModalService } from "./modal/modal.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class HttpoptionsService {
  constructor(
    private authService: AuthService,
    private modalService: ModalService,
    private router: Router
  ) { }

  
  public gethttpOptions() {
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.authService.getAuthorizationToken(),
        "x-api-key": environment.X_API_KEY
      })
    };
    return httpOptions;
  }

  public getfilehttpOptions() {
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAuthorizationToken(),
        "x-api-key": environment.X_API_KEY
      })
    };
    return httpOptions;
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent || error.status == 0) {
      // A client-side or network error occurred. Handle it accordingly.
      this.modalService.confirm(
        `Please check your Internet Connectivity`,
        "Error!!",
        () => {
          this.redirectToDashBoard();
        }
      );
    } else if (error.status == 401) {
      this.modalService.confirm(
        "Session Timeout!!! Please Try again Logging In",
        "Sorry!!",
        () => {
          this.redirectToLoginPage();
        }
      );
    } else if (error.status == 409) {
      this.modalService.confirm(
        "Record already exists. Please try with differnt one.",
        `Error!! Response Code: ${error.status}`,
        () => {}
      );
    } else if (error.status == 500) {
      this.modalService.confirm(
        "Back-end returned with Internal Server Error",
        `Error!! Response Code: ${error.status}`,
        () => {}
      );
    }else if (error.status == 403) {
      this.modalService.confirm(
        "Access denied to resource requested",
        `Error!! Response Code: ${error.status}`,
        () => {}
      );
    } else {
      this.modalService.confirm(
        `Message: ${this.getErrorMessage(error.error)}`,
        `Error!! Response Code: ${error.status} `,
        () => {}
      );
    }
  }

  getErrorMessage(error) {
    let string = "";
    if (error != null) {
      Object.keys(error).forEach(element => {
        string += " #" + element + ": " + error[element] + "#";
      });
    }
    return string;
  }

  redirectToLoginPage() {
    this.authService.logout();
    this.router.navigate(["login"]);
  }

  redirectToDashBoard() {
    this.router.navigate(["dashboard"]);
  }
}
