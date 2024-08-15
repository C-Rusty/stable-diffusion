import axios from "axios";
import { ImageEditServiceChosenOptions, ImageEditServiceModel } from "../../types/services/imageEdit";
import { API_URL } from "../../utilities/constants";
import { getImgFromResponse } from "../../utilities/functions/images";

const editUrlPath = `${API_URL}/v2beta/stable-image/edit/`;

const getEditedImage = async ( uploadedImage: Blob, options: ImageEditServiceChosenOptions, model: ImageEditServiceModel, apiKey: string) => {

    const urlPath = editUrlPath + model;

    let editedImage: string | undefined = undefined;

    const payload = {
        ...options,
        image: uploadedImage,
    };

    try {
        const response = await axios.postForm(
            urlPath,
            axios.toFormData(payload, new FormData()),
            {
                validateStatus: undefined,
                responseType: "arraybuffer",
                headers: { 
                  Authorization: `Bearer sk-${apiKey}`, 
                  Accept: "image/*" 
                }
            }
        );

        editedImage = getImgFromResponse(response.data, options.output_format!);

    } catch (error) {
        console.log(`Error with uploading generation history: ${error}`);
    };

    return editedImage;
};

export const ApiImgEdit = {
    getEditedImage
};