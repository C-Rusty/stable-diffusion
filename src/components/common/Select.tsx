import { Dispatch, SetStateAction } from "react";
import { SelectProps } from "../../types/types";

const Select = (
    {
        optionProps,
        defaultValue,
        setSelectValue
    }:
    {
        optionProps: SelectProps,
        defaultValue: string,
        setSelectValue: Dispatch<SetStateAction<string>>
    }
) => {
    return(
        <select 
            className={optionProps.className} 
            id={optionProps.id} 
            defaultValue={defaultValue} 
            onChange={(e) => setSelectValue(e.target.value)}
        >
            {optionProps.options.map((optionItem) => 
                <option key={optionItem.text} value={optionItem.value}>{optionItem.text}</option>
            )}
        </select>
    );
};

export default Select;

