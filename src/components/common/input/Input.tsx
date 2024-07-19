import './input.scss';

type SetStateAction<T> = React.Dispatch<React.SetStateAction<T>>;

interface InputProps<T> {
    type: string,
    name: string,
    id?: string,
    min?: number,
    max?: number,
    step?: number,
    placeholder?: string,
    label: string,
    value: T,
    setValue: SetStateAction<T>
};

const Input = <T,> ({ type, name, id, min, max, step, placeholder, label, value, setValue} : InputProps<T>) => {

    return (
        <div className="input-container">
            <label className="input-container__label">{label}</label>
            <input 
                type={type} 
                name={name} 
                id={id ? id : undefined} 
                className={`input-container__input`}
                aria-label={type === "number" ? "Enter a number" : "Enter a text"}
                title={type === "number" ? "Enter a number" : "Enter a text"}
                min={type === "number" ? min : undefined}
                max={type === "number" ? max : undefined}
                step={type === "number" ? step : undefined}
                placeholder={placeholder ? placeholder : undefined} 
                value={`${value}`}
                onChange={(e) => setValue(e.target.value as unknown as T)}
            />
        </div>

    );
};

export default Input;