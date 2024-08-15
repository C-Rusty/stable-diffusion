import { useDispatch } from 'react-redux';
import './switcher.scss';
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

const Switcher = (
    {
        headline,
        value,
        setValue
    } : 
    {   
        headline: string,
        value: boolean,
        setValue: ActionCreatorWithPayload<boolean, string>
    }
) => {

    const dispatch = useDispatch();

    return (
        <div className="switcher-container">
            <p className='switcher-container__headline'>
                {headline}
            </p>
            <label className="switcher-container__switch">
                <input 
                    className="switcher-container__switch-input" 
                    type="checkbox" checked={value} 
                    onChange={() => dispatch(setValue(!value))}
                />
                <span className="switcher-container__switch-slider round"></span>
            </label>
        </div>

    );
};

export default Switcher;