import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyAn5GCJJvV7QocIPI_lFdcFB0R_ex6aSto",
    authDomain: "bt3103-week-6-87eb5.firebaseapp.com",
    projectId: "bt3103-week-6-87eb5",
    storageBucket: "bt3103-week-6-87eb5.appspot.com",
    messagingSenderId: "936970189915",
    appId: "1:936970189915:web:c986e1f789109c88e5d37e",
    measurementId: "G-MR0DRML4VL"
  };

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;