import { Dispatch, SetStateAction } from "react";
import './switcher.scss';

const Switcher = (
    {
        headline,
        value,
        setValue
    } : 
    {   
        headline: string,
        value: boolean,
        setValue: Dispatch<SetStateAction<boolean>>
    }
) => {
    return (
        <div className="switcher-container">
            <p className='switcher-container__headline'>
                {headline}
            </p>
            <label className="switcher-container__switch">
                <input 
                    className="switcher-container__switch-input" 
                    type="checkbox" checked={value} 
                    onChange={() => setValue(!value)}
                />
                <span className="switcher-container__switch-slider round"></span>
            </label>
        </div>

    );
};

export default Switcher;