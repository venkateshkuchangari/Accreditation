import { TestBed, inject } from '@angular/core/testing';

import { AppLoaderIndicatorService } from './app-loader-indicator.service';

describe('AppLoaderIndicatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppLoaderIndicatorService]
    });
  });

  it('should be created', inject([AppLoaderIndicatorService], (service: AppLoaderIndicatorService) => {
    expect(service).toBeTruthy();
  }));
});
