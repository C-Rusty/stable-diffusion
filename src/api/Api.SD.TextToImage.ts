import axios from "axios";
import FormData from "form-data";
import { ApiV2ModelParams } from "../types/typesV2Model";

const API_URL = `https://api.stability.ai`;

const getImageFromV2Model = async (prompt: string, params: ApiV2ModelParams, model: string, apiKey: string) => {
    const urlPath = `${API_URL}/v2beta/stable-image/generate/${model}`
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

export const api = {
    getImageFromV2Model,
};