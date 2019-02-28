import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercontactmodalComponent } from './usercontactmodal.component';

describe('UsercontactmodalComponent', () => {
  let component: UsercontactmodalComponent;
  let fixture: ComponentFixture<UsercontactmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsercontactmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsercontactmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
