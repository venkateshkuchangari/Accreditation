import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationMasterComponent } from './application-master.component';

describe('ApplicationMasterComponent', () => {
  let component: ApplicationMasterComponent;
  let fixture: ComponentFixture<ApplicationMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
