import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyOwnershipComponent } from './company-ownership.component';

describe('CompanyOwnershipComponent', () => {
  let component: CompanyOwnershipComponent;
  let fixture: ComponentFixture<CompanyOwnershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyOwnershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyOwnershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
