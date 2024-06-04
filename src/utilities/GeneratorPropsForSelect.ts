import { InputProps, SelectProps } from "../types/typesCommon";

const genModelSelectProps: SelectProps = {
    className: 'generator__model-select',
    id: 'model-select',
    options: [
        {value: 'sd3', text: 'SD3 (powerful)'},
        {value: 'core', text: 'Core (fast and stable)'},
        {value: 'stable-diffusion-v1-6', text: 'SD 1.6 (base model)'},
        {value: 'stable-diffusion-xl-1024-v1-0', text: 'SDXL 1.0 (flexible-resolution base)'},
    ],
};

const seedInputProps: InputProps = {
    className: 'generator__seed-select',
    id: 'seed-select',
    inputValue: 0,
    placeholder: `the 'randomness' of the generation`
};

const style_presetSelectProps: SelectProps = {
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

const outputFormatSelectProps: SelectProps = {
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
    style_presetSelectProps,
    outputFormatSelectProps
};