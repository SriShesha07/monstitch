// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider  } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnp1MKTl_6I8dE6B22vduuLQ8zssbOy2Y",
  authDomain: "monstitch-8969a.firebaseapp.com",
  projectId: "monstitch-8969a",
  storageBucket: "monstitch-8969a.firebasestorage.app",
  messagingSenderId: "26217911849",
  appId: "1:26217911849:web:7fa34395da6cea55faee38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { fireDB, auth, googleProvider };