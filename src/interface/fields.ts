export interface IInputProps {
    label: string,
    type: string
    id: string,
    value:  number | string | File | null,
    className: string,
    placeholder: string,
    name: string,
    required: boolean
};

export interface IInputTextProps extends IInputProps {
    type: `text`,
    value: string,
    title: string,
};

export interface IInputNumberProps extends IInputProps {
    type: `number`
    min: number,
    max: number,
    step: number,
    value: number
};

export interface IInputFileProps extends IInputProps {
    type: `file`,
    accept: string,
    value: File | null
};

export interface ITextareaProps extends IInputProps {
    type: `textarea`,
    title: string,
    autoComplete: `on` | `off`,
    ariaLabel: string,
    spellCheck: boolean,
    rows: number,
    value: string
};

export interface ISelectProps<T> extends IInputProps {
    options: Array<{value: T, text: T}>,
    value: string,
};

export interface IButtonProps  {
    text: string,
}