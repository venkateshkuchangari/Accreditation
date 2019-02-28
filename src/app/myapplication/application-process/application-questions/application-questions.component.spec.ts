import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationQuestionsComponent } from './application-questions.component';

describe('ApplicationQuestionsComponent', () => {
  let component: ApplicationQuestionsComponent;
  let fixture: ComponentFixture<ApplicationQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
