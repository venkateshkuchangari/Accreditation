import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFacilityComponent } from './myfacility.component';

describe('FacilityComponent', () => {
  let component: MyFacilityComponent;
  let fixture: ComponentFixture<MyFacilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFacilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
