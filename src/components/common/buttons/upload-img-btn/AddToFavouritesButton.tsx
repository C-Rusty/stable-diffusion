import './addToFavouritesButton.scss';
import { ReactComponent as AddIcon } from '../../../../imgs/add-icon.svg';
import { useDispatch } from 'react-redux';
import { generatedImageItem, updateImgItemFavouriteProps } from '../../../../types/typesCommon';
import { setModalContent } from '../../../../store/reduxReducers/modalReducer';
import { ApiFirebaseStore } from '../../../../api/Api.Firebase.Store';

const AddToFavouritesButton = ( 
    { 
        imgInfo 
    } 
    : 
    { 
        imgInfo: {
            userId: string | undefined,
            image: generatedImageItem,
        }
    }
) => {

    const dispatch = useDispatch();
    
    const handleClick = async () => {

        const { userId, image } = imgInfo;

        if (!userId || !image || !image.timestamp) {
            return console.log(`Something went wrong with a request: 
                userId: ${userId}, 
                imgDetails: ${image}`,
            );
        };

        const imgsToUploadProps: updateImgItemFavouriteProps = {
            userId,
            imgName: image.name!.split(` `).join(`_`) + `.${image.format}`,
            timestamp: image.timestamp,
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