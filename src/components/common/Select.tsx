import { Dispatch, SetStateAction } from "react";
import { SelectProps } from "../../types/typesCommon";
import { AspectRatios } from "../../types/typesV2Model";
import { Resolutions } from "../../types/typesV1Model";

const Select = (
    {
        optionProps,
        defaultValue,
        setSelectValue
    }:
    {
        optionProps: SelectProps,
        defaultValue: string,
        setSelectValue: Dispatch<SetStateAction<AspectRatios | Resolutions>>
    }
) => {

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>, id: string) => {
        switch (e.target.value) {
            case ``:
                
                break;
        
            default:
                break;
        }
    };

    return(
        <select 
            className={optionProps.className} 
            id={optionProps.id} 
            defaultValue={defaultValue} 
            onChange={(e) => handleChange(e, optionProps.id)}
        >
            {optionProps.options.map((optionItem) => 
                <option key={optionItem.text} value={optionItem.value}>{optionItem.text}</option>
            )}
        </select>
    );
};

export default Select;

