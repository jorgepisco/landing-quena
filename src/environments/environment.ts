// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'https://8wyy91tan5.execute-api.us-east-2.amazonaws.com',
  accessKey: 'AKIAY2QDANANYJ5S6LHH',
  secretKey: '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',
  region: 'us-east-2',
  getAllArtists: '/test/api-quena/artist/getAll',
  getProductsByArtistId: '/test/api-quena/product/getByArtistId',
  getArtist: '/test/api-quena/artist/get'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
