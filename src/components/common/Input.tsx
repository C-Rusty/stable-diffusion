type SetStateAction<T> = React.Dispatch<React.SetStateAction<T>>;

interface InputProps<T> {
    type: string,
    name: string,
    id?: string,
    className: string,
    placeholder?: string,
    value: T,
    setValue: SetStateAction<T>
};

const Input = <T,> ({ type, name, id, className, placeholder, value, setValue} : InputProps<T>) => {

    return (
        <input 
            type={type} 
            name={name} 
            id={id ? id : undefined} 
            className={className}
            placeholder={placeholder ? placeholder : undefined} 
            value={value as unknown as string}
            onChange={(e) => setValue(e.target.value as unknown as T)}
            {...type === "number" && { min: 0, max: 4294967294  }}
        />
    );
};

export default Input;