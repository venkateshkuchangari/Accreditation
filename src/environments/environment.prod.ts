import * as BUILD_DATA from "./environment.json";
export const environment = {
  production: true,
  
  API_BASE_URL:BUILD_DATA.API_BASE_URL,
  //Base URL for different environments
  X_API_KEY:BUILD_DATA.X_API_KEY,

  OVID_BASE_URL:BUILD_DATA.OVID_BASE_URL

};