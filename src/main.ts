import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { LicenseManager } from 'ag-grid-enterprise'; 

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
  const yourlicense = 'Evaluation_License_Valid_Until__16_September_2018__MTUzNzA1MjQwMDAwMA==b7ecc78983c1bf33b5eb3682cc62cfaa';
  LicenseManager.setLicenseKey(yourlicense); 