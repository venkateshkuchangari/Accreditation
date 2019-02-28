import { TestBed, inject } from '@angular/core/testing';
import { MenuAccessGaurd } from './access-gaurd.service';



describe('AccessGaurdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuAccessGaurd]
    });
  });

  it('should be created', inject([MenuAccessGaurd], (service: MenuAccessGaurd) => {
    expect(service).toBeTruthy();
  }));
});
