// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'https://nest-chat-backend.herokuapp.com',


  firebaseconfig: {
    apiKey: "AIzaSyAr7UVzcy1fieJyEJ0jEavnmmplg54pfWI",
    authDomain: "angularchat-41b65.firebaseapp.com",
    projectId: "angularchat-41b65",
    storageBucket: "angularchat-41b65.appspot.com",
    messagingSenderId: "316785472659",
    appId: "1:316785472659:web:6735afcbe55c0dd7ac4966",
    measurementId: "G-2P6NFSM586"
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
