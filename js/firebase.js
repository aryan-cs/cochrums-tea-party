import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

console.log("loading firebase...");

const firebaseConfig = {

    apiKey: "AIzaSyCVpNVZmI-jwgdfq2DZfJJA_6M5aGwj5e4",
    authDomain: "cochrum-shenanigans-0.firebaseapp.com",
    projectId: "cochrum-shenanigans-0",
    storageBucket: "cochrum-shenanigans-0.appspot.com",
    messagingSenderId: "53190323087",
    appId: "1:53190323087:web:772d0a2ab01a00c63b79fa"

  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const DB_IDS = {

    date: "dates",
    duration: "durations",
    description: "descriptions"

}

console.log("firebase loaded!");

async function writeDate (ID, DATE_DATA) { await setDoc(doc(db, DB_IDS.date, ID), { date: DATE_DATA }); }

async function readDate (ID) {

    const docSnap = await getDoc(doc(db, DB_IDS.date, ID));

    if (docSnap.exists()) { return docSnap.data().date; }
    
    else { "ERROR GETTING DATE :(" }

}

async function writeDuration (ID, DURATION_DATA) { await setDoc(doc(db, DB_IDS.duration, ID), { duration: DURATION_DATA }); }

async function readDuration (ID) {

    const docSnap = await getDoc(doc(db, DB_IDS.duration, ID));

    if (docSnap.exists()) { return docSnap.data().duration; }
    
    else { "ERROR GETTING DURATION :(" }

}

async function writeDescription (ID, DESCRIPTION_DATA) { await setDoc(doc(db, DB_IDS.description, ID), { description: DESCRIPTION_DATA }); }

async function readDescription (ID) {

    const docSnap = await getDoc(doc(db, DB_IDS.description, ID));

    if (docSnap.exists()) { return docSnap.data().description; }
    
    else { "ERROR GETTING DESCRIPTION :(" }

}
