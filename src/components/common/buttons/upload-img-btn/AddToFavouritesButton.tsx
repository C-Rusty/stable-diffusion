import './addToFavouritesButton.scss';
import { ReactComponent as AddIcon } from '../../../../images/add-icon.svg';
import { useDispatch } from 'react-redux';
import { updateImgItemFavouriteProps } from '../../../../types/typesCommon';
import { setModalContent } from '../../../../store/reduxReducers/modalReducer';
import { ApiFirebaseStore } from '../../../../api/Firebase/Api.Firebase.Store';

const AddToFavouritesButton = ( 
    { 
        image,
        userId
    } 
    : 
    { 
        image: {storagePath: string, id: string},
        userId: string | undefined
    }
) => {

    const dispatch = useDispatch();
    
    const handleClick = async () => {

        if (!userId || !image) {
            return console.log(`Something went wrong with a request: 
                userId: ${userId}, 
                image Details: ${image}`,
            );
        };

        const imgsToUploadProps: updateImgItemFavouriteProps = {
            userId,
            storagePath: image.storagePath,
            id: image.id,
        };

        const isAdded: boolean = await ApiFirebaseStore.addImgToFavourites(imgsToUploadProps);

        if (isAdded) {
            dispatch(setModalContent({
                headline: `Image has been added to favourites`, 
                text: ``, 
                isModalOpen: true,
                event: `img-upload`
            }));
        };
    };

    return(
        <a 
            href="#0"
            title="Add to favourites"
            aria-label="Add to favourites"
            onClick={handleClick}
            className="add-to-favourites-btn"
        >
            <p className="add-to-favourites-btn__text">Add to favourites</p>
            <AddIcon className="add-to-favourites-btn__icon"/>
        </a>
    );
};

export default AddToFavouritesButton;