import { Component, OnInit } from "@angular/core";
import { RequestAccessService } from "./request-access.service";

@Component({
  selector: "app-request-access",
  templateUrl: "./request-access.component.html",
  styleUrls: ["./request-access.component.scss"]
})
export class RequestAccessComponent implements OnInit {
  constructor(private requestAccessService:RequestAccessService) {}
  _toolbar_header: any;
  ngOnInit() {
    this.requestAccessService.get_tool_bar_header.subscribe((data)=>this._toolbar_header=data)
  }
}
