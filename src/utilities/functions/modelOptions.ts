
import { coreModelOptions, sd3ModelOptions, sd3ModelOptionsImgToImg, ultraModelOptions } from "../../interface/services/imageGeneration";
import { ImageUpscaleModelOptions } from "../../interface/services/imageUpscale";


export const filterOptionsFromEmptyValues = (options: coreModelOptions | sd3ModelOptions | sd3ModelOptionsImgToImg | ultraModelOptions | ImageUpscaleModelOptions | {}) => {
    const filteredOptions = Object.assign({}, ...Object.values(options).map((option, index) => {
            
        if (option !== null && option !== undefined) {
            const key = Object.keys(options)[index];
            return {[key]: option}
        };

    }).filter((option) => option !== undefined));

    return filteredOptions;
};