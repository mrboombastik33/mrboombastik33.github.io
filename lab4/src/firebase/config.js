// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyC9vfho9uJeAiWOlMtOGlXcPvczld3LKrs",
  authDomain: "photography-courses-919b2.firebaseapp.com",
  projectId: "photography-courses-919b2",
  storageBucket: "photography-courses-919b2.firebasestorage.app",
  messagingSenderId: "687946357942",
  appId: "1:687946357942:web:5b40ee78577e07ea93da17",
  measurementId: "G-DFLZ6FCFZ9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); 
