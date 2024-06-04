import { GenModelsText, GenModelsValue } from "../types/typesCommon";
import { outputFormat, presetStyle } from "../types/typesV2Model";

const genModelSelectProps: {
    className: string
    id: string
    options: Array<{value: GenModelsValue, text: GenModelsText}>
} = {
    className: 'generator__model-select',
    id: 'model-select',
    options: [
        {value: 'sd3', text: 'SD3 (powerful)'},
        {value: 'core', text: 'Core (fast and stable)'},
        {value: 'stable-diffusion-v1-6', text: 'SD 1.6 (base model)'},
        {value: 'stable-diffusion-xl-1024-v1-0', text: 'SDXL 1.0 (flexible-resolution base)'},
    ],
};

const seedInputProps: {
    className: string
    id: string
    inputValue: number
    placeholder: string
} = {
    className: 'generator__seed-select',
    id: 'seed-select',
    inputValue: 0,
    placeholder: `the 'randomness' of the generation`
};

const stylePresetSelectProps: {
    className: string
    id: string
    options: Array<{value: presetStyle, text: presetStyle}>
} = {
    className: 'generator__style-preset-select',
    id: 'style-select',
    options: [
        { value: "3d-model", text: "3d-model" },
        { value: "analog-film", text: "analog-film" },
        { value: "anime", text: "anime" },
        { value: "cinematic", text: "cinematic" },
        { value: "comic-book", text: "comic-book" },
        { value: "digital-art", text: "digital-art" },
        { value: "enhance", text: "enhance" },
        { value: "fantasy-art", text: "fantasy-art" },
        { value: "isometric", text: "isometric" },
        { value: "line-art", text: "line-art" },
        { value: "low-poly", text: "low-poly" },
        { value: "modeling-compound", text: "modeling-compound" },
        { value: "neon-punk", text: "neon-punk" },
        { value: "origami", text: "origami" },
        { value: "photographic", text: "photographic" },
        { value: "pixel-art", text: "pixel-art" },
        { value: "tile-texture", text: "tile-texture" }
      ]
      
};

const outputFormatSelectProps: {
    className: string
    id: string
    options: Array<{value: outputFormat, text: outputFormat}>
} = {
    className: 'generator__output-format-select',
    id: 'output-select',
    options: [
        {value: `png`, text: `png`},
        {value: `jpeg`, text: `jpeg`},
        {value: `webp`, text: `webp`},
    ],
};


export const generatorCommonPropsForSelect = {
    genModelSelectProps,
    seedInputProps,
    stylePresetSelectProps,
    outputFormatSelectProps
};