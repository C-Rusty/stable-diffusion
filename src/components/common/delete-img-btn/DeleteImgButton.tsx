import { apiFirebaseStorage } from '../../../api/Api.Firebase.Storage';
import { ReactComponent as DeleteIcon } from '../../../imgs/delete-icon.svg';
import './deleteImgButton.scss';

const DeleteButton = (
    {
        userId, 
        imageProps,
        handleDeleteImgClick
    }
    :
    {
        userId: string | undefined,
        imageProps: {
            name: string | undefined,
            format: string,
            index: number
        },
        handleDeleteImgClick: (index: number) => void
    }
) => {

    const handleClick = (
        userId: string | undefined, 
        imageProps: {name: string | undefined, format: string, index: number}
    ) => {
        
        if (!userId) return console.log(`DeleteImgBtn error: userId is ${userId}`);
        if (!imageProps.name || !imageProps.format) return console.log(`DeleteImgBtn error: imgName is ${imageProps.name}, imgFormat is ${imageProps.format}`);

        apiFirebaseStorage.deleteImage(userId, [{name: imageProps.name, format: imageProps.format}]);

        handleDeleteImgClick(imageProps.index);
    };

    return(
        <a 
            href="#0"
            title="Delete Image"
            aria-label="Delete Image"
            onClick={() => handleClick(userId, imageProps)}
            className="delete-btn"
        >
            <p className="delete-btn__text">Delete</p>
            <DeleteIcon className="delete-btn__icon"/>
        </a>
    );
};

export default DeleteButton;