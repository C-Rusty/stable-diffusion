import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAF7jZ8cYDXuMy3OTx6SKVi-Z4PE3FBMjg",
    authDomain: "stable-diffusion-c2074.firebaseapp.com",
    projectId: "stable-diffusion-c2074",
    storageBucket: "stable-diffusion-c2074.appspot.com",
    messagingSenderId: "713535491487",
    appId: "1:713535491487:web:d5e5510b1e9a5491f601aa",
};   

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage();