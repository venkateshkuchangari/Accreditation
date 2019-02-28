import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewChecked
} from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";
import { AppLoaderIndicatorService } from "./app-loader-indicator.service";
import { authModel, loginParams } from "./auth/services/auth-model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = "Accreditation";
  loading: boolean = true;
  loadingSubject: Subject<boolean> = new BehaviorSubject(false);

  constructor(
    private loaderIndicatorService: AppLoaderIndicatorService,
    private cdr: ChangeDetectorRef
  ) {}
  token = authModel;
  loginParams=loginParams;

  ngOnInit() {
    if (localStorage.getItem("authToken") == null) {
     localStorage.setItem("authToken", JSON.stringify(this.token));
    }
    
    if (localStorage.getItem("*%lP%*") == null) {
     localStorage.setItem("*%lP%*",btoa(JSON.stringify(this.loginParams)));
    }
  }
  ngAfterViewChecked() {
    this.loaderIndicatorService.isLoaded.subscribe(isLoaded => {
      this.loading = isLoaded;
      this.cdr.detectChanges();
    });
  }
}
