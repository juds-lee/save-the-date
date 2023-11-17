// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAz6SGikV2etr_LeQrxWbuYrt98rFhTZOA",
  authDomain: "save-the-date-64214.firebaseapp.com",
  projectId: "save-the-date-64214",
  storageBucket: "save-the-date-64214.appspot.com",
  messagingSenderId: "644898729768",
  appId: "1:644898729768:web:f7998987f0aa9346afea1d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);