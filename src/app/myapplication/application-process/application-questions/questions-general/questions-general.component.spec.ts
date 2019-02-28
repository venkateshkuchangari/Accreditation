import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsGeneralComponent } from './questions-general.component';

describe('QuestionsGeneralComponent', () => {
  let component: QuestionsGeneralComponent;
  let fixture: ComponentFixture<QuestionsGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
