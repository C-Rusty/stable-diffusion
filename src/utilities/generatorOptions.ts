import { AspectRatios, OutputFormat, PresetStyle } from "../types/typesGeneratorOptions";
import { IInputFileProps, IInputNumberProps, ISelectProps, ITextareaProps } from "../interface/fields";

const promptProps: ITextareaProps = {
    label: `Image description`,
    type: `textarea`,
    id: `prompt`,
    placeholder: `Image description`,
    name: `prompt`,
    title: `Image description`,
    autoComplete: `off`,
    ariaLabel: `Image description`,
    spellCheck: true,
    rows: 1,
    required: false,
    className: `prompt`,
    value: ``
};

const aspectRatioSelectProps: ISelectProps<AspectRatios> = {
    label: `Aspect Ratio`,
    type: `select`,
    id: `aspect-ratio`,
    placeholder: `Aspect Ratio`,
    name: `aspect-ratio`,
    value: `16:9`,
    className: `aspect-ratio`,
    required: false,
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

const negativeInputProps: ITextareaProps = {
    label: `Negative Prompt`,
    type: `textarea`,
    id: `negative-prompt`,
    placeholder: `Type what you do not wish to see in the output image`,
    name: `negative-prompt`,
    title: `Type what you do not wish to see in the output image`,
    autoComplete: `off`,
    ariaLabel: `Type what you do not wish to see in the output image`,
    spellCheck: false,
    rows: 1,
    required: false,
    className: `negative-prompt`,
    value: ``
};

const outputFormmatSelectProps: ISelectProps<OutputFormat> = {
    label: `Output Format`,
    options: [
        {value: `png`, text: `png`},
        {value: `jpeg`, text: `jpeg`},
        {value: `webp`, text: `webp`},
    ],
    type: `select`,
    name: `output-format`,
    className: `output-format`,
    placeholder: `Output Format`,
    value: `png`,
    required: false,
    id: 'output-format'
};

const seedInputProps: IInputNumberProps = {
    label: `Seed`,
    id: 'seed-select',
    value: 0,
    min: 0,
    max: 4294967294,
    step: 1,
    placeholder: `randomness`,
    type: 'number',
    name: 'seed',
    className: 'seed',
    required: false
};

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

const fileInputProps: IInputFileProps = {
    label: 'Image',
    name: 'file',
    id: 'file-input',
    accept: '.png, .webp, .jpeg',
    type: 'file',
    value: null,
    className: 'file-input',
    placeholder: 'Choose an image',
    required: false
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

const creativityInputProps: IInputNumberProps = {
    label: 'Creativity',
    type: 'number',
    id: 'creativity',
    value: 0.2,
    min: 0.2,
    max: 0.5,
    step: 0.01,
    className: 'creativity-input',
    placeholder: `impact on the generation`,
    name: 'creativity',
    required: true
};

export const modelSelects = {
    promptProps,
    aspectRatioSelectProps,
    negativeInputProps,
    outputFormmatSelectProps,
    stylePresetSelectProps,
    fileInputProps,
    seedInputProps,
    imageStrengthInputProps,
    creativityInputProps
};