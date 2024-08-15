import { Dispatch, SetStateAction, useState } from 'react';
import './imgGeneration.scss';
import Textarea from '../../../common/textarea/Textarea';
import ModelsContainer from '../../modelsContainer/ModelsContainer';
import Switcher from '../../../common/switcher/Switcher';
import { ImageGenerationServiceModel } from '../../../../types/services/imageGeneration';
import { modelSelects } from '../../../../utilities/generatorOptions';
import { useDispatch } from 'react-redux';
import { switchers } from '../../../../types/reducers';
import { setIsImgToImgModeEnabled, setIsOptionsShown, setIsSavingHistoryEnabled } from '../../../../store/reduxReducers/switcherReducer';
import { CurrentServiceModel} from '../../../../types/services/commonServices';
import ImgGenerationOptions from '../../servicesOptions/ImgGenerationOptions/ImgGenerationOptions';
import { ImageItem } from '../../../../types/typesCommon';
import { scrollToGenerationResult } from '../../../../utilities/functions/common';
import { ApiImageGeneration } from '../../../../api/StableDiffustion/Api.ImgGeneration';
import { uploadGenerationHistoryItem, uploadImageToStorage } from '../../../../utilities/functions/uploadingToFirebase';
import { createImageItemInfo } from '../../../../utilities/functions/images';
import { ImageGenerationItem, ImageGenerationOptions } from '../../../../interface/services/imageGeneration';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

const ImgGeneration = (
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

    const [imgGenerationModel, setImgGenerationModel] = useState<CurrentServiceModel>(`ultra`);

    const [imageGenerationOptions, setImageGenerationOptions] = useState<ImageGenerationOptions>({
        output_format: `png`,
    });

    const payload: ImageGenerationItem = {
        prompt,
        ...imageGenerationOptions
    };

    const subbmitForm = async (event: React.FormEvent) => {
        event.preventDefault();

        dispatch(isLoadingReducer.isLoadingAction(true));

        scrollToGenerationResult();

        try {
            let response: string | { name: string; errors: string[]; } | undefined = undefined;

            response = await ApiImageGeneration.getGeneratedImage(payload, `ultra`, mobxStore.apiKey);

            const imgItemInfo = createImageItemInfo(prompt, imageGenerationOptions.output_format);

            const imageItem: ImageItem = {
                ...imgItemInfo,
                prompt,
                format: imageGenerationOptions.output_format,
                url: response as string,
            };

            setImageItem(imageItem);

            uploadImageToStorage(mobxStore.userId, imgItemInfo.id, response as string, prompt, imageGenerationOptions.output_format);

            if (switchersStates.isSavingHistoryEnabled) uploadGenerationHistoryItem(mobxStore.userId, imageItem, imageGenerationOptions);

        } catch (error) {
            console.log(error);
        } finally {
            setImageGenerationOptions({output_format: `png`});
            dispatch(isLoadingReducer.isLoadingAction(false));
        };
    };

    return (
        <div className='img-generation'>
            <div className="img-generation__inner">
                <form 
                    action="submit" 
                    className="img-generation__form" 
                    onSubmit={(e) => subbmitForm(e)}
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
                        serviceModelOption={imgGenerationModel}
                        setServiceModelOption={setImgGenerationModel}                    
                        isImgToImgModeEnabled={switchersStates.isImgToImgModeEnabled} 
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
                        <Switcher
                            headline="Image to Image mode"
                            value={switchersStates.isImgToImgModeEnabled}
                            setValue={setIsImgToImgModeEnabled}
                        />
                    </div>
                    {switchersStates.isOptionsShown && 
                        <ImgGenerationOptions 
                            setOptions={setImageGenerationOptions} 
                            serviceModelOptionModel={imgGenerationModel as ImageGenerationServiceModel} 
                            isImgToImgModeEnabled={switchersStates.isImgToImgModeEnabled}
                        />
                    }
                    <div className="service-container__btn-container">
                        <button 
                            type="submit" 
                            disabled={isLoadingReducer.isLoadingState} 
                            className={`service-container__btn-container-btn ${isLoadingReducer.isLoadingState ? 'disabled' : ''}`}
                            title="Generate"
                        >Generate</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ImgGeneration;