import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBt7CHQ1R20FCP9gfefCpEC9lgP_9161T8",
  authDomain: "login-auth-c0ea9.firebaseapp.com",
  projectId: "login-auth-c0ea9",
  storageBucket: "login-auth-c0ea9.firebasestorage.app",
  messagingSenderId: "574199436458",
  appId: "1:574199436458:web:a11739e7507ee08a746cd3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);