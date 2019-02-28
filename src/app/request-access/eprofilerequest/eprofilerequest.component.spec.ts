import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EprofilerequestComponent } from './eprofilerequest.component';

describe('EprofilerequestComponent', () => {
  let component: EprofilerequestComponent;
  let fixture: ComponentFixture<EprofilerequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EprofilerequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EprofilerequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
