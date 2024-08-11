import { apiFirebaseStorage } from "../../api/Firebase/Api.Firebase.Storage";
import { ApiFirebaseStore } from "../../api/Firebase/Api.Firebase.Store";
import { CurrentServiceModelOptions } from "../../types/services/commonServices";
import { UploadImgProps, ImageItem, generationHistoryItem } from "../../types/typesCommon";
import { OutputFormat } from "../../types/typesGeneratorOptions";
import { convertImgToBlob, getImgFromResponse } from "./images";
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

export const uploadGenerationHistoryItem = async (userId: string, imageItem: ImageItem, options: CurrentServiceModelOptions) => {

    if (options.image) options.image = getImgFromResponse(options.image as string, options.output_format);

    const imageHistoryItem: generationHistoryItem = {
        generalInfo: imageItem,
        options: options,
        isFavourite: false,
    };

    await ApiFirebaseStore.uploadGenerationHistoryItem(userId, imageHistoryItem);
};