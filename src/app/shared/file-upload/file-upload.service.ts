import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { 

  }

  public upload(file,url:any): Observable<number> {
    const req = new HttpRequest('PUT', url, file, {
        reportProgress: true
      });
       const progress = new Subject<number>();
      this.http.request(req)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round(100 * event.loaded / event.total);
          progress.next(percentDone);
         } else if (event instanceof HttpResponse) {
          progress.complete();
        }
      });   
     return progress.asObservable()    
  }
}
