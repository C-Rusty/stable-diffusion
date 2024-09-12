import axios from "axios";
import { IImgPreciseEdit } from "../../interface/sd-request/imgPreciceEdit";
import { ImageControlServiceModel } from "../../types/services/imageControl";
import { API_URL } from "../../utilities/constants";
import { getImgFromResponse } from "../../utilities/functions/images";

const editUrlPath = `${API_URL}/v2beta/stable-image/control/`;

const getImgControlImage = async (payload: IImgPreciseEdit, model: ImageControlServiceModel, apiKey: string) => {

    const urlPath = editUrlPath + model;

    let contolledImage: string | undefined = undefined;

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

        contolledImage = getImgFromResponse(response.data, payload.output_format);
        
        return contolledImage;
    } catch (error) {
        console.log(`Error when calling getImgConrolImage: ${error}`);
    };
};

export const ApiImgControl = {
    getImgControlImage
};