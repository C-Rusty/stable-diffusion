import { OutputFormat } from "../typesGeneratorOptions";

export type ImageControlServiceModel = `sketch` | `structure` | `style`;

export type ImageControlServiceOptions = {
    prompt: string,
    image: Blob,
    negative_prompt?: string,
    control_strength?: number,
    fidelity: number,
    seed?: number,
    aspect_ratio: string,
    output_format: OutputFormat
};

export type ImageControlServiceOptionSketch = Pick<ImageControlServiceOptions, "prompt" | "image" | "control_strength" | "negative_prompt" | "seed" | "output_format">;

export type ImageControlServiceOptionStructure = Pick<ImageControlServiceOptions, "prompt" | "image" | "control_strength" | "negative_prompt" | "seed" | "output_format">;

export type ImageControlServiceOptionStyle = Pick<ImageControlServiceOptions, "prompt" | "image" | "negative_prompt" | "aspect_ratio" | "fidelity" | "seed" | "output_format">;