import { OutputFormat } from "../typesGeneratorOptions";

export type UpscaleServiceOption = `conservative` | `creative`;

export type ImageUpscaleModelParams = {
    prompt: string,
    image: Blob,
    seed?: number,
    negative_prompt?: string, 
    output_format: OutputFormat,
    creativity?: number
};