import { ref, uploadString } from "@firebase/storage";
import { storage } from "../../utilities/firebaseConfig";
import { deleteObject, getDownloadURL, getMetadata, listAll} from "firebase/storage";
import { DeleteImgProps, GalleryItem, generationHistoryItem, GetAllImgsProps, GetImgProps, UploadImgProps } from "../../types/typesCommon";
import { ApiFirebaseStore } from "./Api.Firebase.Store";
import { createFullImgStoragePath } from "../../utilities/functions/storagePaths";

const getImages = async (imagsToGetProps: GetAllImgsProps) => {

    const { userId } = imagsToGetProps;

    const pathToImages = createFullImgStoragePath(userId!, null);

    const pathRef = ref(storage, pathToImages);

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
        const favouritesImgPaths: generationHistoryItem[] | undefined = await ApiFirebaseStore.getFavouritesImgsPaths(userId, favouritesImgsItemCounter, lastItemTimestamp);

        if (!favouritesImgPaths) return console.log(`favouritesImgs get error...`);

        const imagesPromises: Promise<GalleryItem>[] = favouritesImgPaths.map(async (item) => {
            const url = await getImage({userId, storagePath: item.generalInfo.storagePath});

            return { 
                id: item.generalInfo.id,
                prompt: item.generalInfo.prompt || `No prompt`,
                format: item.generalInfo.format,
                url: url ? url : `getImage method error`,
                storagePath: item.generalInfo.storagePath,
                timestamp: item.generalInfo.timestamp,
                uploadedImage: item.generalInfo.uploadedImage
            };
        });

        const images = await Promise.all(imagesPromises);

        return images;
        
    } catch (error) {
        console.log(`Something went wrong with getting favourites imgs: ${error}`);
    };
};

const getImage = async (ImgItemProps: GetImgProps) => {
    try {
        const { userId, storagePath } = ImgItemProps;

        const imageRef = ref(storage, createFullImgStoragePath(userId!, storagePath));

        let imageUrl = await getDownloadURL(imageRef);

        return imageUrl;

    } catch (error) {
        console.log(`Something went wrong with getting an image: ${error}`);
    };
};

const uploadImages = async (imgsToUploadProps: UploadImgProps) =>{

    const { base64String, userId, imgName } = imgsToUploadProps;

    try {
        const pathToImages = createFullImgStoragePath(userId!, imgName);

        const imageRef = ref(storage, pathToImages);

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
            const pathToImage = createFullImgStoragePath(userId!, img.storagePath);

            const imageRef = ref(storage, pathToImage);
    
            try {
                await deleteObject(imageRef);
            } catch (error) {
                console.log(`Something went wrong with deleting an image: ${error}. 
                storagePath: ${img.storagePath}`);
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