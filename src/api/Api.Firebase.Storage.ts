import { ref, uploadString } from "@firebase/storage";
import { storage } from "../utilities/firebaseConfig";
import { deleteObject, getDownloadURL, getMetadata, listAll} from "firebase/storage";

const uploadImage = async (imgBase64StringUrl: string, userId: string, imgName: string = ``) =>{
    try {
        const imageRef = ref(storage, `users/${userId}/generatedImages/${imgName}`);

        uploadString(imageRef, imgBase64StringUrl, "data_url");

        return true;

    } catch (error) {
        console.log(`Something went wrong with uploading an image: ${error}`);
        return false;
    };
};

const getImages = async (userId: string) => {
    try {
        const pathRef = ref(storage, `/users/${userId}/generatedImages/`);

        const { items } = await listAll(pathRef);

        const imgs: Array<{
            name: string,
            url: string,
            createdAt: string
        }> = [];
        
        const imgUrls = await Promise.all(items.map(item => getDownloadURL(item)));
        const imgsMetadata = await Promise.all(items.map(item => getMetadata(item)));

        items.forEach((item, index) => {
            imgs.push({
                name: item.name,
                url: imgUrls[index],
                createdAt: imgsMetadata[index].timeCreated
            });
        });

        return imgs;
        
    } catch (error) {
        throw new Error(`Something went wrong with getting images: ${error}`);
    };
};

const deleteImage = async (
    userId: string, 
    imagesToDelete: Array<{name: string, format: string}>
) => {

    let response: boolean | undefined = undefined;
    
    try {
        imagesToDelete.map(async (img) => {
            const imageRef = ref(storage, `/users/${userId}/generatedImages/${img.name}`);
    
            try {
                await deleteObject(imageRef);
            } catch (error) {
                console.log(`Something went wrong with deleting an image: ${error}. 
                Image name: ${img.name}`);
            };
        });
        response = true;
    } catch (error) {
        console.log(`Something went wrong with deleting images: ${error}`);
        response = false;
    };

    return response;
};

export const apiFirebaseStorage = {
    uploadImage,
    getImages,
    deleteImage
};