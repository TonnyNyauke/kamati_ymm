import firebase from 'firebase/compat/app';
import 'firebase/compat/database'
import 'firebase/compat/auth'

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