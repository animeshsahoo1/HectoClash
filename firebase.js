import { initializeApp } from "firebase/app";
import conf from "./src/conf/conf";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: conf.apikey,
  authDomain: "hectoclash-ca1bc.firebaseapp.com",
  projectId: conf.projectId,
  storageBucket: "hectoclash-ca1bc.firebasestorage.app",
  messagingSenderId: "807472823728",
  appId: "1:807472823728:web:a0cb2c73bdb87137696a75",
  measurementId: "G-2L2ZMX0940"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const db=getFirestore();
