import axios from "axios";
import FormData from "form-data";
import { UpscaleServiceModel } from "../types/typesCommon";
import { getImgFromResponse } from "../utilities/functions";
import { OutputFormat } from "../types/typesGeneratorOptions";
import { CurrentServiceModelOptions } from "../types/services/commonServices";
import { ImageGenerationServiceOptions } from "../types/services/imageGeneration";
import { ImageUpscaleModelOptions } from "../types/services/imageUpscale";

const API_URL: string = `https://api.stability.ai`;

interface Balance {
    credits: number;
};

const getBalance = async (apiKey: string) => {
    const urlPath: string = `${API_URL}/v1/user/balance`;

    try {    
        const response = await axios.get(urlPath, {
            headers: { 
                Authorization: `Bearer sk-${apiKey}`, 
                Accept: "application/json",
            },
        });

        return response.data as Balance;
        
    } catch (error) {
        console.log(`Error with getting balance: ${error}`);
    };
};

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

    const result = getImgFromResponse(response, params.output_format);

    return result;
};

const getUpscaledImage = async (params: ImageUpscaleModelOptions, model: UpscaleServiceModel, apiKey: string) => {
    const urlPath = `${API_URL}/v2beta/stable-image/upscale/${model}`;

    const formData = params;

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
        let upscaledImage: string | undefined = undefined;

        switch (model) {
            case `conservative`: 
                upscaledImage = getImgFromResponse(response, params.output_format);
            break;
    
            case `creative`:
                const { id } = response.data;
    
                const creativeImage = await getUpscaledCreativeImage(id, apiKey, params.output_format);

                if (creativeImage) upscaledImage = creativeImage;
            return;
        
            default: return `wrong model name. Model: ${model}`;
        };

        console.log(`upscaled image: ${upscaledImage}`);
        
        return upscaledImage;
    } else {
        console.log(`upscale error: ${response}`);
    };
};

const getUpscaledCreativeImage = async (id: string, apiKey: string, output_format: OutputFormat) => {
    const urlPath = `${API_URL}/v2beta/stable-image/upscale/creative/result/${id}`;

    const response = await axios.request({
        url: urlPath,
        method: "GET",
        validateStatus: undefined,
        responseType: "arraybuffer",
        headers: {
            Authorization: `Bearer sk-${apiKey}`,
            Accept: "image/*"
        }
    });

    const responseResult = getImgFromResponse(response, output_format);

    return responseResult;
};

export const apiStableDiffusion = {
    getBalance,
    getGeneratedImage,
    getUpscaledImage
};