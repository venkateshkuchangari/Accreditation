import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityApplicationsComponent } from './facility-applications.component';

describe('FacilityApplicationsComponent', () => {
  let component: FacilityApplicationsComponent;
  let fixture: ComponentFixture<FacilityApplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilityApplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
