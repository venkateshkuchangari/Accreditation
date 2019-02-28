import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFacilityDetailComponent } from './myfacility-details.component';

describe('FacFacdetailsComponent', () => {
  let component: MyFacilityDetailComponent;
  let fixture: ComponentFixture<MyFacilityDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFacilityDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFacilityDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
