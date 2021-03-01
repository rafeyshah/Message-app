import firebase from "firebase";

const firebaseApp= firebase.initializeApp({
    apiKey: "AIzaSyBn0jTSLT7-2dBkv5KPDSF3A7XBSul-nh4",
    authDomain: "messenger-clone-a4e46.firebaseapp.com",
    projectId: "messenger-clone-a4e46",
    storageBucket: "messenger-clone-a4e46.appspot.com",
    messagingSenderId: "629098231772",
    appId: "1:629098231772:web:f5182b6b2d6c37e4e8c119",
    measurementId: "G-8X0RGQYLW7"
})

const db= firebaseApp.firestore()

export default db