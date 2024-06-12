import { db } from "../utilities/firebaseConfig";
import { doc, getDoc } from "firebase/firestore"; 

export const getApiKeyFromFirebase = async () => {
    try {
        const docRef = doc(db, `SD`, `SD`);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
            const response = docSnap.data();
            return response;
        } else {
            return {
                apiKey: `not found!`,
            };
        };
    } catch (error) {
        throw new Error(`Something went wrong with SD request: ${error}`);
    };
};