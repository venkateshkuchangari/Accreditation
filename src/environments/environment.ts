// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// import * as BUILD_DATA from "./environment.json";
// export const environment = {
//   production: false,
//   // API_BASE_URL:'https://private-api-d.nabp.pharmacy/accreditation/',
//   API_BASE_URL:BUILD_DATA.API_BASE_URL,
//   //Base URL for different environments
//   X_API_KEY:BUILD_DATA.X_API_KEY,

//   OVID_BASE_URL:BUILD_DATA.OVID_BASE_URL

// };
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // API_BASE_URL:'https://private-api-q.nabp.pharmacy/accreditation/',
  API_BASE_URL:'https://0xmcy6ngu4.execute-api.us-west-2.amazonaws.com/dev/',
  //Base URL for different environments
  X_API_KEY:'6wxvTbKRw24z4slrxVmRZ76Jde2EwJUC3YxIx579',

  OVID_BASE_URL:'https://dashboard-d.nabp.pharmacy/Login/',

  S3_BUCKET_BASE_URL:'https://s3-us-west-2.amazonaws.com/nabpfiles/'

};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
