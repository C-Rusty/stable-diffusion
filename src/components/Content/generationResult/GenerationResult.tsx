import { useContext } from 'react';
import './generationResult.scss';
import { Context } from '../../app/App';
import { urlPaths } from '../../../routes/urlPaths';
import AddToFavouritesButton from '../../common/buttons/upload-img-btn/AddToFavouritesButton';
import GoToButton from '../../common/buttons/go-to-btn/GoToButton';
import DownloadButton from '../../common/buttons/download-btn/DownloadButton';
import { ImageItem } from '../../../types/typesCommon';

const GenerationResult = ({image}: {image: ImageItem}) => {

    const {mobxStore} = useContext(Context);
    const userId = mobxStore.userId;

    return(
        <div className="generation-result">
            <div className="generation-result__inner">
                <div className="generation-result__img-container">
                    <img 
                        src={image.url ? image.url : undefined} 
                        alt={image.prompt ? image.prompt: undefined}
                        className='generation-result__img'
                    />
                </div>
                <div className="generation-result__action-btns">
                    <div className="generation-result__action-btns-inner">
                        <AddToFavouritesButton 
                            image={{
                                storagePath: image.storagePath,
                                id: image.id
                            }} 
                            userId={userId} 
                        />
                        <GoToButton urlPath={urlPaths.favourites} text='Go to favourites'/>
                        <DownloadButton 
                            imgsToDownload={[
                                {
                                    name: `${image.prompt}.${image.format}`,
                                    url: image.storagePath
                                }
                            ]}
                            text="Download"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenerationResult;