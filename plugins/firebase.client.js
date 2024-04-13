import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAbwylvVD25yuMBLU2H7ND49FyXkYfwhZo",
    authDomain: "affiliate-8d45d.firebaseapp.com",
    projectId: "affiliate-8d45d",
    storageBucket: "affiliate-8d45d.appspot.com",
    messagingSenderId: "287584876106",
    appId: "1:287584876106:web:223b2352f7ff2aaa8b98b3",
    measurementId: "G-JTK7MHKWPK"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const db = firebase.firestore()
