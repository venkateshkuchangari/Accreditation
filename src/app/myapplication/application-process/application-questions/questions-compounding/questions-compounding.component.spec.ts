import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsCompoundingComponent } from './questions-compounding.component';

describe('QuestionsCompoundingComponent', () => {
  let component: QuestionsCompoundingComponent;
  let fixture: ComponentFixture<QuestionsCompoundingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsCompoundingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsCompoundingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
