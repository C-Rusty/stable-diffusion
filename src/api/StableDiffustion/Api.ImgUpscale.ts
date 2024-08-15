import axios from "axios";
import { API_URL } from "../../utilities/constants";
import { getImgFromResponse } from "../../utilities/functions/images";
import {UpscaleServiceModel } from "../../types/services/imageUpscale";
import { OutputFormat } from "../../types/typesGeneratorOptions";
import { delay } from "../../utilities/functions/common";
import { ImageUpscaleItem } from "../../interface/services/imageUpscale";

const upscaleUrlPath = `${API_URL}/v2beta/stable-image/upscale/`;
const upscaleCreativeUrlPath = `${API_URL}/v2beta/stable-image/upscale/creative/result/`;

const getUpscaledImage = async (formData: ImageUpscaleItem, model: UpscaleServiceModel, apiKey: string) => {
    const urlPath = upscaleUrlPath + model;


    const response = await axios.postForm(
        urlPath,
        axios.toFormData(formData, new FormData()),
        {
            validateStatus: undefined,
            responseType: model === `conservative` ? `arraybuffer` : undefined,
            headers: { 
              Authorization: `Bearer sk-${apiKey}`, 
              Accept: model === `conservative` ? "image/*" : null, 
            },
        },
    );

    if (response.status === 200) {
        let upscaledImage: string | undefined = undefined;

        switch (model) {
            case `conservative`: 
                upscaledImage = getImgFromResponse(response.data, formData.output_format!);
            break;
    
            case `creative`:
                const { id } = response.data;

                upscaledImage = await getUpscaledCreativeImage(id, apiKey, formData.output_format!);
            break;

            default: return `wrong model name. Model: ${model}`;
        };

        return upscaledImage;
    } else {
        console.log(`upscale error: ${response}`);
    };
};

const getUpscaledCreativeImage = async (id: string, apiKey: string, output_format: OutputFormat) => {
    let upscaledImage: string | undefined = undefined;
    const retryInterval: number = 45000;

    while (!upscaledImage) {
        upscaledImage = await getCreativeImageResponse(id, apiKey, output_format);
        if (!upscaledImage) {
            await delay(retryInterval);
        };
    };
    return upscaledImage;
};

const getCreativeImageResponse = async (id: string, apiKey: string, output_format: OutputFormat) => {

    const urlPath = upscaleCreativeUrlPath + id;

    const response = await axios.request({
        url: urlPath,
        method: "GET",
        validateStatus: undefined,
        responseType: "arraybuffer",
        headers: {
            Authorization: `Bearer sk-${apiKey}`,
            Accept: "image/*",
        }
    });

    // if 202 - image is still upscaling
    if (response.status === 202) {
        return undefined;
    } else {
        return getImgFromResponse(response.data, output_format);
    };

};

export const ApiImgUpscale = {
    getUpscaledImage
};