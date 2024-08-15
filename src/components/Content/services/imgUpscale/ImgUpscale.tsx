import { Dispatch, SetStateAction, useState } from 'react';
import { ImageItem } from '../../../../types/typesCommon';
import { createImageItemInfo } from '../../../../utilities/functions/images';
import { ApiImgUpscale } from '../../../../api/StableDiffustion/Api.ImgUpscale';
import { switchers } from '../../../../types/reducers';
import { useDispatch } from 'react-redux';
import ImgUpscaleOptions from '../../servicesOptions/ImgUpscaleOptions/ImgUpscaleOptions';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { ImageUpscaleItem, ImageUpscaleModelOptions } from '../../../../interface/services/imageUpscale';
import { modelSelects } from '../../../../utilities/generatorOptions';
import Textarea from '../../../common/textarea/Textarea';
import ModelsContainer from '../../modelsContainer/ModelsContainer';
import { CurrentServiceModel } from '../../../../types/services/commonServices';
import Switcher from '../../../common/switcher/Switcher';
import { setIsOptionsShown, setIsSavingHistoryEnabled } from '../../../../store/reduxReducers/switcherReducer';
import { UpscaleServiceModel } from '../../../../types/services/imageUpscale';
import { uploadGenerationHistoryItem, uploadImageToStorage } from '../../../../utilities/functions/uploadingToFirebase';

const ImgUpscale = (
    {
        setImageItem,
        switchersStates,
        mobxStore,
        isLoadingReducer
    } 
    :
    {
        setImageItem: Dispatch<SetStateAction<ImageItem>>,
        switchersStates: switchers,
        mobxStore: {apiKey: string, userId: string},
        isLoadingReducer: {
            isLoadingState: boolean,
            isLoadingAction: ActionCreatorWithPayload<boolean, string>
        }
    }) => {

    const dispatch = useDispatch();

    const [prompt, setPrompt] = useState<string>(``);

    const { promptProps } = modelSelects;

    const [upscaleModel, setUpscaleModel] = useState<CurrentServiceModel>(`conservative`);
    const [upsacleOptions, setUpsacleOptions] = useState<ImageUpscaleModelOptions>({
        output_format: `png`,
        image: new Blob(),
    });

    const payload: ImageUpscaleItem = {
        prompt,
        ...upsacleOptions
    };

    const submitUpscaleForm = async (event: React.FormEvent) => {
        event.preventDefault();

        dispatch(isLoadingReducer.isLoadingAction(true));

        try {
            const response = await ApiImgUpscale.getUpscaledImage(payload, upscaleModel as UpscaleServiceModel, mobxStore.userId);

            if (response) {
                const imgItemInfo = createImageItemInfo(prompt, upsacleOptions.output_format);

                const imageItem: ImageItem = {
                    ...imgItemInfo,
                    prompt,
                    format: upsacleOptions.output_format,
                    url: response as string,
                };

                setImageItem(imageItem);

                uploadImageToStorage(mobxStore.userId, imgItemInfo.id, response as string, prompt, upsacleOptions.output_format);

                if (switchersStates.isSavingHistoryEnabled) uploadGenerationHistoryItem(mobxStore.userId, imageItem, upsacleOptions);
            };
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(isLoadingReducer.isLoadingAction(false));
        };
    };

    return(
        <div className='img-upscale'>
            <div className="img-upscale__inner">
                <form 
                    action="submit" 
                    method="post" 
                    onSubmit={(event) => submitUpscaleForm(event)} 
                    className='img-upscale__form'
                >
                    <div className="img-upscale__mandatory-fields">
                        <Textarea
                            {...promptProps}
                            isRequired={true}
                            value={prompt}
                            setValue={setPrompt}
                        />
                    </div>
                    <ModelsContainer 
                        serviceModelOption={upscaleModel}
                        setServiceModelOption={setUpscaleModel}                    
                    />
                    <div className="service-container__switchers">
                        <Switcher
                            headline="Show options"
                            value={switchersStates.isOptionsShown}
                            setValue={setIsOptionsShown}
                        />
                        <Switcher
                            headline="Save generation history"
                            value={switchersStates.isSavingHistoryEnabled}
                            setValue={setIsSavingHistoryEnabled}
                        />
                    </div>
                    {switchersStates.isOptionsShown && 
                        <ImgUpscaleOptions 
                            setOptions={setUpsacleOptions}
                            upscaleModel={upscaleModel as UpscaleServiceModel}
                        />
                    }
                    <div className="img-upscale__form-btn-container">
                        <button 
                                type="submit" 
                                disabled={isLoadingReducer.isLoadingState} 
                                className={`service-container__btn-container-btn ${isLoadingReducer.isLoadingState ? 'disabled' : ''}`}
                                title="Generate"
                        >Upscale</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ImgUpscale;