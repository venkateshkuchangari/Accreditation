import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceTermsModalComponent } from './service-terms-modal.component';

describe('ServiceTermsModalComponent', () => {
  let component: ServiceTermsModalComponent;
  let fixture: ComponentFixture<ServiceTermsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceTermsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceTermsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
