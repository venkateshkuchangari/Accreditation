import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VppQuestionsComponent } from './vpp-questions.component';

describe('VppQuestionsComponent', () => {
  let component: VppQuestionsComponent;
  let fixture: ComponentFixture<VppQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VppQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VppQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
