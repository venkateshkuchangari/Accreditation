import { Injectable, EventEmitter } from "@angular/core";
import { HttpRequest } from "@angular/common/http";
import { Subject, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppLoaderIndicatorService {

  constructor() { }

  isLoaded: Subject<boolean>= new BehaviorSubject<boolean>(false);
  
  /**
   * Stores all currently active requests
   */
  private requests: HttpRequest<any>[] = [];
  
  /**
   * Adds request to the storage and notifies observers
   */
  onStarted(req: HttpRequest<any>): void {
    this.requests.push(req);
    this.notify();
  }
  
  /**
   * Removes request from the storage and notifies observers
   */
  onFinished(req: HttpRequest<any>): void {
    const index = this.requests.indexOf(req);
    if (index !== -1) {
      this.requests.splice(index, 1);
    }
    this.notify();
  }
  
  /**
   * Notifies observers about whether there are any requests on fly
   */
  private notify(): void {
    this.isLoaded.next(this.requests.length !== 0)
  }
  
}

