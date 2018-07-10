const firebase = require('firebase');

const config = {
  apiKey: "AIzaSyChFy8tksbphncOixvWePQWtJUxDp5e858",
  authDomain: "merch-roadie.firebaseapp.com",
  databaseURL: "https://merch-roadie.firebaseio.com",
  projectId: "merch-roadie",
  storageBucket: "merch-roadie.appspot.com",
  messagingSenderId: "171492774266"
};
firebase.initializeApp(config);

module.exports = firebase.auth();
