import { TestBed, inject } from '@angular/core/testing';

import { HttpoptionsService } from './httpoptions.service';

describe('HttpoptionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpoptionsService]
    });
  });

  it('should be created', inject([HttpoptionsService], (service: HttpoptionsService) => {
    expect(service).toBeTruthy();
  }));
});
