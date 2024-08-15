import { ImageGenerationServiceModel } from "../../types/services/imageGeneration";
import { AspectRatios, OutputFormat, PresetStyle } from "../../types/typesGeneratorOptions";

export interface ImageGenerationItem extends ImageGenerationOptions {
    prompt: string,
};

export interface ImageGenerationOptions {
    aspect_ratio?: AspectRatios,
    negative_prompt?: string, 
    seed?: number,
    model?: ImageGenerationServiceModel, 
    style_preset?: PresetStyle,
    output_format: OutputFormat,
    image?: Blob | string,
    mode?: `image-to-image` | `text-to-image`,
    strength?: number
};

export interface coreModelOptions extends Pick<ImageGenerationOptions, "aspect_ratio" | "negative_prompt" | "seed" | "style_preset" | "output_format"> {};

export interface sd3ModelOptions extends Pick<ImageGenerationOptions, "mode" | "aspect_ratio" | "seed" | "output_format" | "negative_prompt"> {};

export interface sd3ModelOptionsImgToImg extends Pick<ImageGenerationOptions, "mode" | "image" | "strength" | "aspect_ratio" | "seed" | "output_format" | "negative_prompt"> {};

export interface ultraModelOptions extends Pick<ImageGenerationOptions, "aspect_ratio" | "negative_prompt" | "seed" | "output_format"> {};