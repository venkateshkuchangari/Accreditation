import { Component, OnInit } from '@angular/core';
import { HttpoptionsService } from 'src/app/shared/httpoptions.service';
import { ApplicationService } from 'src/app/myapplication/myapplication.service';
import { LookupService } from 'src/app/shared/lookup.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { _Application_StepIds } from "src/app/shared/application-constants";
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-disciplinary-questions',
  templateUrl: './disciplinary-questions.component.html',
  styleUrls: ['./disciplinary-questions.component.scss']
})
export class DisciplinaryQuestionsComponent implements OnInit {
  stepId = _Application_StepIds.disciplinary_questions;
  msg = "Please provide the information below for: Pharmacy owner(s), Pharmacy (including all DBA and FKA-affiliated businesses), Pharmacist-Incharge (Resident / Non-resident if applicable), and Compliance Officer.";
  questions = [];
  objectProps = [];
  statesList = [];
  disciplineEntityList = [];
  form: FormGroup;
  formGroupCreated: boolean = false;
  actionExistRadioGroup = [
    {
      id: true,
      text: "Yes"
    },
    {
      id: false,
      text: "No"
    }
  ];
  showLists: boolean[] = [];
  show: boolean = false;
  answers = [];
  subscription : Subscription;
  subscription1: Subscription;
  formSubscription: Subscription;

  constructor(
    private myapplicationService: ApplicationService,
    private httpoptionsservice: HttpoptionsService,
    private lookupService: LookupService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.subscription = this.activatedRoute.queryParams.subscribe(
      queryParams => {
        this.showDisciplinaryActionQuestions();
      }
      );
  this.statesList = this.lookupService.get_lookup_statesList(230);
  this.getDisciplineEntities();
      this.subscription1 = this.myapplicationService._next_click_submit.subscribe(
        value => {
          if (value) {
            this.submit();
          }
        }
      );
  }

  showDisciplinaryActionQuestions() {
    if (this.myapplicationService.OrganisationId == undefined) {
      setTimeout(() => {
        this.showDisciplinaryActionQuestions();
      }, 300);
    } else {
    this.myapplicationService.getDisciplinaryActionQuestions().subscribe(
      data => {
        this.questions = data;
        this.createFormGroup();
      },
      error => {
        this.httpoptionsservice.handleError(error);
      }
    )
    }
  }

  createFormGroup() {
    this.objectProps = Object.keys(this.questions).map(prop => {
      return Object.assign({}, { key: prop }, this.questions[prop]);
    });
    const formGroup = {};
    for (let prop of Object.keys(this.questions)) {
      this.showLists.push(false);
     if(this.questions[prop].answer) {
      formGroup[prop] = new FormGroup({
        disciplinaryResponse: new FormControl(this.questions[prop].answer.disciplinaryResponse, [Validators.required]),
        daEntity: new FormControl(this.questions[prop].answer.daEntity || "", [Validators.required]),
        stateId: new FormControl(this.questions[prop].answer.stateId || "", [Validators.required]),
        questionId: new FormControl(this.questions[prop].questionId || "", [Validators.required]),
      })
      this.radioChange(this.questions[prop].answer.disciplinaryResponse, prop)
    }
    else {
      formGroup[prop] = new FormGroup({
        disciplinaryResponse: new FormControl(null, [Validators.required]),
        daEntity: new FormControl("", [Validators.required]),
        stateId: new FormControl("", [Validators.required]),
        questionId: new FormControl(this.questions[prop].questionId, [Validators.required]),
      }) 
    }    
    }
    this.form = new FormGroup(formGroup);
    this.formGroupCreated = true
    this.validationEnabled(); 
    this.subscribeFormChanges();  
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription1.unsubscribe();
    this.formSubscription.unsubscribe();
    this.myapplicationService.setOnClickNext(false);
  }


  getDisciplineEntities() {
    this.myapplicationService.getDisciplineEntityList().subscribe(
      data => {
        this.disciplineEntityList = data;
      },
      error => {
        this.httpoptionsservice.handleError(error);
      }
    )
  }

  radioChange(event, index) {
    setTimeout(() => {
      if (event) {
        this.showLists[index] = event;
        this.enableControls(index)
      }
      else {
        this.showLists[index] = event;
        this.resetDisableControls(index);
      }
    }, 100);
  }

  submit() {
    this.answers = [];   
    this.answers=Object.values(this.form.getRawValue())
    this.myapplicationService.postDisciplinaryActionQuestions(this.answers).subscribe(
      response => {
        this.myapplicationService.checkStepTrackerId(
          this.stepId,
          this.stepId + 1
        );
      },
      error => {
        this.httpoptionsservice.handleError(error);
      }
    );
  }

  resetDisableControls(index) {
    this.form.get(index + ".daEntity").reset();
    this.form.get(index + ".stateId").reset();
    this.form.get(index + ".daEntity").disable();
    this.form.get(index + ".stateId").disable();
  }
  enableControls(index) {
    this.form.get(index + ".daEntity").enable();
    this.form.get(index + ".stateId").enable();
  }

  subscribeFormChanges() {
    this.formSubscription = this.form.valueChanges.subscribe(value => {
      this.validationEnabled();
    });
  }

  validationEnabled(){
    if (this.form.valid) {
      this.myapplicationService.setEnableNextClick(true);
    } else {
      this.myapplicationService.setEnableNextClick(false);
    }
  }
}


