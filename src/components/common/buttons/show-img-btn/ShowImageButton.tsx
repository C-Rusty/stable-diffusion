import './showImageButton.scss';
import {ReactComponent as Arrow} from '../../../../imgs/arrow.svg';
import { Dispatch, SetStateAction } from 'react';

const ShowImageButton = ({state, setState} : {state: boolean, setState: Dispatch<SetStateAction<boolean>>}) => {

    const handleClick = () => {
        setState((prev) => !prev);
    };

    return(
        <a 
            href="#0"
            title="Show/Hide image"
            aria-label="Show/Hide image"
            onClick={handleClick}
            className="show-btn"
        >
            <p className="show-btn__text">{state ? `Hide image` : `Show image`}</p>
            <Arrow className={`show-btn__icon ${state ? `show-btn__icon--active` : ``}`} />
        </a>
    );
};

export default ShowImageButton;