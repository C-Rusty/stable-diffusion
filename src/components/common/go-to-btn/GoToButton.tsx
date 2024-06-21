import './goToButton.scss';
import { ReactComponent as Arrow } from '../../../imgs/arrow.svg';
import { Link } from 'react-router-dom';

const GoToButton = ({ urlPath }: { urlPath: string}) => {
    
    return(
        <Link 
            to={`/` + urlPath}
            title="go-to-page"
            aria-label="go-to-page"
            className="go-to-btn"
        >
            <p className="go-to-btn__text">Go to gallery</p>
            <Arrow className="go-to-btn__icon"/>
        </Link>
    );
};

export default GoToButton;