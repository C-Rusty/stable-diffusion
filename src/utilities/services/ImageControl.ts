import { IInputNumberProps } from "../../interface/fields";
import { ImageControlServiceModel } from "../../types/services/imageControl";

export const imageControlServiceOptions: Array<ImageControlServiceModel> = [`sketch`, `structure`, `style`];

const controlStrengthInnputProps: IInputNumberProps = {
    label: 'Control strength',
    type: 'number',
    id: 'control-strength',
    value: .7,
    min: 0,
    max: 1,
    step: 0.1,
    className: 'control-strength-input',
    placeholder: `image influence on the generation`,
    name: 'control-strength',
    required: false
};

const fidelityInputProps: IInputNumberProps = {
    label: 'Fidelity',
    type: 'number',
    id: 'fidelity',
    value: .5,
    min: 0,
    max: 1,
    step: 0.1,
    className: 'fidelity-input',
    placeholder: `How closely the output image's style resembles the input image's style`,
    name: 'fidelity',
    required: false
};

export const imageControlServiceInputProps = {
    controlStrengthInnputProps,
    fidelityInputProps
};