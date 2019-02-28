import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityLicenseModalComponent } from './facility-license-modal.component';

describe('FacilityLicenseModalComponent', () => {
  let component: FacilityLicenseModalComponent;
  let fixture: ComponentFixture<FacilityLicenseModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilityLicenseModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityLicenseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
