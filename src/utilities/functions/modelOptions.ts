import { GenModelsValue } from "../../types/typesCommon";
import { coreModelOptions, sd3ModelOptions, sd3ModelOptionsImgToImg, ImageGenerationServiceOptions, ultraModelOptions } from "../../types/services/imageGeneration";
import { ImageUpscaleModelOptions } from "../../types/services/imageUpscale";

export function createOptionsOfModel(options: ImageGenerationServiceOptions, model: GenModelsValue, isImgToImgModeEnabled?: boolean) {

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

    const clearedFromEmptyValuesOptions: ImageGenerationServiceOptions = filterOptionsFromEmptyValues(modelOptions);

    return clearedFromEmptyValuesOptions;
};

export const filterOptionsFromEmptyValues = (options: coreModelOptions | sd3ModelOptions | sd3ModelOptionsImgToImg | ultraModelOptions | ImageUpscaleModelOptions | {}) => {
    const filteredOptions = Object.assign({}, ...Object.values(options).map((option, index) => {
            
        if (option !== null && option !== undefined) {
            const key = Object.keys(options)[index];
            return {[key]: option}
        };

    }).filter((option) => option !== undefined));

    return filteredOptions;
};