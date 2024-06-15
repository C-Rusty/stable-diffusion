import { ref, uploadString } from "@firebase/storage";
import { storage } from "../utilities/firebaseConfig";
import { getDownloadURL, listAll } from "firebase/storage";

export const saveImageToFireStorage = async (imgBase64StringUrl: string, userId: string, imgName: string = ``) =>{
    try {
        const imageRef = ref(storage, `users/${userId}/generatedImages/${imgName}`);

        uploadString(imageRef, imgBase64StringUrl, "base64");

        return true;

    } catch (error) {
        throw new Error(`Something went wrong with uploading image: ${error}`);
    };
};

export const getImagesFromFireStorage = async (userId: string) => {
    try {
        const pathRef = ref(storage, `/users/${userId}/generatedImages/`);

        const { items } = await listAll(pathRef);

        const urls = await Promise.all(items.map(item => getDownloadURL(item)));

        return urls;
        
    } catch (error) {
        throw new Error(`Something went wrong with getting images: ${error}`);
    };
};