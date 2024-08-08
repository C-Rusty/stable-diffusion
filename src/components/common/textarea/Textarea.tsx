import './textarea.scss';
import { Dispatch, SetStateAction } from "react";
import { textAreaCommonClassName } from "../../../utilities/vars";

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
    required: boolean
    value: string,
    setValue: Dispatch<SetStateAction<string>>
};

const Textarea = ( { id, name, placeholder, label, value, setValue, required, ariaLabel, title, autoComplete, spellCheck, rows}: TextareaComponentProps<string>) => {

    return (
        <div className="textarea-container">
            <label className="textarea-container__label">{label}</label>
            <textarea
                id={id}
                name={name} 
                className={`textarea-container__textarea ${textAreaCommonClassName}`} 
                placeholder={placeholder}
                onChange={(e) => setValue(e.target.value.trim())}
                value={value}
                aria-label={ariaLabel}
                title={title}
                autoComplete={autoComplete}
                spellCheck={spellCheck}
                required={required}
                rows={rows}
            />
    </div>
    )
};

export default Textarea;