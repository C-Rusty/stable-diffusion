import { AspectRatiosProps, OutputFormat, PresetStyle } from "../types/typesGeneratorOptions";
import { GenModelsText, GenModelsValue } from "../types/typesCommon";

const aspectRatiSelectProps: {
    label: string,
    options: AspectRatiosProps[],
    id: string
} = {
    label: `Aspect Ratio`,
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
    id: 'aspect-ratio',
};

const negativeInputProps: {
    label: string,
    type: string,
    id: string
    placeholder: string,
    name: string,
    isRequired: boolean
} = {
    label: `Negative Prompt`,
    placeholder: `Type what you do not wish to see in the output image`,
    type: `text`,
    name: `negative-prompt`,
    id: `negative-prompt`,
    isRequired: false
};

const outputFormmatSelectProps: {
    label: string,
    options: Array<{value: OutputFormat, text: OutputFormat}>,
    id: string
} = {
    label: `Output Format`,
    options: [
        {value: `png`, text: `png`},
        {value: `jpeg`, text: `jpeg`},
        {value: `webp`, text: `webp`},
    ],
    id: 'output-format',
};

const genModelSelectProps: {
    id: string
    options: Array<{
        value: GenModelsValue, 
        text: GenModelsText, 
    }>
} = {
    id: 'model-select',
    options: [
        {
            value: `ultra`,
            text: `Ultra`,
        },
        {
            value: `sd3-large-turbo`,
            text: `3 Large Turbo`,
        },
        {
            value: `sd3-large`,
            text: `3 Large`,
        },
        {
            value: `sd3-medium`,
            text: `3 Medium`,
        },
        {
            value: `core`, 
            text: `Core`,
        },
    ],
};

const seedInputProps: {
    label: string,
    type: string,
    id: string
    value: number,
    min: number,
    max: number,
    step: number,
    placeholder: string,
    name: string
} = {
    label: `Seed`,
    id: 'seed-select',
    value: 0,
    min: 0,
    max: 4294967294,
    step: 1,
    placeholder: `randomness`,
    type: 'number',
    name: 'seed',
};

const stylePresetSelectProps: {
    label: string,
    id: string
    options: Array<{value: PresetStyle, text: PresetStyle}>
} = {
    label: `Style Preset`,
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

const fileInputProps: {
    label: string,
    name: string,
    id: string,
    accept: string,
    inputType: `file`
} = {
    label: 'Image',
    name: 'file',
    id: 'file-input',
    accept: '.png, .webp, .jpeg',
    inputType: 'file',
};

const imageStrengthInputProps: {
    label: string,
    type: string,
    id: string
    value: number,
    min: number,
    max: number,
    step: number,
    placeholder: string,
    name: string
} = {
    label: 'Image strength',
    type: `number`,
    id: 'image-strength',
    value: 0,
    min: 0,
    max: 1,
    step: 0.1,
    placeholder: `impact on the generation`,
    name: 'strength',
};

export const modelSelects = {
    aspectRatiSelectProps,
    negativeInputProps,
    outputFormmatSelectProps,
    stylePresetSelectProps,
    fileInputProps,
    genModelSelectProps,
    seedInputProps,
    imageStrengthInputProps
};