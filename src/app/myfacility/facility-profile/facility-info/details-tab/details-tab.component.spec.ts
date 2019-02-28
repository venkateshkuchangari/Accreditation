import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDetailtabComponent } from './details-tab.component';

describe('InfoDetailtabComponent', () => {
  let component: InfoDetailtabComponent;
  let fixture: ComponentFixture<InfoDetailtabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoDetailtabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoDetailtabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
