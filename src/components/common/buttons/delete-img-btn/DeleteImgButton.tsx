import { useDispatch } from 'react-redux';
import { apiFirebaseStorage } from '../../../../api/Api.Firebase.Storage';
import { ReactComponent as DeleteImgIcon } from '../../../../imgs/delete-img-icon.svg';
import { setModalContent } from '../../../../store/reduxReducers/modalReducer';
import { DeleteButtonText, DeleteImgProps } from '../../../../types/typesCommon';
import './deleteImgButton.scss';

const DeleteButton = (
    {
        userId, 
        imgsToDelete,
        handleDeleteImgClick,
        text
    }
    :
    {
        userId: string | undefined,
        imgsToDelete: Array<{storagePath: string, index: number | undefined}>,
        handleDeleteImgClick: (index: number) => void,
        text: DeleteButtonText
    }
) => {

    const dispatch = useDispatch();

    const handleClick = async () => {
        
        if (!userId) return console.log(`DeleteImgBtn error: userId is ${userId}`);
        if (!imgsToDelete) return console.log(`DeleteImgBtn error: imgsToDelete is ${imgsToDelete}`);

        const imagesToDeleteProps: DeleteImgProps = { userId, imgsToDelete };

        const isDeleted = await apiFirebaseStorage.deleteImages(imagesToDeleteProps);

        switch (isDeleted) {
            case true:
                imgsToDelete.forEach((img) => {
                    handleDeleteImgClick(img.index!);
                });
        
                dispatch(setModalContent({
                    headline: `Success!`,
                    text: `Images deleted successfully!`,
                    isModalOpen: true,
                    event: `img-delete`
                }));
            break;
        
            case false:
                dispatch(setModalContent({
                    headline: `Error!`,
                    text: `Something went wrong with deleting image!`,
                    isModalOpen: true,
                    event: `img-delete`
                }));
            break;
        
            default: break;
        }
    };

    return(
        <a 
            href="#0"
            title="Delete Image"
            aria-label="Delete Image"
            onClick={handleClick}
            className="delete-img-btn"
        >
            <p className="delete-img-btn__text">{text}</p>
            <DeleteImgIcon className="delete-img-btn__icon"/>
        </a>
    );
};

export default DeleteButton;