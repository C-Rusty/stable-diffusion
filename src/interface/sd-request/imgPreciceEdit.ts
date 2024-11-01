import { OutputFormat } from "../../types/typesGeneratorOptions";

export interface IImgPreciseEdit extends IImgPreciseEditOptions {
    prompt: string,
    image: Blob | string | null,
};

export interface IImgPreciseEditOptions {
    control_strength?: number,
    negative_prompt?: string,
    seed?: number,
    output_format: OutputFormat,
    aspect_ratio?: string,
    fidelity?: number,
};

export interface IImagePreciseEditOptionSketch extends Pick<IImgPreciseEditOptions, "control_strength" | "negative_prompt" | "seed" | "output_format"> {};

export interface IImagePreciseEditOptionStructure extends Pick<IImgPreciseEditOptions, "control_strength" | "negative_prompt" | "seed" | "output_format"> {};

export interface IImagePreciseEditOptionStyle extends Pick<IImgPreciseEditOptions, "negative_prompt" | "aspect_ratio" | "fidelity" | "seed" | "output_format"> {};