import { AspectRatiosProps, outputFormat } from "../types/typesV2Model";

const aspectRatiSelectProps: {
    className: string
    id: string
    options: AspectRatiosProps[]
} = {
    className: 'generator__aspect-ratio-select',
    id: 'aspect-select',
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

const negativeInputProps: {
    className: string
    id: string
    inputValue: string
    placeholder: string
} = {
    className: 'generator__negative-prompt-select',
    id: 'negative-select',
    inputValue: ``,
    placeholder: `what you do not wish to see in the output image`
};

const outputFormmatSelectProps: {
    className: string
    id: string
    options: Array<{value: outputFormat, text: outputFormat}>
} = {
    className: 'generator__output-format-select',
    id: 'format-select',
    options: [
        {value: `png`, text: `png`},
        {value: `jpeg`, text: `jpeg`},
        {value: `webp`, text: `webp`},
    ],
};


export const v2ModelCommonPropsForSelect = {
    aspectRatiSelectProps,
    negativeInputProps,
    outputFormmatSelectProps,
};