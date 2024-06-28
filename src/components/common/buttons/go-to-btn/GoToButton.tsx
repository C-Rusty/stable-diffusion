import './goToButton.scss';
import { ReactComponent as Arrow } from '../../../../imgs/arrow.svg';
import { Link } from 'react-router-dom';
import { GoToButtonText } from '../../../../types/typesCommon';

const GoToButton = ({ urlPath, text }: { urlPath: string, text: GoToButtonText}) => {
    
    return(
        <Link 
            to={`/` + urlPath}
            title="go-to-page"
            aria-label="go-to-page"
            className="go-to-btn"
        >
            <p className="go-to-btn__text">{text}</p>
            <Arrow className="go-to-btn__icon"/>
        </Link>
    );
};

export default GoToButton;