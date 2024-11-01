import { IInputFileProps, IInputNumberProps, IInputTextProps } from "../../interface/fields";
import { ImageEditServiceModel } from "../../types/services/imageEdit";

export const imageEditServiceOptions: Array<ImageEditServiceModel> = [
    `erase`,
    `inpaint`,
    `outpaint`,
    `search-and-replace`,
    `remove-background`
];

const maskFileInputProps: IInputFileProps = {
    label: 'Mask image',
    name: 'file',
    id: 'file-mask',
    accept: '.png, .webp, .jpeg',
    required: false,
    type: 'file',
    value: null,
    className: 'file-mask',
    placeholder: 'Choose a mask image',
};

const growMaskInputProps: IInputNumberProps = {
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
    required: false
};

const pixelsAmountInputProps: IInputNumberProps = {
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

const searchToReplaceInputProps: IInputTextProps = {
    label: 'Description of what to replace',
    type: 'text',
    id: 'search-to-replace',
    value: '',
    className: 'search-to-replace-input',
    placeholder: `Short description of what to inpaint in the image.`,
    name: 'search-to-replace',
    required: true,
    title: `Short description of what to inpaint in the image.`,
};

export const imgEditModelSelects = {
    maskFileInputProps,
    growMaskInputProps,
    pixelsAmountInputProps,
    searchToReplaceInputProps
};