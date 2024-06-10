import axios from "axios";
import FormData from "form-data";
import { ApiV2ModelParams } from "../types/typesV2Model";
import { ApiV1ModelParams } from "../types/typesV1Model";

const API_KEY = `TNhiPu6VzuDIEsp28aUQO9GJF8emJ1GJkTEu5P5FklwLaE47`;
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

const getImageFromV1Model = (params: ApiV1ModelParams, model: string, apiKey: string) => {

    const urlPath = `${API_URL}/v1/generation/${model}/text-to-image`;

    const options = {
        method: 'POST',
        url: urlPath,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${apiKey}`,
        },
        params: params,
    }

    return axios.request(options);
}

export const api = {
    getImageFromV2Model,
    getImageFromV1Model
};