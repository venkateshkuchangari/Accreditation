import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiplistinputComponent } from './chiplistinput.component';

describe('ChiplistinputComponent', () => {
  let component: ChiplistinputComponent;
  let fixture: ComponentFixture<ChiplistinputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiplistinputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiplistinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
