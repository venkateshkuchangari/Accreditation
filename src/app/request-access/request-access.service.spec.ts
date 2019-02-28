import { TestBed, inject } from '@angular/core/testing';

import { RequestAccessService } from './request-access.service';

describe('RequestAccessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestAccessService]
    });
  });

  it('should be created', inject([RequestAccessService], (service: RequestAccessService) => {
    expect(service).toBeTruthy();
  }));
});
