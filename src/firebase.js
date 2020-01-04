import * as firebase from "firebase";
// web app's\ Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDD7OOLUrDY9FIhRRC5r4QyMS77dpNWeiM",
  authDomain: "dog-matching.firebaseapp.com",
  databaseURL: "https://dog-matching.firebaseio.com",
  projectId: "dog-matching",
  storageBucket: "dog-matching.appspot.com",
  messagingSenderId: "352135765230",
  appId: "1:352135765230:web:1c98f9315eb4ab0f5367ff"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
