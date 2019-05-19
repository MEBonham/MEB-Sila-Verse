import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB7S9796ors6iLT_y3gI1ZpYMpdoVwZKZc",
    authDomain: "sila-verse.firebaseapp.com",
    databaseURL: "https://sila-verse.firebaseio.com",
    projectId: "sila-verse",
    storageBucket: "sila-verse.appspot.com",
    messagingSenderId: "1008780796581",
    appId: "1:1008780796581:web:93e04e614a8bb054"
  };
  //   firebase.firestore().settings({ timestampsInSnapshots: true });

class Firebase {
  constructor() {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth();
    this.db = firebase.firestore();
  }
}

  export default new Firebase();