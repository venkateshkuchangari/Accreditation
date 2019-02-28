import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyactivitiesComponent } from './pharmacyactivities.component';

describe('PharmacyactivitiesComponent', () => {
  let component: PharmacyactivitiesComponent;
  let fixture: ComponentFixture<PharmacyactivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacyactivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyactivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
