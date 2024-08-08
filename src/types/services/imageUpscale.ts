import { OutputFormat } from "../typesGeneratorOptions";

export type UpscaleServiceModel = `conservative` | `creative`;

export type ImageUpscaleModelOptions = {
    prompt: string,
    image: Blob,
    seed?: number,
    negative_prompt?: string, 
    output_format: OutputFormat,
    creativity?: number
};