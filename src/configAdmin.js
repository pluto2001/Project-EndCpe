import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/database";
  

const firebaseConfigadmin = {
  apiKey: "AIzaSyCPpigc5lKkRawBD6QoJtQY_QwsBLXV3f0",
  authDomain: "userproject-9b5af.firebaseapp.com",
  databaseURL: "https://userproject-9b5af-default-rtdb.firebaseio.com",
  projectId: "userproject-9b5af",
  storageBucket: "userproject-9b5af.appspot.com",
  messagingSenderId: "1092786199801",
  appId: "1:1092786199801:web:5e505e9ec95ebdba9ed628"
 
};

const appAdmin = firebase.initializeApp(firebaseConfigadmin, "users");

export default appAdmin;