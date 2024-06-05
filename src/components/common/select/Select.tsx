import './select.scss';

type SetStateAction<T> = React.Dispatch<React.SetStateAction<T>>;

interface SelectComponentProps<T> {
    setValue: SetStateAction<T>,
    options: {text: string, value: string}[],
    className: string,
    id?: string | undefined
}

const Select = <T,> ({ setValue, options, className, id}: SelectComponentProps<T>) => {

    const handleClick = (value: T) => {
        setValue(value);
    };

    return(
        <div className={className} id={id ? id : undefined}>
            <div className={className + `__inner`}>
                <div></div>
                {options.map((optionItem) => 
                    <div 
                        onClick={() => handleClick(optionItem.value as unknown as T)} 
                        key={optionItem.value}
                        className={className + `__option`}
                    >{optionItem.text}</div>
                )}
            </div>
        </div>
    );
};

export default Select;

