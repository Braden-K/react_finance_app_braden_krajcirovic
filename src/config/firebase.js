// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVZFg9-FT8rAbWWcOo4JXepz0bM9FfkEs",
  authDomain: "react-finance-app-e7a8e.firebaseapp.com",
  projectId: "react-finance-app-e7a8e",
  storageBucket: "react-finance-app-e7a8e.appspot.com",
  messagingSenderId: "956187755752",
  appId: "1:956187755752:web:b97dd0e224dcaa0636f55d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
