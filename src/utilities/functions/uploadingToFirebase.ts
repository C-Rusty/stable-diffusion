import { apiFirebaseStorage } from "../../api/Firebase/Api.Firebase.Storage";
import { ApiFirebaseStore } from "../../api/Firebase/Api.Firebase.Store";
import { IImageHistoryItem } from "../../interface/items/imgItems";
import { UploadImgProps } from "../../types/typesCommon";
import { OutputFormat } from "../../types/typesGeneratorOptions";
import { convertImgToBlob } from "./images";
import { createImgStoragePath } from "./storagePaths";

export const uploadImageToStorage = async (userId: string, imageId: string, image: string, prompt: string, output_format: OutputFormat) => {
    const img64String = await convertImgToBlob(image);

    if (!img64String) return console.log(`Img64String is empty. ${img64String}`);

    const imageHistoryItem: UploadImgProps = {
        userId: userId,
        base64String: img64String as string,
        imgName: createImgStoragePath(imageId, prompt, output_format),
    };

    await apiFirebaseStorage.uploadImages(imageHistoryItem);
};

export const uploadGenerationHistoryItem = async (userId: string, imageItem: IImageHistoryItem) => {
    await ApiFirebaseStore.uploadGenerationHistoryItem(userId, imageItem);
};