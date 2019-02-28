import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApplicationService } from './myapplication.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-application',
  templateUrl: './myapplication.component.html',
  styleUrls: ['./myapplication.component.scss']
})
export class ApplicationComponent implements OnInit,OnDestroy {

  constructor(private applicationService:ApplicationService) { }
  _toolbar_header: any 
  applicationId=""
  subscription1:Subscription; 
  subscription3:Subscription;
  ngOnInit() {   
   this.subscription1= this.applicationService.get_tool_bar_header
    .subscribe((data)=>this._toolbar_header=data)     
    this.subscription3=this.applicationService.get_tool_bar_appid
    .subscribe((data)=>{
     this.applicationId=data 
    })
  }
ngOnDestroy(){ 
  this.subscription1.unsubscribe() 
  this.subscription3.unsubscribe()
}
}
