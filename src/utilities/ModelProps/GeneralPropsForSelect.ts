import { GenModelsText, GenModelsValue } from "../../types/typesCommon";
import { OutputFormat, PresetStyle } from "../../types/typesV2Model";

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
            text: `Large Turbo`,
        },
        {
            value: `sd3-large`,
            text: `Large`,
        },
        {
            value: `sd3-medium`,
            text: `Medium`,
        },
        {
            value: `core`, 
            text: `Core`,
        },
    ],
};

const seedInputProps: {
    id: string
    value: number
    placeholder: string,
    inputType: string,
    name: string
} = {
    id: 'seed-select',
    value: 0,
    placeholder: `the 'randomness' of the generation`,
    inputType: 'number',
    name: 'seed',
};

const stylePresetSelectProps: {
    id: string
    options: Array<{value: PresetStyle, text: PresetStyle}>
} = {
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

export const generatorCommonPropsForSelect = {
    genModelSelectProps,
    seedInputProps,
    stylePresetSelectProps,
};