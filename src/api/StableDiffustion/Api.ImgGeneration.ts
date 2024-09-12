import axios from "axios";
import { getImgFromResponse } from "../../utilities/functions/images";
import { API_URL } from "../../utilities/constants";
import { ImageGenerationItem } from "../../interface/sd-request/imageGeneration";

const generateUrlPath = `${API_URL}/v2beta/stable-image/generate/`;

const getGeneratedImage = async (formData: ImageGenerationItem, model: string, apiKey: string) => { 
    const urlPath = generateUrlPath + model.split(`-`)[0];

    const response = await axios.postForm(
        urlPath,
        axios.toFormData(formData, new FormData()),
        {
            validateStatus: undefined,
            responseType: "arraybuffer",
            headers: { 
              Authorization: `Bearer sk-${apiKey}`, 
              Accept: "image/*" 
            },
        },
    );

    const result = getImgFromResponse(response.data, formData.output_format);

    console.log(`result:`, result);

    return result;
};
export const ApiImageGeneration = {
    getGeneratedImage
};