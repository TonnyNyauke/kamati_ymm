// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_-ij9cmmzTpLJ7XRFwVaF4YpLo44Nfqw",
  authDomain: "healthsite-3919c.firebaseapp.com",
  projectId: "healthsite-3919c",
  storageBucket: "healthsite-3919c.appspot.com",
  messagingSenderId: "61314952120",
  appId: "1:61314952120:web:f0736aa54de59096be3d4d",
  measurementId: "G-ZY3CQCVSFX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app)


export {db, storage};