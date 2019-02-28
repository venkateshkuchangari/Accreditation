import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffLicenseComponent } from './staff-license.component';

describe('IndividualLicenseComponent', () => {
  let component: StaffLicenseComponent;
  let fixture: ComponentFixture<StaffLicenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffLicenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
