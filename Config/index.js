// Import the functions you need from the SDKs you need
import app  from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDer4GT5rTCuf0DFxbkHpSxh6aaSe43p7U",
  authDomain: "whatsapp-project-178ca.firebaseapp.com",
  projectId: "whatsapp-project-178ca",
  storageBucket: "whatsapp-project-178ca.appspot.com",
  messagingSenderId: "283458393749",
  appId: "1:283458393749:web:4cdf882df322d606f62d9c",
  measurementId: "G-DFZVFJXJ27"
};

// Initialize Firebase
const firebase = app.initializeApp(firebaseConfig);
export default firebase;