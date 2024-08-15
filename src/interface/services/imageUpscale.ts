import { OutputFormat } from "../../types/typesGeneratorOptions";

export interface ImageUpscaleItem extends ImageUpscaleModelOptions {
    prompt: string,
};

export interface ImageUpscaleModelOptions {
    image: Blob,
    seed?: number,
    negative_prompt?: string, 
    output_format: OutputFormat,
    creativity?: number
};