import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccreditationModalComponent } from './accreditation-modal.component';

describe('AccreditationModalComponent', () => {
  let component: AccreditationModalComponent;
  let fixture: ComponentFixture<AccreditationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccreditationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccreditationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
