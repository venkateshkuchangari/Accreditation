import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFacilityContactsComponent } from './myfacility-contacts.component';

describe('MyFacilityContactsComponent', () => {
  let component: MyFacilityContactsComponent;
  let fixture: ComponentFixture<MyFacilityContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFacilityContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFacilityContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
