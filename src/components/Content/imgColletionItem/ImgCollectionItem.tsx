import { useEffect, useState } from 'react';
import DeleteButton from '../../common/buttons/delete-img-btn/DeleteImgButton';
import DownloadButton from '../../common/buttons/download-btn/DownloadButton';
import './imgCollectionItem.scss';

const ImgCollectionItem = (
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
            name: string,
            url: string
        },
        userId: string | undefined,
        handleImgClick: (index: number) => void,
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
                alt={img.name} 
                onClick={() => {handleImgClick(index); handleClassNameState();}}
                className={`
                    img-container__img 
                    ${isSelectMultipleImagesModeOn ? 'select-mode' : ''}
                    ${isImgSelected ? 'selected' : ''}
                    
                `}
            />
            <div className="img-container__btns-container">
            <DownloadButton 
                imgsToDownload={[img]}
                text="Download"
            />
            <DeleteButton
                userId={userId}
                imgsToDelete={[
                    {
                        name: img.name, 
                        format: img.name.split(".").slice(-1)[0],
                        index: index
                    }
                ]}
                handleDeleteImgClick={handleDeleteImgClick}
                text="Delete"
            />
            </div>
        </div>
    );
};

export default ImgCollectionItem;