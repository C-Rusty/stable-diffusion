import { IInputNumberProps, ISelectProps } from "../../interface/fields";
import { ImageGenerationServiceModel } from "../../types/services/imageGeneration";
import { PresetStyle } from "../../types/typesGeneratorOptions";

export const imageGenerationServiceOptions: ImageGenerationServiceModel[] = [
    `ultra`,
    `sd3-large-turbo`,
    `sd3-large`,
    `sd3-medium`,
    `core`
];

const stylePresetSelectProps: ISelectProps<PresetStyle> = {
    label: `Style Preset`,
    id: 'style-select',
    placeholder: `Style Preset`,
    name: `style-select`,
    value: `3d-model`,
    className: `style-select`,
    type: `select`,
    required: false,
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

const imageStrengthInputProps: IInputNumberProps = {
    label: 'Image strength',
    type: `number`,
    id: 'image-strength',
    value: .35,
    min: .2,
    max: .5,
    step: .01,
    placeholder: `impact on the generation`,
    name: 'strength',
    className: `image-strength`,
    required: false
};

export const modelSelects = {
    stylePresetSelectProps,
    imageStrengthInputProps,
};