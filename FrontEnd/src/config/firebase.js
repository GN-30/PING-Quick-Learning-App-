// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgKKVI9qEZ8L6IK38NYxnOWWp-q7jm3Zs",
  authDomain: "ping-6810d.firebaseapp.com",
  projectId: "ping-6810d",
  storageBucket: "ping-6810d.firebasestorage.app",
  messagingSenderId: "289348049486",
  appId: "1:289348049486:web:96fb4af5761f757f3f411f",
  measurementId: "G-KL8T3F9N23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);