import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualOwnershipComponent } from './individual-ownership.component';

describe('IndividualOwnershipComponent', () => {
  let component: IndividualOwnershipComponent;
  let fixture: ComponentFixture<IndividualOwnershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualOwnershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualOwnershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
