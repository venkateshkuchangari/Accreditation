import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessQuestionComponent } from './business-question.component';

describe('BusinessQuestionComponent', () => {
  let component: BusinessQuestionComponent;
  let fixture: ComponentFixture<BusinessQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
