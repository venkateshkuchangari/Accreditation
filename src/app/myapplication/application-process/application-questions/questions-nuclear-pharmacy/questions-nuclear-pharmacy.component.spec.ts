import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsNuclearPharmacyComponent } from './questions-nuclear-pharmacy.component';

describe('QuestionsNuclearPharmacyComponent', () => {
  let component: QuestionsNuclearPharmacyComponent;
  let fixture: ComponentFixture<QuestionsNuclearPharmacyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsNuclearPharmacyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsNuclearPharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
