import { useEffect, useState } from 'react';
import DeleteButton from '../../common/buttons/delete-img-btn/DeleteImgButton';
import DownloadButton from '../../common/buttons/download-btn/DownloadButton';
import './favouritesItem.scss';
import { getImgNameAndFormat } from '../../../utilities/functions';

const FavouritesItem = (
    {
        index,
        img,
        userId,
        handleImgClick,
        handleDeleteImgClick,
        isSelectMultipleImagesModeOn
    }
    :
    {
        index: number,
        img: {
            prompt: string,
            format: string,
            url: string,
            id: string,
            storagePath: string
        },
        userId: string | undefined,
        handleImgClick: (index: number, id: string) => void,
        handleDeleteImgClick: (index: number) => void,
        isSelectMultipleImagesModeOn: boolean
    }
) => {

    const [isImgSelected, setSelectModeClassName] = useState<boolean>(false);

    const handleClassNameState = () => {
        if (isSelectMultipleImagesModeOn) {
            setSelectModeClassName((prev) => !prev);
        } else {
            setSelectModeClassName(false);
        };
    };

    useEffect(() => {
        if (!isSelectMultipleImagesModeOn) {
            setSelectModeClassName(false);
        }
    }, [isSelectMultipleImagesModeOn]);

    return(
        <div className="img-container">
            <img 
                src={img.url} 
                alt={img.prompt} 
                onClick={() => {handleImgClick(index, img.id); handleClassNameState();}}
                className={`
                    img-container__img 
                    ${isSelectMultipleImagesModeOn ? 'select-mode' : ''}
                    ${isImgSelected ? 'selected' : ''}
                    
                `}
            />
            <div className="img-container__btns-container">
            <DownloadButton 
                imgsToDownload={[{
                    url: img.url,
                    name: getImgNameAndFormat(img.storagePath)
                }]}
                text="Download"
            />
            <DeleteButton
                userId={userId}
                imgsToDelete={ [{ storagePath: img.storagePath, index: index } ]}
                handleDeleteImgClick={handleDeleteImgClick}
                text="Delete"
            />
            </div>
        </div>
    );
};

export default FavouritesItem;