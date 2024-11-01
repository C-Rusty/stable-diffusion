import axios from "axios";
import { ImageEditServiceModel } from "../../types/services/imageEdit";
import { API_URL } from "../../utilities/constants";
import { getImgFromResponse } from "../../utilities/functions/images";
import { ImageEditItem } from "../../interface/sd-request/imgEdit";

const editUrlPath = `${API_URL}/v2beta/stable-image/edit/`;

const getEditedImage = async ( params: ImageEditItem, model: ImageEditServiceModel, apiKey: string) => {

    const urlPath = editUrlPath + model;

    let editedImage: string | undefined = undefined;

    const payload = {...params };

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

        editedImage = getImgFromResponse(response.data, params.output_format!);

    } catch (error) {
        console.log(`Error with uploading generation history: ${error}`);
    };

    return editedImage;
};

export const ApiImgEdit = {
    getEditedImage
};