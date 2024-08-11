import axios from "axios";
import { getImgFromResponse } from "../../utilities/functions/images";
import { ImageGenerationServiceOptions } from "../../types/services/imageGeneration";
import { API_URL } from "../../utilities/constants";

const getGeneratedImage = async (prompt: string, params: ImageGenerationServiceOptions, model: string, apiKey: string) => { 
    const urlPath = `${API_URL}/v2beta/stable-image/generate/${model.split(`-`)[0]}`;

    const formData = {prompt, ...params};

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

    const result = getImgFromResponse(response.data, params.output_format!);

    return result;
};
export const ApiImageGeneration = {
    getGeneratedImage
};