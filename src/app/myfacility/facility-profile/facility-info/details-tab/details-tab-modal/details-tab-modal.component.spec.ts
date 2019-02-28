import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTabModalComponent } from './details-tab-modal.component';

describe('DetailsTabModalComponent', () => {
  let component: DetailsTabModalComponent;
  let fixture: ComponentFixture<DetailsTabModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsTabModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTabModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
