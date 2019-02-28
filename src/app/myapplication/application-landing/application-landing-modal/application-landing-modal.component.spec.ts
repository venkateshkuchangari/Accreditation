import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationLandingModalComponent } from './application-landing-modal.component';

describe('ApplicationFacilitiesInfoComponent', () => {
  let component: ApplicationLandingModalComponent;
  let fixture: ComponentFixture<ApplicationLandingModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationLandingModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationLandingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
