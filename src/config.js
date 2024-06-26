import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyC-37tc6-H8QKmGmwFvkB-y9SiUpiQ5AsA",
  authDomain: "project-25e3a.firebaseapp.com",
  databaseURL: "https://project-25e3a-default-rtdb.firebaseio.com",
  projectId: "project-25e3a",
  storageBucket: "project-25e3a.appspot.com",
  messagingSenderId: "291792162416",
  appId: "1:291792162416:web:74bf2fd7140be914d8eeb5",
  measurementId: "G-0TPKEV7814"
};

const appBottle = firebase.initializeApp(firebaseConfig, "bottle");

export default appBottle;