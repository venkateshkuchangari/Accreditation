import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyOwnershipModalComponent } from './company-ownership-modal.component';

describe('CompanyOwnershipModalComponent', () => {
  let component: CompanyOwnershipModalComponent;
  let fixture: ComponentFixture<CompanyOwnershipModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyOwnershipModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyOwnershipModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
