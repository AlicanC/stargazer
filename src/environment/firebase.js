// @flow

import firebase from 'firebase/app';
import 'firebase/auth';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyD89Ki-nurSLbXE4ibacyjGOPOLzHmtD4E',
  authDomain: 'alicanc-superstargazer.firebaseapp.com',
  databaseURL: 'https://alicanc-superstargazer.firebaseio.com',
  projectId: 'alicanc-superstargazer',
  storageBucket: 'alicanc-superstargazer.appspot.com',
  messagingSenderId: '170681616875',
};
firebase.initializeApp(config);
