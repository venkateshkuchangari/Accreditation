import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EprofileLandingComponent } from './eprofile-landing.component';

describe('EprofileLandingComponent', () => {
  let component: EprofileLandingComponent;
  let fixture: ComponentFixture<EprofileLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EprofileLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EprofileLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
