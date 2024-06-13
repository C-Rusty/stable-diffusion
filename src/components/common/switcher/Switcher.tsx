import { Dispatch, SetStateAction } from "react";
import './switcher.scss';

const Switcher = (
    {
        value,
        setValue
    } : 
    {   
        value: boolean,
        setValue: Dispatch<SetStateAction<boolean>>
    }
) => {
    return (
        <label className="switch" >
            <input className="switch__input" type="checkbox" onChange={() => setValue(!value)}/>
            <span className="switch__slider round"></span>
        </label>
    );
};

export default Switcher;