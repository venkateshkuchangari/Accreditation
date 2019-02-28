import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyactivitiesModalComponent } from './pharmacyactivities-modal.component';

describe('PharmacyactivitiesModalComponent', () => {
  let component: PharmacyactivitiesModalComponent;
  let fixture: ComponentFixture<PharmacyactivitiesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacyactivitiesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyactivitiesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
