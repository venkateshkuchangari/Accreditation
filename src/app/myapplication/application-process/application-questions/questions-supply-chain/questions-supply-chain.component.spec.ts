import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsSupplyChainComponent } from './questions-supply-chain.component';

describe('QuestionsSupplyChainComponent', () => {
  let component: QuestionsSupplyChainComponent;
  let fixture: ComponentFixture<QuestionsSupplyChainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsSupplyChainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsSupplyChainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
