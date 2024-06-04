import { ResolutionsProps } from "./typesV1Model";
import { AspectRatiosProps, OutputFormatProps, PresetStyleProps } from "./typesV2Model";

export type SelectProps = {
    className: string, 
    id: string,
    options: Array<GenModelsProps | ResolutionsProps | AspectRatiosProps | PresetStyleProps | OutputFormatProps>
};

export type InputProps = {
    className: string,
    id: string,
    inputValue: string | number,
    placeholder: string
};

export type GenModelsValue = `sd3` | `core` | `stable-diffusion-v1-6` | `stable-diffusion-xl-1024-v1-0`;
export type GenModelsText = `SD3 (powerful)` | `Core (fast and stable)` | `SD 1.6 (base model)` | `SDXL 1.0 (flexible-resolution base)`;

export type GenModelsProps = {
    value: GenModelsValue,
    text: GenModelsText
};