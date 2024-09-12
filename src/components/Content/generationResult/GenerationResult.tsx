import { useContext } from 'react';
import './generationResult.scss';
import { Context } from '../../app/App';
import { urlPaths } from '../../../routes/urlPaths';
import AddToFavouritesButton from '../../common/buttons/upload-img-btn/AddToFavouritesButton';
import GoToButton from '../../common/buttons/go-to-btn/GoToButton';
import DownloadButton from '../../common/buttons/download-btn/DownloadButton';
import { IGenResultItem } from '../../../interface/items/imgItems';

const GenerationResult = ({genResultItem}: {genResultItem: IGenResultItem}) => {

    const {mobxStore} = useContext(Context);
    const userId = mobxStore.userId;

    return(
        <div className="generation-result">
            <div className="generation-result__inner">
                <div className="generation-result__img-container">
                    {genResultItem.format === `mp4` ?
                        <video controls>
                            <source src={genResultItem.itemUrl ? genResultItem.itemUrl : undefined} type="video/mp4" />
                            <p>
                                Your browser doesn't support HTML video. Please upgrade your browser or download other browser supporting HTML5 video. You can review video in generation history page if you've enabled "Save generation history" option.
                            </p>
                        </video>
                        :
                        <img 
                            src={genResultItem.itemUrl ? genResultItem.itemUrl : undefined} 
                            alt={genResultItem.prompt ? genResultItem.prompt: undefined}
                            className='generation-result__img'
                        />
                    }
                </div>
                <div className="generation-result__action-btns">
                    <div className="generation-result__action-btns-inner">
                        <AddToFavouritesButton 
                            image={{
                                storagePath: genResultItem.storagePath,
                                id: genResultItem.id
                            }} 
                            userId={userId} 
                        />
                        <GoToButton urlPath={urlPaths.favourites} text='Go to favourites'/>
                        <DownloadButton 
                            imgsToDownload={[
                                {
                                    name: `${genResultItem.prompt}.${genResultItem.format}`,
                                    url: genResultItem.storagePath
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