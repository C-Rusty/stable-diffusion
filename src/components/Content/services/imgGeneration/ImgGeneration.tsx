import { Dispatch, SetStateAction, useState } from 'react';
import './imgGeneration.scss';
import Textarea from '../../../common/textarea/Textarea';
import ModelsContainer from '../../modelsContainer/ModelsContainer';
import { ImageGenerationServiceModel } from '../../../../types/services/imageGeneration';
import { modelSelects } from '../../../../utilities/generatorOptions';
import { useDispatch, useSelector } from 'react-redux';
import { switchers } from '../../../../types/reducers';
import { CurrentServiceModel, ServiceType} from '../../../../types/services/commonServices';
import ImgGenerationOptions from '../../servicesOptions/ImgGenerationOptions/ImgGenerationOptions';
import { resetGeneratorFields, scrollToBlock } from '../../../../utilities/functions/common';
import { ApiImageGeneration } from '../../../../api/StableDiffustion/Api.ImgGeneration';
import { uploadGenerationHistoryItem, uploadImageToStorage } from '../../../../utilities/functions/uploadingToFirebase';
import { createImageItemInfo, getImgFromResponse } from '../../../../utilities/functions/images';
import SubmitBtn from '../../../common/buttons/submit-btn/SubmitBtn';
import InputFile from '../../../common/input-file/InputFile';
import { RootState } from '../../../../store/reduxStore';
import { IGenResultItem, IGenImageItem } from '../../../../interface/items/imgItems';
import { ImageGenerationOptions, ImageGenerationItem } from '../../../../interface/sd-request/imageGeneration';
import SwitchersContainer from '../../../common/switchersContainer/SwitchersContainer';
import { setIsLoading } from '../../../../store/reduxReducers/commonsReducer';

const ImgGeneration = (
    {
        setImageItem,
        switchersStates,
        mobxStore,
    }
    :
    {
        setImageItem: Dispatch<SetStateAction<IGenResultItem>>,
        switchersStates: switchers,
        mobxStore: {apiKey: string, userId: string},
    }) => {

    const currentService = useSelector<RootState, ServiceType>(state => state.service.currentService);
    const dispatch = useDispatch();

    const { promptProps, fileInputProps } = modelSelects;

    const [prompt, setPrompt] = useState<string>(promptProps.value);
    const [image, setImage] = useState<Blob | null>(null);

    const [imgGenerationModel, setImgGenerationModel] = useState<CurrentServiceModel>(`ultra`);

    const [imageGenerationOptions, setImageGenerationOptions] = useState<ImageGenerationOptions>({
        output_format: `png`,
    });

    const payload: ImageGenerationItem = switchersStates.isImgToImgModeEnabled ? 
    { prompt, image, ...imageGenerationOptions} 
    : 
    { prompt, ...imageGenerationOptions };

    const subbmitForm = async (event: React.FormEvent) => {
        event.preventDefault();

        dispatch(setIsLoading(true));
        scrollToBlock(document.querySelector(`.generation-result`) as HTMLElement);

        try {
            let response: string | { name: string; errors: string[]; } | undefined = undefined;

            response = await ApiImageGeneration.getGeneratedImage(payload, imgGenerationModel as ImageGenerationServiceModel, mobxStore.apiKey);

            const imgItemInfo = createImageItemInfo(prompt, imageGenerationOptions.output_format);
            
            const imageItem: IGenImageItem = {
                ...imgItemInfo,
                prompt,
                format: imageGenerationOptions.output_format,
                itemUrl: response as string,
                uploadedImage: image ? getImgFromResponse(image as unknown as string, imageGenerationOptions.output_format) : null,
            };

            setImageItem(imageItem);

            if (switchersStates.isSavingHistoryEnabled) {
                uploadImageToStorage(mobxStore.userId, imgItemInfo.id, response as string, prompt, imageGenerationOptions.output_format);
                uploadGenerationHistoryItem(mobxStore.userId, {generalInfo: imageItem, options: imageGenerationOptions, serviceInfo: {service: currentService, serviceModel: imgGenerationModel}});
            };

        } catch (error) {
            console.log(error);
        } finally {
            dispatch(setIsLoading(false));
            resetGeneratorFields(setPrompt, setImage);
            setImageGenerationOptions({output_format: `png`});
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
                    <div className="img-generation__mandatory-fields">
                        <Textarea
                            {...promptProps}
                            required={true}
                            value={prompt}
                            setValue={setPrompt}
                            className={`mandatory-field`}
                        />
                    {switchersStates.isImgToImgModeEnabled && (imgGenerationModel === `sd3-large-turbo` || imgGenerationModel === `sd3-large` || imgGenerationModel === `sd3-medium`) &&
                        <InputFile 
                            {...fileInputProps}
                            required={true}
                            image={image}
                            setImage={setImage}
                        />
                    }
                    </div>
                    <ModelsContainer 
                        serviceModelOption={imgGenerationModel}
                        setServiceModelOption={setImgGenerationModel}                    
                        isImgToImgModeEnabled={switchersStates.isImgToImgModeEnabled} 
                    />
                    <SwitchersContainer/>
                    {switchersStates.isOptionsShown && 
                        <ImgGenerationOptions 
                            setOptions={setImageGenerationOptions} 
                            serviceModelOptionModel={imgGenerationModel as ImageGenerationServiceModel} 
                            isImgToImgModeEnabled={switchersStates.isImgToImgModeEnabled}
                        />
                    }
                    <SubmitBtn text='Generate'/>
                </form>
            </div>
        </div>
    );
};

export default ImgGeneration;