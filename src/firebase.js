// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVGBI0h9is1TZ2POELm-iuzFjpKTwYG6I",
  authDomain: "scrapyard-5d379.firebaseapp.com",
  projectId: "scrapyard-5d379",
  storageBucket: "scrapyard-5d379.appspot.com",
  messagingSenderId: "370680596003",
  appId: "1:370680596003:web:69cd831c4931d019ebd396",
  measurementId: "G-HT651NZP2F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = firebase.initializeApp(firebaseConfig).firestore()

export default db;
