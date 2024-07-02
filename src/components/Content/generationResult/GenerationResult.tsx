import { useContext, useEffect, useState } from 'react';
import './generationResult.scss';
import { Context } from '../../app/App';
import { urlPaths } from '../../../routes/urlPaths';
import { generatedImageItem } from '../../../types/typesCommon';
import AddToFavouritesButton from '../../common/buttons/upload-img-btn/AddToFavouritesButton';
import GoToButton from '../../common/buttons/go-to-btn/GoToButton';
import DownloadButton from '../../common/buttons/download-btn/DownloadButton';

const GenerationResult = ({image}: {image: generatedImageItem}) => {

    const {mobxStore} = useContext(Context);
    const userId = mobxStore.userId;

    return(
        <div className="generation-result">
            <div className="generation-result__inner">
                <div className="generation-result__img-container">
                    <img 
                        src={image.path ? image.path : undefined} 
                        alt={image.name ? image.name : undefined}
                        className='generation-result__img'
                    />
                </div>
                <div className="generation-result__action-btns">
                    <div className="generation-result__action-btns-inner">
                        <AddToFavouritesButton imgInfo={
                            {
                                userId, 
                                image, 
                            }}
                        />
                        <GoToButton urlPath={urlPaths.favourites} text='Go to favourites'/>
                        <DownloadButton 
                            imgsToDownload={[
                                {
                                    name: image.name!,
                                    url: image.path!
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