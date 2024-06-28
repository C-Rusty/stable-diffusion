import './deleteButton.scss';
import { ReactComponent as DeleteItemIcon } from '../../../../imgs/delete-item-icon.svg';
import { ApiFirebaseStore } from '../../../../api/Api.Firebase.Store';
import { Context } from '../../../app/App';
import { Dispatch, SetStateAction, useContext } from 'react';
import { GenerationHistoryItemType } from '../../../../types/typesCommon';

const DeleteButton = (
    {
        timestamp,
        setGenerationHistory
    }
    : 
    {
        timestamp: string,
        setGenerationHistory: Dispatch<SetStateAction<GenerationHistoryItemType[]>>
    }
) => {

    const { mobxStore } = useContext(Context);
    const userId = mobxStore.userId;

    const handleClick = () => {
        if (!userId) return console.log(`DeleteBtn error: userId is ${userId}`);

        ApiFirebaseStore.deleteGenerationHistoryItem(userId, timestamp);

        setGenerationHistory((prev) => prev.filter(item => item.timestamp !== timestamp));
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

export default DeleteButton;