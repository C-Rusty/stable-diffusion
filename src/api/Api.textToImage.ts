import axios from "axios";
import FormData from "form-data";
import { ApiV2ModelParams } from "../types/typesV2Model";
import { ApiV1ModelParams } from "../types/typesV1Model";

const API_KEY = process.env.STABLE_DIFFUSION_API_KEY;

const API_URL = `https://api.stability.ai/`;

const getImageFromV2Model = (params: ApiV2ModelParams, model: string) => {
    const urlPath = `${API_URL}/v2beta/stable-image/generate/${model}`;
    const formData = params;

    return axios.postForm(
        urlPath, 
        axios.toFormData(formData, new FormData()),
        {
            validateStatus: undefined,
            responseType: "arraybuffer",
            headers: { 
              Authorization: `Bearer sk-${API_KEY}`, 
              Accept: "image/*" 
            },
        }
    );
};

const getImageFromV1Model = (params: ApiV1ModelParams, model: string) => {

    const urlPath = `${API_URL}/v1/generation/${model}/text-to-image`;

    const options = {
        method: 'GET',
        url: urlPath,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`,
        },
        params: params,
    }

    return axios.request(options);
}

export const powefulModel = {
    getImageFromV2Model,
    getImageFromV1Model
};