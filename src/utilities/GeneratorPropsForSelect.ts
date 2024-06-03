import { InputProps, SelectProps } from "../types/commonTypes";

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

const aspectRatiSelectProps: SelectProps = {
    className: 'generator__aspect-ratio-select',
    id: 'aspect-ratio-select',
    options: [
        {value: `16:9`, text: `16:9`},
        {value: `1:1`, text: `1:1`},
        {value: `21:9`, text: `21:9`},
        {value: `2:3`, text: `2:3`},
        {value: `3:2`, text: `3:2`},
        {value: `4:5`, text: `4:5`},
        {value: `5:4`, text: `5:4`},
        {value: `9:16`, text: `9:16`},
        {value: `9:21`, text: `9:21`},
    ],
};

const negativeInputProps: InputProps = {
    className: 'generator__negative-prompt-select',
    id: 'negative-prompt-select',
    inputValue: ``,
    placeholder: `what you do not wish to see in the output image`
};

const seedInputProps: InputProps = {
    className: 'generator__seed-select',
    id: 'seed-select',
    inputValue: 0,
    placeholder: `the 'randomness' of the generation`
};

const style_presetSelectProps: SelectProps = {
    className: 'generator__style-preset-select',
    id: 'style-preset-select',
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
    id: 'output-format-select',
    options: [
        {value: `png`, text: `png`},
        {value: `jpeg`, text: `jpeg`},
        {value: `webp`, text: `webp`},
    ],
};

const resolutionSelectProps: SelectProps = {
    className: 'generator__resolution-select',
    id: 'resolution-select',
    options: [
        {value: `1024x1024`, text: `1024x1024`},
        {value: `1152x896`, text: `1152x896`},
        {value: `896x1152`, text: `896x1152`},
        {value: `1216x832`, text: `1216x832`},
        {value: `1344x768`, text: `1344x768`},
        {value: `768x1344`, text: `768x1344`},
        {value: `1536x640`, text: `1536x640`},
        {value: `640x1536`, text: `640x1536`},
    ],
};

export const generatorPropsForSelect = {
    genModelSelectProps,
    aspectRatiSelectProps,
    resolutionSelectProps
}