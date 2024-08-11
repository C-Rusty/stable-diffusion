import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import { generationHistoryItem, GetImgProps } from '../../../types/typesCommon';
import './generationHistoryItem.scss';
import DeleteGenHistoryButton from '../../common/buttons/delete-gen-history-item-btn/DeleteGenHistoryButton';
import ShowImageButton from '../../common/buttons/show-img-btn/ShowImageButton';
import { apiFirebaseStorage } from '../../../api/Firebase/Api.Firebase.Storage';
import Loader from '../../common/loader/Loader';
import DownloadButton from '../../common/buttons/download-btn/DownloadButton';
import { getImgNameAndFormat } from '../../../utilities/functions/storagePaths';

const GenerationHistoryItem = ( 
    {
        userId,
        item, 
        setGenerationHistory
    } 
    : 
    {
        userId: string | undefined,
        item: generationHistoryItem, 
        setGenerationHistory: Dispatch<SetStateAction<generationHistoryItem[]>>
    }
) => {

    const [itemOptionsArray, setItemOptionsArray] = useState<Array<{
        name: string,
        value: string
    }>>([]);

    useEffect(() => {
        const itemOptionsKeys = Object.keys(item.options);
        const itemOptionsValues = Object.values(item.options);

        setItemOptionsArray([
            ...itemOptionsKeys.map((key, index) => {
                return {
                    name: key.split(`_`).join(` `),
                    value: itemOptionsValues[index] as string
                };
            })
        ]);
    }, [item]);

    const [isImageShown, setIsImageShown] = useState<boolean>(false);
    const [img, setImg] = useState<string | undefined>(undefined);

    const getImgFromStorage = async () => {

        const ImgItemProps: GetImgProps = {
            userId, 
            storagePath: item.generalInfo.storagePath
        };
        
        const response = await apiFirebaseStorage.getImage(ImgItemProps);

        if (!response) return console.log(`getImgFromStorage error: response is ${response}`);

        setImg(response);
    };

    useEffect(() => {
        if (isImageShown) getImgFromStorage();
    }, [isImageShown]);
    
    return(
        <div className='generation-history-item'>
            <div className="generation-history-item__inner">
                <div className="generation-history-item__prompt">
                    <p className="name">Prompt:</p>
                    <div className="value-container">
                        <p className="value">{item.generalInfo.prompt}</p>
                    </div>
                </div>
                <div className="generation-history-item__block model-options">
                    <p className="headline">Options:</p>
                    <div className="model-options-container">
                        {itemOptionsArray.map((option, index) => (
                            <Fragment key={index}>
                                {option.name !== `image` &&
                                    <div className="model-options-container__item" key={index}>
                                        <p className="name">{option.name}:</p>
                                        <p className="value">{option.value}</p>
                                    </div>
                                }
                            </Fragment>
                        ))}
                    </div>
                </div>
                <div className="generation-history-item__btns-container">
                    <DeleteGenHistoryButton 
                        id={item.generalInfo.id} 
                        storagePath={item.generalInfo.storagePath}
                        setGenerationHistory={setGenerationHistory} 
                    />
                    <DownloadButton 
                        imgsToDownload={
                            [{
                                name: getImgNameAndFormat(item.generalInfo.storagePath),
                                url: img!
                            }]
                        }
                        text='Download' 
                    />
                    <ShowImageButton setState={setIsImageShown} state={isImageShown} />
                </div>
                <div className={`generation-history-item__img-container ${isImageShown ? 'active' : ''}`}>
                    {isImageShown && 
                        <Fragment>
                            {img ? 
                                <img src={img} alt="img" loading='lazy' /> 
                                : 
                                <Loader className='img-loading'/>
                            }
                        </Fragment>
                    }
                </div>
            </div>
        </div>
    );
};

export default GenerationHistoryItem;