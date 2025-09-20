// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZ_Xq3LaHbCbf3vZ6H0SrqkAGhP-puRgs",
  authDomain: "webapp-b6b11.firebaseapp.com",
  projectId: "webapp-b6b11",
  storageBucket: "webapp-b6b11.firebasestorage.app",
  messagingSenderId: "897201812984",
  appId: "1:897201812984:web:89d4aebf768ec69fa4d20d",
  measurementId: "G-QYH529GS3J"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
