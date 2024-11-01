import { generationHistoryItemsFolder } from "../constants";

export function createImgStoragePath (id: string, prompt: string, format: string) {
    return `${id}.${prompt.split(` `).join(`_`)}.${format}`
};

export function getImgNameAndFormat (storagePath: string) {
    const imgName = storagePath.split(`.`)[1].split(` `).join(`_`);
    const imgFormat = storagePath.split(`.`)[2];
    
    return `${imgName}.${imgFormat}`;
};

export function createFullImgStoragePath (userId: string, imgStorageName: string | null) {
    return `users/${userId}/generatedImages/${imgStorageName}`;
};

export function createFullGenHistoryStorePath (userId: string, imgStorageName: string | null) {
    return `users/${userId}/${generationHistoryItemsFolder}/${imgStorageName? imgStorageName : ``}`;
};