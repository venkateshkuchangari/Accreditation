import { TestBed, inject } from '@angular/core/testing';

import { MyFacilityService } from './myfacility.service';

describe('FacinlityinfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyFacilityService]
    });
  });

  it('should be created', inject([MyFacilityService], (service: MyFacilityService) => {
    expect(service).toBeTruthy();
  }));
});
