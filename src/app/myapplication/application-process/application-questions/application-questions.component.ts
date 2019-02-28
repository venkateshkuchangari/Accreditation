import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../myapplication.service';

@Component({
  selector: 'app-application-questions',
  templateUrl: './application-questions.component.html',
  styleUrls: ['./application-questions.component.scss']
})
export class ApplicationQuestionsComponent implements OnInit {

  constructor(private applicationService:ApplicationService) { }
  tabIndexNumber = 0
  ngOnInit() {
    this.applicationService._get_application_tab_index_number
     .subscribe((value) => {
      this.tabIndexNumber = value;
    })
  }

}
