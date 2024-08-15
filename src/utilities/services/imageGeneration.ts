import { ImageGenerationServiceModel } from "../../types/services/imageGeneration";
import { AspectRatiosProps, PresetStyle } from "../../types/typesGeneratorOptions";

export const imageGenerationServiceOptions: ImageGenerationServiceModel[] = [
    `ultra`,
    `sd3-large-turbo`,
    `sd3-large`,
    `sd3-medium`,
    `core`
];

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
    value: .35,
    min: .2,
    max: .5,
    step: .01,
    placeholder: `impact on the generation`,
    name: 'strength',
};

export const modelSelects = {
    aspectRatiSelectProps,
    stylePresetSelectProps,
    imageStrengthInputProps,
};