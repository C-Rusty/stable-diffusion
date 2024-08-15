import saveAs from "file-saver";
import { v4 as uuidv4 } from 'uuid';
import { OutputFormat } from "../../types/typesGeneratorOptions";
import { createImgStoragePath } from "./storagePaths";

export const createImageId = () => {
    return uuidv4();
};

export const createImageItemInfo = (prompt: string, output_format: OutputFormat) => {
    const timestamp: string = new Date().getTime().toString();
    const id = createImageId();
    const storagePath = createImgStoragePath(id, prompt, output_format);

    return {id, storagePath, timestamp};
};

export async function saveImageToPC (url: string, name: string) {
    try {
        const image = await fetch(url)
        const imageBlog = await image.blob();
        const imageURL = URL.createObjectURL(imageBlog);
    
        saveAs(imageURL, name);
    } catch (error) {
        console.log(error);
    };
};

export async function convertImgToBlob (img: string): Promise<string | ArrayBuffer | null> {
    const base = await fetch(img);
    const blob = await base.blob();
    
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.readAsDataURL(blob);
        
        reader.onloadend = () => {
            resolve(reader.result);
        };
        
        reader.onerror = reject;
    });
};

export function getImgFromResponse (image: string, output_format: OutputFormat) {
    const blob = new Blob([image], {type: `image/${output_format}`});
    
    const url = URL.createObjectURL(blob);

    return url;
};
