import { AspectRatios, OutputFormat, PresetStyle } from "../typesGeneratorOptions";

export type ImageGenerationServiceModel = `ultra` | `sd3-large-turbo` | `sd3-large` | `sd3-medium` | `core`;

export type ImageGenerationServiceOptions = {
    prompt?: string,
    aspect_ratio: AspectRatios,
    negative_prompt?: string, 
    seed: number,
    model?: ImageGenerationServiceModel, 
    style_preset?: PresetStyle,
    output_format: OutputFormat,
    image?: Blob | string,
    mode?: `image-to-image` | `text-to-image`,
    strength?: number
};

export type coreModelOptions = Pick<ImageGenerationServiceOptions, "aspect_ratio" | "negative_prompt" | "seed" | "style_preset" | "output_format">;

export type sd3ModelOptions = Pick<ImageGenerationServiceOptions, `mode` | `aspect_ratio` | `seed` | `output_format` | `negative_prompt`>;

export type sd3ModelOptionsImgToImg = Pick<ImageGenerationServiceOptions, `mode` | `image` | `strength` | `aspect_ratio` | `seed` | `output_format` | `negative_prompt`>;

export type ultraModelOptions = Pick<ImageGenerationServiceOptions, `aspect_ratio` | `negative_prompt` | `seed` | `output_format`>;