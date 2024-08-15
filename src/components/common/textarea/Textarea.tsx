import './textarea.scss';
import { Dispatch, SetStateAction } from "react";
import { textAreaCommonClassName } from "../../../utilities/constants";

interface TextareaComponentProps<T> {
    label: string,
    type: string,
    id: string
    placeholder: string,
    name: string,
    title: string,
    autoComplete: string,
    ariaLabel: string,
    spellCheck: boolean,
    rows: number,
    isRequired: boolean
    value: string,
    setValue: Dispatch<SetStateAction<string>>
};

const Textarea = ( { id, name, placeholder, label, value, setValue, isRequired, ariaLabel, title, autoComplete, spellCheck, rows}: TextareaComponentProps<string>) => {

    return (
        <div className="textarea-container">
            <label className="textarea-container__label">{label}</label>
            <textarea
                id={id}
                name={name} 
                className={`textarea-container__textarea ${textAreaCommonClassName}`} 
                placeholder={placeholder}
                onChange={(e) => setValue(e.target.value)}
                value={value}
                aria-label={ariaLabel}
                title={title}
                autoComplete={autoComplete}
                spellCheck={spellCheck}
                required={isRequired}
                rows={rows}
            />
    </div>
    )
};

export default Textarea;