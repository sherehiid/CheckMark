// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC02nj2hERT_01FRapVZA8fPVREMX6S1tg",
  authDomain: "checkmark-86b5c.firebaseapp.com",
  databaseURL: "https://checkmark-86b5c-default-rtdb.firebaseio.com",
  projectId: "checkmark-86b5c",
  storageBucket: "checkmark-86b5c.firebasestorage.app",
  messagingSenderId: "411465346708",
  appId: "1:411465346708:web:df6a83f2c6d71ac7190e81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword };