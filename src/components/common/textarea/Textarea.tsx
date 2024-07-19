import './textarea.scss';
import { Dispatch, SetStateAction } from "react";
import { textAreaCommonClassName } from "../../../utilities/commonVars";

interface TextareaComponentProps<T> {
    id?: string,
    name: string,
    label: string,
    placeholder: string,
    negativePrompt: string | undefined,
    setNegativePrompt: Dispatch<SetStateAction<string | undefined>>
    isRequired: boolean,
};

const Textarea = ( { id, name, placeholder, label, negativePrompt, setNegativePrompt, isRequired }: TextareaComponentProps<string>) => {

    return (
        <div className="textarea-container">
            <label className="textarea-container__label">{label}</label>
            <textarea
                id={id}
                name={name} 
                className={`textarea-container__textarea ${textAreaCommonClassName}`} 
                placeholder={placeholder}
                onChange={(e) => setNegativePrompt(e.target.value)}
                value={negativePrompt ? negativePrompt : ``}
                aria-label='Negative prompt'
                title='Negative prompt'
                autoComplete='on'
                spellCheck='true'
                required={isRequired}
                rows={1}
            />
    </div>
    )
};

export default Textarea;