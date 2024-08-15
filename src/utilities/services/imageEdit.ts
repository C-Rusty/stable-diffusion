import { ImageEditServiceModel } from "../../types/services/imageEdit";

export const imageEditServiceOptions: Array<ImageEditServiceModel> = [
    `erase`,
    `inpaint`,
    `outpaint`,
    `search-and-replace`,
    `remove-background`
];

const maskFileInputProps: {
    label: string,
    name: string,
    id: string,
    accept: string,
    inputType: `file`,
    isRequired: boolean
} = {
    label: 'Mask image',
    name: 'file',
    id: 'file-mask',
    accept: '.png, .webp, .jpeg',
    inputType: 'file',
    isRequired: false
};

const growMaskInputProps: {
    label: string,
    type: string
    id: string,
    value: number,
    min: number,
    max: number,
    step: number,
    className: string,
    placeholder: string,
    name: string,
    required: boolean
} = {
    label: 'Grow mask',
    type: 'number',
    id: 'creativity',
    value: 5,
    min: 0,
    max: 20,
    step: 1,
    className: 'creativity-input',
    placeholder: `impact on the generation`,
    name: 'creativity',
    required: true
};

const pixelsAmountInputProps: {
    label: string,
    type: string
    id: string,
    value: number,
    min: number,
    max: number,
    step: number,
    className: string,
    placeholder: string,
    name: string,
    required: boolean
} = {
    label: '',
    type: 'number',
    id: 'pixels-amount',
    value: 0,
    min: 0,
    max: 2000,
    step: 1,
    className: 'pixels-amount-input',
    placeholder: `pixels amount generated on the imag side`,
    name: 'pixels-amount',
    required: false
};

const searchToReplaceInputProps: {
    label: string,
    type: string
    id: string,
    value: string,
    className: string,
    placeholder: string,
    name: string,
    required: boolean
} = {
    label: 'Description of what to replace',
    type: 'text',
    id: 'search-to-replace',
    value: ``,
    className: 'search-to-replace-input',
    placeholder: `Short description of what to inpaint in the image.`,
    name: 'search-to-replace',
    required: true
};

export const imgEditModelSelects = {
    maskFileInputProps,
    growMaskInputProps,
    pixelsAmountInputProps,
    searchToReplaceInputProps
};