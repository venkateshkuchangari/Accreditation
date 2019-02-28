import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseProgramsComponent } from './choose-programs.component';

describe('ChooseProgramsComponent', () => {
  let component: ChooseProgramsComponent;
  let fixture: ComponentFixture<ChooseProgramsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseProgramsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
