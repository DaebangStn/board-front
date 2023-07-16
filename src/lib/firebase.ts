// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore, connectFirestoreEmulator} from "@firebase/firestore";
import {getAuth, connectAuthEmulator} from "@firebase/auth";
import {connectFunctionsEmulator, getFunctions} from "@firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDs4B6T1VDDRCO7orJDXtBg1uJIS9_ZIkY",
  authDomain: "board-97242.firebaseapp.com",
  projectId: "board-97242",
  storageBucket: "board-97242.appspot.com",
  messagingSenderId: "128445032589",
  appId: "1:128445032589:web:d668805fa5f7e3349e1ac4",
  measurementId: "G-FQVKKRPR3K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();
// Point to the emulator running on localhost.
// connectFirestoreEmulator(db, "127.0.0.1", 8080);

const functions = getFunctions(app);
// connectFunctionsEmulator(functions, "127.0.0.1", 5001);

// const auth = getAuth(app);
// connectAuthEmulator(auth, "http://localhost:9099");

export {app, db, functions};