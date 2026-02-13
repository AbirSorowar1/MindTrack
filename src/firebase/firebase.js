
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCDIR6G9luxkr6tewz7Ri-6aqykaAjpqu4",
    authDomain: "dpl2026.firebaseapp.com",
    databaseURL: "https://dpl2026-default-rtdb.firebaseio.com",
    projectId: "dpl2026",
    storageBucket: "dpl2026.firebasestorage.app",
    messagingSenderId: "510347261888",
    appId: "1:510347261888:web:4d71649b552b1809d27a25",
    measurementId: "G-L39JSG92P3"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getDatabase(app);
