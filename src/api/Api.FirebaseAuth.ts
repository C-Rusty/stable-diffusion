import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../utilities/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore"; 

const signIn = async (email: string, password: string) => {

    try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        const userId = response.user.uid;

        const isUserExists: boolean = await findUser(userId);

        if (!isUserExists) {
            await setDoc(doc(db, `users`, userId), {
                userName: ``,
                uid: userId
            });  
        };

        return response;

    } catch (error) {
        throw new Error(`Something went wrong: ${error}`);
    };
};

const findUser = async (userId: string) => {
    try {
        const docRef = doc(db, `users`, userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            return true;
        } else {
            console.log("No such document!");
            return false;
        };
    } catch (error) {
        throw new Error(`Something went wrong: ${error}`);
    };
};

export const firebaseUserAuth = {
    signIn,
};