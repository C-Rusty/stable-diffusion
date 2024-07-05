import { ref, uploadString } from "@firebase/storage";
import { storage } from "../utilities/firebaseConfig";
import { deleteObject, getDownloadURL, getMetadata, listAll} from "firebase/storage";
import { DeleteImgProps, GetAllImgsProps, GetImgProps, UploadImgProps } from "../types/typesCommon";
import { ApiFirebaseStore } from "./Api.Firebase.Store";

const storagePath = `generatedImages`;

const getImages = async (imagsToGetProps: GetAllImgsProps) => {

    const { userId } = imagsToGetProps;

    const pathRef = ref(storage, `/users/${userId}/${storagePath}/`);

    try {
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
        console.log(`Something went wrong with getting images: ${error}`);
    };
};

const getFavouritesImgs = async (userId: string, favouritesImgsItemCounter: number, lastItemTimestamp: string | null) => {
    try {
        const favouritesImgPaths = await ApiFirebaseStore.getFavouritesImgsPaths(userId, favouritesImgsItemCounter, lastItemTimestamp);

        if (!favouritesImgPaths) return console.log(`favouritesImgs get error...`);

        const imagesPromises = favouritesImgPaths.map(async (item) => {
            const fullName = item.name.split(` `).join(`_`) + `.` + item.format;
            const url = await getImage({ userId, imgName: fullName });
            return { name: item.name, url: url, timestamp: item.timestamp };
        });

        const images = await Promise.all(imagesPromises);

        return images;
        
    } catch (error) {
        console.log(`Something went wrong with getting favourites imgs: ${error}`);
    };
};

const getImage = async (ImgItemProps: GetImgProps) => {
    try {
        const { userId, imgName } = ImgItemProps;

        const imageRef = ref(storage, `/users/${userId}/${storagePath}/${imgName}`);

        let imageUrl = await getDownloadURL(imageRef);

        return imageUrl;

    } catch (error) {
        console.log(`Something went wrong with getting an image: ${error}`);
    };
};

const uploadImages = async (imgsToUploadProps: UploadImgProps) =>{

    const { base64String, userId, imgName } = imgsToUploadProps;

    try {
        const imageRef = ref(storage, `users/${userId}/${storagePath}/${imgName}`);

        uploadString(imageRef, base64String!, "data_url");

        return true;

    } catch (error) {
        console.log(`Something went wrong with uploading an image: ${error}`);
        return false;
    };
};

const deleteImages = async (imgsToDeleteProps: DeleteImgProps) => {

    let response: boolean | undefined = undefined;

    const { userId, imgsToDelete } = imgsToDeleteProps;
    
    try {
        imgsToDelete.map(async (img) => {
            const imageRef = ref(storage, `/users/${userId}/${storagePath}/${img.name}`);
    
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
    getImages,
    getImage,
    getFavouritesImgs,
    uploadImages,
    deleteImages
};