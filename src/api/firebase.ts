import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAF7jZ8cYDXuMy3OTx6SKVi-Z4PE3FBMjg",
  authDomain: "stable-diffusion-c2074.firebaseapp.com",
  projectId: "stable-diffusion-c2074",
  storageBucket: "stable-diffusion-c2074.appspot.com",
  messagingSenderId: "713535491487",
  appId: "1:713535491487:web:d5e5510b1e9a5491f601aa"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const createUser = async (email: string, password: string) => {
    if (!email || !password) return console.log(`Email and password are required!`);
    
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);

        return response.user;
    } catch (error) {
        throw new Error(`Something went wrong: ${error}`);
    };
};

export const signIn = async (email: string, password: string) => {
    if (!email || !password) return console.log(`Email and password are required!`);

    try {
        const response = await signInWithEmailAndPassword(auth, email, password);

        return response.user;

    } catch (error) {
        throw new Error(`Something went wrong: ${error}`);
    };
};