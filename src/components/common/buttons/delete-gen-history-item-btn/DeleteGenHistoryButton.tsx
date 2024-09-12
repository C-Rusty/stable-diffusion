import './deleteGenHistoryButton.scss';
import { ReactComponent as DeleteItemIcon } from '../../../../images/delete-item-icon.svg';
import { ApiFirebaseStore } from '../../../../api/Firebase/Api.Firebase.Store';
import { Context } from '../../../app/App';
import { Dispatch, SetStateAction, useContext } from 'react';
import { apiFirebaseStorage } from '../../../../api/Firebase/Api.Firebase.Storage';
import { IImageHistoryItem } from '../../../../interface/items/imgItems';

const DeleteGenHistoryButton = (
    {
        id,
        storagePath,
        setGenerationHistory
    }
    : 
    {
        id: string,
        storagePath: string,
        setGenerationHistory: Dispatch<SetStateAction<IImageHistoryItem[]>>
    }
) => {

    const { mobxStore } = useContext(Context);
    const userId = mobxStore.userId;

    const handleClick = () => {
        if (!userId) return console.log(`DeleteBtn error: userId is ${userId}`);

        ApiFirebaseStore.deleteGenerationHistoryItem(userId, id);
        apiFirebaseStorage.deleteImages({
            userId,
            imgsToDelete: [{ storagePath }]
        });

        setGenerationHistory((prev) => prev.filter(item => item.generalInfo.id !== id));
    };

    return(
        <a 
            href="#0"
            title="Delete"
            aria-label="Delete"
            onClick={handleClick}
            className="delete-btn"
        >
            <p className="delete-btn__text">Delete</p>
            <DeleteItemIcon className="delete-btn__icon"/>
        </a>
    );
};

export default DeleteGenHistoryButton;