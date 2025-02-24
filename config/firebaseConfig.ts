// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPzczm5UQyoJDuJcAFOEMb3qslU-i_vkM",
  authDomain: "sarj-4c1ee.firebaseapp.com",
  projectId: "sarj-4c1ee",
  storageBucket: "sarj-4c1ee.firebasestorage.app",
  messagingSenderId: "1064255766485",
  appId: "1:1064255766485:web:a5726ffb3e2edac42c075c",
  measurementId: "G-ST084JH4VP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
