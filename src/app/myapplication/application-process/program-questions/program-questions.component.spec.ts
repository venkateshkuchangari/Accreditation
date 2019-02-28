import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramQuestionsComponent } from './program-questions.component';

describe('ProgramQuestionsComponent', () => {
  let component: ProgramQuestionsComponent;
  let fixture: ComponentFixture<ProgramQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
