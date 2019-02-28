import {
  Component,
  ChangeDetectorRef,
  SimpleChanges,
  Input,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MyErrorStateMatcher } from "../../shared/form-validations";
import { ApplicationService } from "src/app/myapplication/myapplication.service";
import {
  OwnershipQuestion,
  Answer,
  SaveQuestion
} from "src/app/myapplication/application-process/ownership-question/question.model";
import { LookupService } from "../lookup.service";
import {
  _Question_Type_Constants,
  _Input_Regex
} from "../application-constants";
import { Subscription } from "rxjs";

@Component({
  selector: "dynamic-form",
  templateUrl: "dynamic-form.component.html",
  styleUrls: ["dynamic-form.component.scss"]
})
export class DynamicFormComponent implements OnInit, OnDestroy {
  matcher = new MyErrorStateMatcher();
  @Input() inputQuestions: OwnershipQuestion[];
  @Output() answersToParent = new EventEmitter<SaveQuestion>();
  ownershipQuestions: OwnershipQuestion[];
  applicationQuestionDataId: number;
  objectProps = [];
  existingFileMetadatas = [];
  documentTypeIds = [];
  form: FormGroup;
  formGroupCreated = false;
  childIds: any = [];
  saveResponse = [];
  stateList = [];
  subscription: Subscription;
  formSubscription: Subscription;
  questionTypes = _Question_Type_Constants;
  selectAllChecked: boolean = false;
  constructor(
    private lookupService: LookupService,
    private myapplicationService: ApplicationService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit() {
    this.ownershipQuestions = [...this.inputQuestions];
    this.childIds = [];
    this.ownershipQuestions.forEach(element => {
      element.parentValue = null;
      if (element.childQuestionIds != null) {
        this.childIds = this.childIds.concat(element.childQuestionIds);
      }
    });
    this.stateList = this.lookupService.get_lookup_statesList(230);
    this.createFormGroup();
    this.subscription = this.myapplicationService._next_click_submit.subscribe(
      value => {
        if (value) {
          this.goToNext();
        }
      }
    );
  }

  selectMultipleChanged(value) {
    let stateIds = [...this.stateList.map(item => item.stateId)];
    if (
      value.length == stateIds.length &&
      value.every(element => {
        return stateIds.includes(element);
      })
    ) {
      this.selectAllChecked = true;
    } else {
      this.selectAllChecked = false;
    }
  }
  selectAll(event, index) {
    if (event.checked) {
      this.form.controls[index].patchValue([
        ...this.stateList.map(item => item.stateId)
      ]);
    } else {
      this.form.controls[index].patchValue([]);
    }
  }

  clearForm() {
    this.form.reset();
  }
  getFilesfromChild(event, index) {
    this.form.controls[index].patchValue(event);
  }

  goToNext() {
    this.saveResponse = [];
    if (this.form.valid) {
      this.objectProps.forEach(element => {
        console.log(element);
        if (element.display) {
          let _value = this.form.controls[element.key].value;
          let answer: Answer = new Answer();
          answer.questionId = element.questionId;
          switch (element.questionTypeId) {
            case this.questionTypes.text:
              answer.questionAnswerDataText = _value;
              break;
            case this.questionTypes.file_upload:
              answer.fileMetaDatas = _value;
              break;
            case this.questionTypes.state_selection:
              answer.states = _value;
              break;
            case this.questionTypes.multiple_selection:
              answer.questionAnswerDataIdList = _value;
              break;
            default:
              answer.questionAnswerDataId = _value;
              break;
          }
          this.saveResponse.push(answer);
        }
      });
      this.saveQuestions();
    }
  }

  saveQuestions() {
    let saveData: SaveQuestion = new SaveQuestion();
    saveData.answerRequests = this.saveResponse;
    this.answersToParent.emit(saveData);
  }

  createFormGroup() {
    this.objectProps = Object.keys(this.ownershipQuestions).map(prop => {
      return Object.assign({}, { key: prop }, this.ownershipQuestions[prop]);
    });
    const formGroup = {};
    for (let prop of Object.keys(this.ownershipQuestions)) {
      this.existingFileMetadatas.push([]);
      if (
        this.ownershipQuestions[prop].questionTypeId ==
        this.questionTypes.file_upload
      ) {
        this.documentTypeIds[prop] = this.ownershipQuestions[
          prop
        ].questionDataList[0].applicationQuestionDataValue;
      } else {
        this.documentTypeIds[prop] = 0;
      }
      this.objectProps[prop].display = true;
      if (
        this.childIds.filter(
          a => a === this.ownershipQuestions[prop].questionId
        ).length > 0
      ) {
        this.objectProps[prop].display = false;
      }

      if (this.ownershipQuestions[prop].answer != null) {
        switch (this.ownershipQuestions[prop].questionTypeId) {
          case this.questionTypes.text:
            formGroup[prop] = new FormControl(
              this.ownershipQuestions[prop].answer.questionAnswerDataText || "",
              this.mapValidators(this.ownershipQuestions[prop])
            );
            break;
          case this.questionTypes.file_upload:
            formGroup[prop] = new FormControl(
              this.ownershipQuestions[prop].answer.fileMetaDatas || "",
              this.mapValidators(this.ownershipQuestions[prop])
            );
            this.existingFileMetadatas[prop] = this.ownershipQuestions[
              prop
            ].answer.fileMetaDatas;
            break;
          case this.questionTypes.state_selection:
            formGroup[prop] = new FormControl(
              this.ownershipQuestions[prop].answer.states || "",
              this.mapValidators(this.ownershipQuestions[prop])
            );
            if (
              this.ownershipQuestions[prop].answer.states.length ==
              this.stateList.length
            ) {
              this.selectMultipleChanged(
                this.ownershipQuestions[prop].answer.states
              );
            }
            break;
          case this.questionTypes.multiple_selection:
            formGroup[prop] = new FormControl(
              this.ownershipQuestions[prop].answer.questionAnswerDataIdList ||
                "",
              this.mapValidators(this.ownershipQuestions[prop])
            );
            break;
          default:
            formGroup[prop] = new FormControl(
              this.ownershipQuestions[prop].answer.questionAnswerDataId || "",
              this.mapValidators(this.ownershipQuestions[prop])
            );
            break;
        }
      } else {
        formGroup[prop] = new FormControl(
          "",
          this.mapValidators(this.ownershipQuestions[prop])
        );
      }
    }
    this.form = new FormGroup(formGroup);
    this.formGroupCreated = true;
    this.applyChanges();
    this.validationEnabled();
    this.subscribeFormChanges();
  }

  subscribeFormChanges() {
    this.formSubscription = this.form.valueChanges.subscribe(value => {
      this.validationEnabled();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.formSubscription.unsubscribe();
    this.myapplicationService.setOnClickNext(false);
  }

  validationEnabled() {
    if (this.form.valid) {
      this.myapplicationService.setEnableNextClick(true);
    } else {
      this.myapplicationService.setEnableNextClick(false);
    }
  }

  applyChanges() {
    this.objectProps.forEach((element, index) => {
      let _question = this.objectProps[index];
      let _value = this.form.controls[index].value;
      this.hideQuestions(_question);
      if (Array.isArray(_value)) {
        _value.forEach(element => {
          this.filterEnableChildQuestions(_question, element);
        });
      } else {
        this.filterEnableChildQuestions(_question, _value);
      }
    });
  }

  filterEnableChildQuestions(_question: any, _value: any) {
    if (_question.childQuestionIds.length != 0 && _question.display == true) {
      _question.displayRuleForChildQuestions
        .filter(a => a.parentAnswerValue === _value)
        .forEach(item => {
          let _index = this.objectProps.findIndex(
            a => a.questionId === item.childQuestionId
          );
          if (_index >= 0) {
            this.objectProps[_index].display = true;
            this.form.controls[_index].enable();
            this.form.controls[_index].updateValueAndValidity();
          }
        });
    }
  }

  hideQuestions(_question) {
    if (_question.childQuestionIds.length != 0) {
      _question.childQuestionIds.forEach(item => {
        let _index = this.objectProps.findIndex(a => a.questionId === item);
        if (_index >= 0) {
          this.objectProps[_index].display = false;
          this.form.controls[_index].disable();
          this.form.controls[_index].updateValueAndValidity();
          this.hideQuestions(this.objectProps[_index]);
        }
      });
    }
  }

  onSelectionChanged(event) {
    setTimeout(() => {
      this.applyChanges();
    }, 100);
  }

  private mapValidators(question: OwnershipQuestion) {
    const formValidators = [];
    if (question.questionTypeId == this.questionTypes.text) {
      formValidators.push(
        Validators.pattern(_Input_Regex.alpha_numeric_single_regex)
      );
    }
    if (question.isResponseRequired === true) {
      formValidators.push(Validators.required);
    }
    return formValidators;
  }

  getTooltip(string) {
    let str = "";
    let inputValue = this.form.controls[string].value;
    if (Array.isArray(inputValue)) {
      let stateNames = inputValue
        .sort((a, b) => {
          return a - b;
        })
        .map(element => {
          return this.stateList.find(state => {
            return state.stateId == element;
          }).stateName;
        });
      str = stateNames.toString();
    } else if (inputValue != null && inputValue != "") {
      str = inputValue;
    }
    return str;
  }
}
