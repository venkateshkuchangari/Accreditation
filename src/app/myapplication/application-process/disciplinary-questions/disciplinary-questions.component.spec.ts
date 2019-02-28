import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplinaryQuestionsComponent } from './disciplinary-questions.component';

describe('DisciplinaryQuestionsComponent', () => {
  let component: DisciplinaryQuestionsComponent;
  let fixture: ComponentFixture<DisciplinaryQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisciplinaryQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplinaryQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
