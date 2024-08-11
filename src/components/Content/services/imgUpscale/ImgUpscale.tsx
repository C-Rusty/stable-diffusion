import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { upscaleServicesOptions } from '../../../../utilities/operatorOptions';
import { Context } from '../../../app/App';
import { ImageItem } from '../../../../types/typesCommon';
import { ImageUpscaleModelOptions, UpscaleServiceModel } from '../../../../types/services/imageUpscale';
import { createImgStoragePath } from '../../../../utilities/functions/storagePaths';
import { createImageId } from '../../../../utilities/functions/images';
import { filterOptionsFromEmptyValues } from '../../../../utilities/functions/modelOptions';
import { ApiImgUpscale } from '../../../../api/StableDiffustion/Api.ImgUpscale';

const ImgUpscale = (
    {setIsLoading, setImage} 
    :
    {
        setIsLoading: Dispatch<SetStateAction<boolean>>,
        setImage: Dispatch<SetStateAction<ImageItem>>}
    ) => {

    const {mobxStore} = useContext(Context);
    const apiKey = mobxStore.SDApiKey;

    const [upscaleModel, setUpscaleModel] = useState<UpscaleServiceModel>(`conservative`);
    const [upsacleOptions, setUpsacleOptions] = useState<ImageUpscaleModelOptions | {}>({});

    const submitUpscaleForm = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!upsacleOptions) return console.log(`Upscale options is empty.`);

        const clearedFromEmptyValuesOptions: ImageUpscaleModelOptions = filterOptionsFromEmptyValues(upsacleOptions);

        setIsLoading(true);

        try {
            const response = await ApiImgUpscale.getUpscaledImage(clearedFromEmptyValuesOptions, upscaleModel, apiKey!);

            const { prompt, output_format } = clearedFromEmptyValuesOptions;

            if (response) {
                console.log(response);

                const timestamp: string = new Date().getTime().toString();
                const id = createImageId();
                const storagePath = createImgStoragePath(id, prompt, `png`);
            }
        } catch (error) {
            
        } finally {
            setIsLoading(false);
        };
    };

    return(
        <div className='img-upscale'>
            <div className="img-upscale__inner">
                <form action="submit" method="post" onSubmit={(event) => submitUpscaleForm(event)} className='img-upscale__form'>
                    <div className="img-upscale__form-services-btns">
                        {upscaleServicesOptions.map((option) => (
                            <button 
                                type='button' 
                                className={`img-upscale__form-services-btns-btn ${upscaleModel === option ? 'active' : ''}`}
                                onClick={() => setUpscaleModel(option)}
                                key={option}
                                value={option}
                                name={option}
                            >{option} mode</button>
                        ))}
                    </div>
                    {/* <ImgUpscaleOptions setUpsacleOptions={setUpsacleOptions}/> */}
                    <div className="img-upscale__form-btn-container">
                        <button 
                            type="submit" 
                            className='img-upscale__form-btn'
                        >Upscale Image</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ImgUpscale;