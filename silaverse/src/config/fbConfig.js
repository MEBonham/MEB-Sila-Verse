import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB7S9796ors6iLT_y3gI1ZpYMpdoVwZKZc",
    authDomain: "sila-verse.firebaseapp.com",
    databaseURL: "https://sila-verse.firebaseio.com",
    projectId: "sila-verse",
    storageBucket: "sila-verse.appspot.com",
    messagingSenderId: "1008780796581",
    appId: "1:1008780796581:web:93e04e614a8bb054"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({ timestampsInSnapshots: true });

  export default firebase;