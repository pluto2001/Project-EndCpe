import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/database";

const firebaseConfigMachine = {
  apiKey: "AIzaSyA6QxdzjI6ZVCBxg5ue1RAGrAONJHRpR94",
  authDomain: "self-test-171ca.firebaseapp.com",
  databaseURL: "https://self-test-171ca-default-rtdb.firebaseio.com",
  projectId: "self-test-171ca",
  storageBucket: "self-test-171ca.appspot.com",
  messagingSenderId: "516215072886",
  appId: "1:516215072886:web:07df3ef93bd4141538d757",
  measurementId: "G-949RXZXDCX"
};

const appMachine = firebase.initializeApp(firebaseConfigMachine, "machine");

export default appMachine;