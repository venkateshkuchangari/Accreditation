import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualOwnershipModalComponent } from './individual-ownership-modal.component';

describe('IndividualOwnershipModalComponent', () => {
  let component: IndividualOwnershipModalComponent;
  let fixture: ComponentFixture<IndividualOwnershipModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualOwnershipModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualOwnershipModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
