import { loadFavouriteItemsLimit, loadGenHistoryItemsLimit } from "../../../../utilities/vars";
import './showMoreButton.scss';
import {ReactComponent as Arrow} from '../../../../images/arrow.svg';


const ShowMoreButton = (
    {
        page, setItemsCounter
    } 
    : 
    {
        page: `favourites` | `generationHistory`, 
        setItemsCounter: React.Dispatch<React.SetStateAction<number>>
    }
) => {

    const handleClick = () => {
        switch (page) {
            case `favourites`:
                setItemsCounter((prev) => prev + loadFavouriteItemsLimit);
            break;

            case `generationHistory`:
                setItemsCounter((prev) => prev + loadGenHistoryItemsLimit);
            break;
        
            default: return console.log(`ShowMoreButton error: page is ${page}`);
        };
    };

    return (
        <a 
            href="#0"
            className="show-more-btn"
            title="Show more"
            aria-label="Show more"
            onClick={handleClick}
        >
            <p className="show-more__text">Show more</p>
            <Arrow className="show-more-btn__icon"/>
        </a>
    );
};

export default ShowMoreButton;