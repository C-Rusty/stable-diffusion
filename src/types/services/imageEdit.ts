import { OutputFormat } from "../typesGeneratorOptions";

export type ImageEditServiceModel = `erase` | `inpaint` | `outpaint` | `search-and-replace` | `remove-background`;

export type ImageEditServiceOptions = {
    image: Blob,
    left?: number,
    right?: number,
    up?: number,
    down?: number,
    creativity?: number,
    search_prompt: string,
    negative_prompt?: string,
    prompt?: string,
    seed?: number,
    mask?: Blob,
    grow_mask?: number,
    output_format: OutputFormat
};

export type ImageEditServiceOptionErase = Pick<ImageEditServiceOptions, "image" | "mask" | "grow_mask" | "seed" | "output_format">;

export type ImageEditServiceOptionInpaint = Pick<ImageEditServiceOptions, "image" | "prompt" | "negative_prompt" | "mask" | "grow_mask" | "seed" | "output_format">;

export type ImageEditServiceOptionOutpaint = Pick<ImageEditServiceOptions, "image" | "left" | "right" | "up" | "down" | "creativity" | "prompt" | "seed" | "output_format">;

export type ImageEditServiceOptionSearchAndReplace = Pick<ImageEditServiceOptions, "image" | "search_prompt" | "negative_prompt" | "prompt" | "grow_mask" | "seed" | "output_format">;

export type ImageEditServiceOptionRemoveBackground = Pick<ImageEditServiceOptions, "image" | "output_format">;