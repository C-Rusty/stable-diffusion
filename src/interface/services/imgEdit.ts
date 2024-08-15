import { OutputFormat } from "../../types/typesGeneratorOptions";

export interface ImageEditItem extends ImageEditOptions {
    prompt: string,
    image: Blob
}

export interface ImageEditOptions {
    left?: number,
    right?: number,
    up?: number,
    down?: number,
    creativity?: number,
    search_prompt: string,
    negative_prompt?: string,
    seed?: number,
    mask?: Blob,
    grow_mask?: number,
    output_format: OutputFormat
};

export interface ImageEditServiceOptionErase extends Pick<ImageEditOptions,  "mask" | "grow_mask" | "seed" | "output_format"> {};

export interface ImageEditServiceOptionInpaint extends Pick<ImageEditOptions,  "negative_prompt" | "mask" | "grow_mask" | "seed" | "output_format"> {};

export interface ImageEditServiceOptionOutpaint extends Pick<ImageEditOptions,  "left" | "right" | "up" | "down" | "creativity" | "seed" | "output_format"> {};

export interface ImageEditServiceOptionSearchAndReplace extends Pick<ImageEditOptions,  "search_prompt" | "negative_prompt" | "grow_mask" | "seed" | "output_format"> {};

export interface ImageEditServiceOptionRemoveBackground extends Pick<ImageEditOptions,  "output_format"> {};