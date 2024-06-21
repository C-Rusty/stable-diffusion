import { Dispatch, SetStateAction } from "react";
import './closeButton.scss';
import { ReactComponent as CloseIcon } from '../../../imgs/close-icon.svg';

const CloseButton = ( { setState } : { setState: Dispatch<SetStateAction<boolean>> } ) => {

    const handleClick = () => {
        setState(false);
    };

    return(
        <a 
            href="#0"
            title="Close"
            aria-label="Close"
            onClick={handleClick}
            className="close-btn"
        >
            <p className="close-btn__text">Close</p>
            <CloseIcon className="close-btn__icon"/>
        </a>
    );
};

export default CloseButton;