import { useEffect, useState } from 'react';
import './select.scss';

type SetStateAction<T> = React.Dispatch<React.SetStateAction<T>>;

interface SelectComponentProps<T> {
    value: T,
    setValue: SetStateAction<T>,
    options: {text: string, value: string}[],
    className: string,
    id?: string,
    label: string
};

const Select = <T,> ({ setValue, options, className, id, value, label}: SelectComponentProps<T>) => {

    const [selectHtml, setSelectHtml] = useState<HTMLElement | null>(null);

    useEffect(() => {
        if (!id) throw new Error(`Select id is not defined when setting a value for selectHtml`); 
        setSelectHtml(document.getElementById(id));
    }, []);

    const handleClick = (value: T, text: string, id: string | undefined) => {
        setValue(value);
        setIsOpen(false);

        const list = selectHtml?.querySelector(`.${className}__list-options`);
        if (id) list?.classList.remove(`open-list`);
    };

    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        if (!id) throw new Error(`Select id is not defined`);

        const list = selectHtml?.querySelector(`.${className}__list-options`);
        if (id) {
            switch (isOpen) {
                case true:
                    list?.classList.add(`open-list`);
                break;
                case false:
                    list?.classList.remove(`open-list`);
                break;
            
                default: break;
            }
        };
    }, [isOpen]);

    return(
        <div className='select-container'>
            <label className="select-container__label">{label}</label>
            <div 
                className={className} 
                id={id ? id : undefined}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={className + `__value`}>{value as unknown as string}</span>
                <div className={className + `__list-options`}>
                    {options.map((optionItem) => 
                        <div 
                            onClick={() => handleClick(
                                optionItem.value as unknown as T,
                                optionItem.text,
                                id
                            )} 
                            key={optionItem.value}
                            className={className + `__option`}
                        >{optionItem.text}</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Select;

