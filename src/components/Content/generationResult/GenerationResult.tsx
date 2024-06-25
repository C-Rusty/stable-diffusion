import { useContext, useEffect, useState } from 'react';
import './generationResult.scss';
import { Context } from '../../app/App';
import { urlPaths } from '../../../routes/urlPaths';
import { ImageProps } from '../../../types/typesCommon';
import UploadImgButton from '../../common/upload-img-btn/UploadImgButton';
import GoToButton from '../../common/go-to-btn/GoToButton';
import DownloadButton from '../../common/download-btn/DownloadButton';

const GenerationResult = ({imageProps}: {imageProps: ImageProps}) => {

    const {mobxStore} = useContext(Context);
    const userId = mobxStore.userId;

    const [base64String, setBase64String] = useState<string | null>(null);

    const convertImgToBlob = async (img: string) => {
        const base = await (fetch(img));
        
        const blob = await base.blob();

        const reader = new FileReader();

        reader.onloadend = () => {
            setBase64String(reader.result as string);
        };
        reader.readAsDataURL(blob);
    };

    useEffect(() => {
        if (imageProps.generatedImage) {
            convertImgToBlob(imageProps.generatedImage);
        };
    }, [imageProps.generatedImage]);

    return(
        <div className="generation-result">
            <div className="generation-result__inner">

                <div className="generation-result__img-container">
                    <img 
                        src={imageProps.generatedImage ? imageProps.generatedImage : undefined} 
                        alt={imageProps.imgName ? imageProps.imgName : undefined}
                        className='generation-result__img'
                    />
                </div>
                <div className="generation-result__action-btns">
                    <div className="generation-result__action-btns-inner">
                        <UploadImgButton imgInfo={{base64String, userId, imageProps}}/>
                        <GoToButton urlPath={urlPaths.gallery}/>
                        <DownloadButton currentImg={{
                            name: imageProps.imgName!,
                            url: imageProps.generatedImage!
                        }}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenerationResult;