// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_L1c5S6U6VfAUuvXCQZYheeckyo-Wnps",
  authDomain: "proooo-2a791.firebaseapp.com",
  databaseURL: "https://proooo-2a791-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "proooo-2a791",
  storageBucket: "proooo-2a791.appspot.com",
  messagingSenderId: "483739458557",
  appId: "1:483739458557:web:3c604de68fb925fcc51794",
  measurementId: "G-C2WTEQ88P7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
