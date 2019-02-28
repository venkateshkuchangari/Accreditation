import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SharedModule } from "./shared/shared.module";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { UserLoginComponent } from "./auth/user-login/user-login.component";
import { AppHttpInterceptor } from "./app.interceptor";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { AuthService } from "./auth/services/auth.service";
import { AuthGuard } from "./auth/services/auth-guard.service";
import { LookupService } from "./shared/lookup.service";
import { MenuAccessGaurd } from "./shared/access-gaurd/access-gaurd.service";
import { PaymentService } from "./payment/payment.service";

@NgModule({
  declarations: [AppComponent, UserLoginComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule
   ],
  providers: [
    AuthService,
    PaymentService,
    AuthGuard,
    MenuAccessGaurd,
    LookupService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
