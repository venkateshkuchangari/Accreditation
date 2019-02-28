import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { AppLoaderIndicatorService } from "./app-loader-indicator.service";
import 'rxjs/add/operator/finally';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

constructor(private loaderIndicatorService: AppLoaderIndicatorService) {}
  
 intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // emit onStarted event before request execution
    this.loaderIndicatorService.onStarted(req);
    
    return next
      .handle(req)
      // emit onFinished event after request execution
      .finally(() => this.loaderIndicatorService.onFinished(req));
  }
}