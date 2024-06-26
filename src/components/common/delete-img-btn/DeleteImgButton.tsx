import { useDispatch } from 'react-redux';
import { apiFirebaseStorage } from '../../../api/Api.Firebase.Storage';
import { ReactComponent as DeleteIcon } from '../../../imgs/delete-icon.svg';
import './deleteImgButton.scss';
import { setModalContent } from '../../../store/reduxReducers/modalReducer';
import { DeleteButtonText } from '../../../types/typesCommon';

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
        imgsToDelete: Array<{
            name: string,
            format: string,
            index: number
        }>,
        handleDeleteImgClick: (index: number) => void,
        text: DeleteButtonText
    }
) => {

    const dispatch = useDispatch();

    const handleClick = async () => {
        
        if (!userId) return console.log(`DeleteImgBtn error: userId is ${userId}`);
        if (!imgsToDelete) return console.log(`DeleteImgBtn error: imgsToDelete is ${imgsToDelete}`);

        const isDeleted = await apiFirebaseStorage.deleteImage(userId, imgsToDelete.map(img => ({
            name: img.name,
            format: img.format  
        })));

        switch (isDeleted) {
            case true:
                imgsToDelete.forEach((img) => {
                    handleDeleteImgClick(img.index);
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
            className="delete-btn"
        >
            <p className="delete-btn__text">{text}</p>
            <DeleteIcon className="delete-btn__icon"/>
        </a>
    );
};

export default DeleteButton;