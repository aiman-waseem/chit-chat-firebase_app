// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADPNpGj96lZ-Zam_ol4pplKQTc4_DjrSg",
  authDomain: "fir-chatapp-1c6da.firebaseapp.com",
  projectId: "fir-chatapp-1c6da",
  storageBucket: "fir-chatapp-1c6da.appspot.com",
  messagingSenderId: "470732953101",
  appId: "1:470732953101:web:d12362c9f1bdb556f26744",
  measurementId: "G-DQC244D451"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)  // pass the app in getAuth function in which you are trying to set up 
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)