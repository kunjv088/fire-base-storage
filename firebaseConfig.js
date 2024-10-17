// Import Firebase dependencies
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5H8EHdf8Yo6v5oBUNtjHrAeHTo3szb8E",
  authDomain: "pr-8-73020.firebaseapp.com",
  projectId: "pr-8-73020",
  storageBucket: "pr-8-73020.appspot.com",
  messagingSenderId: "171713931",
  appId: "1:171713931:web:ee224b7608eab8656cfb8e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
