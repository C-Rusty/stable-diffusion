import axios from "axios";
import FormData from "form-data";
import { SDModelParams } from "../types/typesV2Model";

const API_URL = `https://api.stability.ai`;

const getImage = async (prompt: string, params: SDModelParams, model: string, apiKey: string) => { 
    const urlPath = `${API_URL}/v2beta/stable-image/generate/${model.split(`-`)[0]}`;

    if (model.includes(`sd3`)) {
        params = {
            ...params,
            model: model,
        }
    };

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

    if (response.status === 200) {
        const blob = new Blob([response.data], {type: `image/${params.output_format}`});
        const url = URL.createObjectURL(blob);
        
        return url;
    } else {
        const error: {
            name: string;
            errors: string[];
        } = response.data;
        return error;
    };
};

export const apiStableDiffusion = {
    getImage,
};