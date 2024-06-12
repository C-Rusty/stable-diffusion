import { ref, uploadString } from "@firebase/storage";
import { storage } from "../utilities/firebaseConfig";

export const saveImageToFireStorage = async (imgBase64StringUrl: string, userId: string, imgName: string = ``) =>{
    try {
        const imageRef = ref(storage, `users/${userId}/generatedImages/${imgName}`);

        uploadString(imageRef, imgBase64StringUrl, "base64");

        return true;

    } catch (error) {
        throw new Error(`Something went wrong with uploading image: ${error}`);
    };
};