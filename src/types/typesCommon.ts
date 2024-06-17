import { Dispatch } from "react";
import { Resolutions, ResolutionsProps } from "./typesV1Model";
import { AspectRatios, AspectRatiosProps, OutputFormatProps, PresetStyleProps } from "./typesV2Model";

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

export type GenModelsValue =  `ultra` | `sd3` | `sd3-turbo` | `core` | `stable-diffusion-v1-6` | `stable-diffusion-xl-1024-v1-0`;
export type GenModelsText = `SI Ultra` |`SI 3` | `SI 3 Turbo` | `Core` | `SD XL (legacy)` | `SD 1.6 (legacy)`;

export type GenModelsProps = {
    value: GenModelsValue,
    text: GenModelsText
};

export type MyState = AspectRatios | Resolutions;

export type SetStateAction<T> = Dispatch<React.SetStateAction<T>>;

export type ModalProps = {
    headline: string | undefined,
    text: string | undefined,
    isModalOpen: boolean
};

export type ImageProps = {
    generatedImage: string | null,
    imgName: string | null,
    imgFormat: string | null
};