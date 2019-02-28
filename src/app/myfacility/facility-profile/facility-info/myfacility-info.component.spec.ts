import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFacilityInfoComponent } from './myfacility-info.component';

describe('FacFacinfoComponent', () => {
  let component: MyFacilityInfoComponent;
  let fixture: ComponentFixture<MyFacilityInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFacilityInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFacilityInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
