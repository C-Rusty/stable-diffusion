import { AspectRatiosProps, OutputFormat } from "../../types/typesV2Model";

const aspectRatiSelectProps: {
    options: AspectRatiosProps[]
} = {
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
    inputValue: string
    placeholder: string,
    inputType: string,
    name: string,
} = {
    inputValue: ``,
    placeholder: `what you do not wish to see in the output image`,
    inputType: `text`,
    name: `negative-prompt`,
};

const outputFormmatSelectProps: {
    options: Array<{value: OutputFormat, text: OutputFormat}>
} = {
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