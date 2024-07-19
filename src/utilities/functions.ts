import saveAs from "file-saver";
import { generationHistoryItemsFolder } from "./commonVars";
import { SDModelParams } from "../types/typesGeneratorOptions";
import { coreModelOptions, sd3ModelOptions, sd3ModelOptionsImgToImg, ultraModelOptions } from "../types/models";
import { GenModelsValue } from "../types/typesCommon";

export async function saveImageToPC (url: string, name: string) {
    try {
        const image = await fetch(url)
        const imageBlog = await image.blob();
        const imageURL = URL.createObjectURL(imageBlog);
    
        saveAs(imageURL, name);
    } catch (error) {
        console.log(error);
    };
};

export function createImgStoragePath (id: string, prompt: string, format: string) {
    return `${id}.${prompt.split(` `).join(`_`)}.${format}`
};

export function getImgNameAndFormat (storagePath: string) {
    const imgName = storagePath.split(`.`)[1].split(` `).join(`_`);
    const imgFormat = storagePath.split(`.`)[2];
    return `${imgName}.${imgFormat}`;
};

export function createFullImgStoragePath (userId: string, imgStorageName: string | null) {
    return `users/${userId}/generatedImages/${imgStorageName}`;
};

export function createFullGenHistoryStorePath (userId: string, imgStorageName: string | null) {
    return `users/${userId}/${generationHistoryItemsFolder}/${imgStorageName? imgStorageName : ``}`;
};

export function createOptionsOfModel(options: SDModelParams, model: GenModelsValue, isImgToImgModeEnabled?: boolean) {

    let modelOptions: coreModelOptions | sd3ModelOptions | sd3ModelOptionsImgToImg | ultraModelOptions | {} = {};

    switch (model) {
        case `ultra`:
            modelOptions = {
                aspect_ratio: options.aspect_ratio,
                negative_prompt: options.negative_prompt,
                seed: options.seed,
                output_format: options.output_format,
            } as ultraModelOptions;
            break;
        case (`sd3-large` || `sd3-medium` || `sd3-large-turbo`):
            switch (isImgToImgModeEnabled) {
                case true:
                    modelOptions = {
                        mode: `image-to-image`,
                        // image: options.image,
                        strength: options.strength,
                        seed: options.seed,
                        output_format: options.output_format === `webp` ? `png` : options.output_format,
                        negative_prompt: options.negative_prompt,
                    } as sd3ModelOptionsImgToImg;
                    break;
                case false:
                    modelOptions = {
                        mode: `text-to-image`,
                        strength: options.strength,
                        aspect_ratio: options.aspect_ratio,
                        seed: options.seed,
                        output_format: options.output_format,
                        negative_prompt: options.negative_prompt,
                    } as sd3ModelOptions;
                    break;
            
                default: return console.log(`isImgToImgModeEnabled is ${isImgToImgModeEnabled}!`);
            }
        break;

        case `core`:
            modelOptions = {
                aspect_ratio: options.aspect_ratio,
                negative_prompt: options.negative_prompt,
                seed: options.seed,
                style_preset: options.style_preset,
                output_format: options.output_format,
            } as coreModelOptions;
        break;

        default: return console.log(`wrong model name. Model name: ${model}`);
    };

    const filteredOptions: SDModelParams = Object.assign({}, ...Object.values(modelOptions).map((option, index) => {
            
        if (option !== null && option !== undefined) {
            const key = Object.keys(modelOptions)[index];
            return {[key]: option}
        };

    }).filter((option) => option !== undefined));

    console.log(filteredOptions);

    return filteredOptions;
};