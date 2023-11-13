// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1pXHatyb8g9zLxIR-WlEuLVrzQZ-n9IM",
  authDomain: "flixgpt-318cb.firebaseapp.com",
  projectId: "flixgpt-318cb",
  storageBucket: "flixgpt-318cb.appspot.com",
  messagingSenderId: "559646668011",
  appId: "1:559646668011:web:f46d56555e4b522176faae",
  measurementId: "G-SG0H5T9FKK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
