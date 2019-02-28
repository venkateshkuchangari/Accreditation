import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationMasterModalComponent } from './application-master-modal.component';

describe('ApplicationMasterModalComponent', () => {
  let component: ApplicationMasterModalComponent;
  let fixture: ComponentFixture<ApplicationMasterModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationMasterModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationMasterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
