import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsEcommerceComponent } from './questions-ecommerce.component';

describe('QuestionsEcommerceComponent', () => {
  let component: QuestionsEcommerceComponent;
  let fixture: ComponentFixture<QuestionsEcommerceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsEcommerceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsEcommerceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
