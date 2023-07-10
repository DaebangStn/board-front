// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import exp from "constants";
// https://firebase.google.com/docs/web/setup#available-libraries

// local firestore emulator
import {getFirestore, connectFirestoreEmulator} from "@firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwVvv3zNqeSniaHktHYmfQITpy-N5n4oE",
  authDomain: "board-mss.firebaseapp.com",
  projectId: "board-mss",
  storageBucket: "board-mss.appspot.com",
  messagingSenderId: "568375716280",
  appId: "1:568375716280:web:a234dfcce34d737cf5c74d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();
// Point to the emulator running on localhost.
connectFirestoreEmulator(db, "127.0.0.1", 8080);

type work_brief_t = {
    name: string;
    description: string;
}

export {app, db};
export type {work_brief_t};