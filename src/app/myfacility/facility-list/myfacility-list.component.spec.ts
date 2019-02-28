import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MyFacilityListComponent } from './myfacility-list.component';

describe('FacMyfacilityComponent', () => {
  let component: MyFacilityListComponent;
  let fixture: ComponentFixture<MyFacilityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFacilityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFacilityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
