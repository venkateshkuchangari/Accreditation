import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EprofilerequestModalComponent } from './eprofilerequest-modal.component';

describe('EprofilerequestModalComponent', () => {
  let component: EprofilerequestModalComponent;
  let fixture: ComponentFixture<EprofilerequestModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EprofilerequestModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EprofilerequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
