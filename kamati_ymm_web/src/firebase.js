import firebase from 'firebase/compat/app';
import 'firebase/compat/database'
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyB3CCFzz5ZMtRv7mk05rn-O9wPKdlbPIVw",
    authDomain: "kamatiymm.web.app",
    projectId: "kamatiymm",
    storageBucket: "kamatiymm.appspot.com",
    messagingSenderId: "592231110585",
    appId: "1:592231110585:android:70e0c1230b57e4d32c0868"
}

firebase.initializeApp(firebaseConfig);

export default firebase;

/**
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD0GvU4B3yGQVZ3czsgl0vXtAvLNfDYZbI",
  authDomain: "kamatiymm-75b65.firebaseapp.com",
  projectId: "kamatiymm-75b65",
  storageBucket: "kamatiymm-75b65.appspot.com",
  messagingSenderId: "1085590009962",
  appId: "1:1085590009962:web:4f1673d60532b7c15eb213",
  measurementId: "G-C3SWDL3269"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app); */