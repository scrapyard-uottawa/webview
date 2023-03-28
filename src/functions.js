
import 'firebase/firestore';
import { db } from './firebase';
const firebase = require("firebase");
require("firebase/firestore");
const firebaseConfig = {
    apiKey: "AIzaSyAVGBI0h9is1TZ2POELm-iuzFjpKTwYG6I",
    authDomain: "scrapyard-5d379.firebaseapp.com",
    projectId: "scrapyard-5d379",
    storageBucket: "scrapyard-5d379.appspot.com",
    messagingSenderId: "370680596003",
    appId: "1:370680596003:web:69cd831c4931d019ebd396",
    measurementId: "G-HT651NZP2F"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

async function checkCredentials(userName, password) {
  
    const usersRef = db.collection('Users');
    const adminDoc = await usersRef.doc('admin').get();
    const devDoc = await usersRef.doc('dev').get();
    const usersDoc = await usersRef.doc('users').get();
  
    const docs = [adminDoc, devDoc, usersDoc];
    const foundInDocs = [];
  
    docs.forEach(doc => {
      const data = doc.data();
      if (data.username === userName && data.password === password) {
        foundInDocs.push(doc.id);
      }
    });
  
    if (foundInDocs.length === 0) {
      console.log('Credentials not found');
    } else {
      console.log(`Credentials found in documents: ${foundInDocs.join(', ')}`);
    }
  }
  
checkCredentials('admin', 'admin');