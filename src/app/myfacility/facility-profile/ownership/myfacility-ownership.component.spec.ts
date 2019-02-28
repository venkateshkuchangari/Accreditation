import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFacilityOwnershipComponent } from './myfacility-ownership.component';

describe('MyfacilityOwnershipComponent', () => {
  let component: MyFacilityOwnershipComponent;
  let fixture: ComponentFixture<MyFacilityOwnershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFacilityOwnershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFacilityOwnershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
