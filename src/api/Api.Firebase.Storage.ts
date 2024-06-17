import { ref, uploadString } from "@firebase/storage";
import { storage } from "../utilities/firebaseConfig";
import { getDownloadURL, listAll} from "firebase/storage";

export const saveImageToFireStorage = async (imgBase64StringUrl: string, userId: string, imgName: string = ``) =>{
    try {
        const imageRef = ref(storage, `users/${userId}/generatedImages/${imgName}.png`);

        uploadString(imageRef, imgBase64StringUrl, "data_url");

        return true;

    } catch (error) {
        throw new Error(`Something went wrong with uploading image: ${error}`);
    };
};

export const getImagesFromFireStorage = async (userId: string) => {
    try {
        const pathRef = ref(storage, `/users/${userId}/generatedImages/`);

        const { items } = await listAll(pathRef);

        const imgs: Array<{
            name: string,
            url: string
        }> = [];
        
        const urls = await Promise.all(items.map(item => getDownloadURL(item)));

        items.map((item, index) => {
            imgs.push({
                name: item.name,
                url: urls[index]
            });
        });

        return imgs;
        
    } catch (error) {
        throw new Error(`Something went wrong with getting images: ${error}`);
    };
};