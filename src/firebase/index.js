// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArstYMTVs6-yyZkMNNC4K9Gk100wX0n-Q",
  authDomain: "akefeventmanager.firebaseapp.com",
  projectId: "akefeventmanager",
  storageBucket: "akefeventmanager.appspot.com",
  messagingSenderId: "610323309120",
  appId: "1:610323309120:web:a54559bfb7bf8c994a35a5",
  measurementId: "G-7PZFZ7ZEVZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { db, analytics, provider, app };
