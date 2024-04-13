import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"

export default defineNuxtPlugin((nuxtApp) => {

const config = useRuntimeConfig()

const firebaseConfig = {
    apiKey: config.apiKey,
    // apiKey: "AIzaSyAbwylvVD25yuMBLU2H7ND49FyXkYfwhZo",
    authDomain: config.authDomain,
    // authDomain: "affiliate-8d45d.firebaseapp.com",
    projectId: config.projectId,
    // projectId: "affiliate-8d45d",
    storageBucket: config.storageBucket,
    // storageBucket: "affiliate-8d45d.appspot.com",
    messagingSenderId: config.messagingSenderId,
    // messagingSenderId: "287584876106",
    appId: config.appId,
    // appId: "1:287584876106:web:223b2352f7ff2aaa8b98b3",
    measurementId: config.measurementId,
    // measurementId: "G-JTK7MHKWPK",
    databaseURL: "https://affiliate-8d45d-default-rtdb.asia-southeast1.firebasedatabase.app"
};
  
    const firebaseApp = initializeApp(firebaseConfig);
    const firestore = getFirestore(firebaseApp);
    const database = getDatabase(firebaseApp);

    nuxtApp.vueApp.provide('firestore', firestore)
    nuxtApp.provide('firestore', firestore)

    nuxtApp.vueApp.provide('database', database)
    nuxtApp.provide('database', database)
})
