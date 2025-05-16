import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"

export default defineNuxtPlugin((nuxtApp) => {

const config = useRuntimeConfig()

const firebaseConfig = {
    apiKey: config.FirebaseapiKey,
     authDomain: config.authDomain,
     projectId: config.projectId,
     storageBucket: config.storageBucket,
     messagingSenderId: config.messagingSenderId,
     appId: config.appId,
     measurementId: config.measurementId,
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
