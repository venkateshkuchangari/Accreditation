import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-facility',
  templateUrl: './myfacility.component.html',
  styleUrls: ['./myfacility.component.scss']
})
export class MyFacilityComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

}
