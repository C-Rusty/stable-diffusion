import { OutputFormat } from "../../types/typesGeneratorOptions";

export interface ImageUpscaleItem extends ImageUpscaleModelOptions {
    prompt: string,
    image: Blob | string | null,
};

export interface ImageUpscaleModelOptions {
    seed?: number,
    negative_prompt?: string, 
    output_format: OutputFormat,
    creativity?: number
};