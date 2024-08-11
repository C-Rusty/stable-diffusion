import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { modelSelects } from "../../../utilities/generatorOptions";
import Textarea from "../../common/textarea/Textarea";
import ModelsContainer from "../modelsContainer/ModelsContainer";
import { ImageItem, ServiceType, UpscaleServiceModel } from "../../../types/typesCommon";
import { CurrentServiceModel, CurrentServiceModelOptions } from "../../../types/services/commonServices";
import Switcher from "../../common/switcher/Switcher";
import ServiceOptions from "../serviceOptions/ServiceOptions";
import './serviceContainer.scss';
import { Context } from "../../app/App";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../../../store/reduxReducers/isLoadingReducer";
import { ImageGenerationServiceOptions } from "../../../types/services/imageGeneration";
import { RootState } from "../../../store/reduxStore";
import { createImageId } from "../../../utilities/functions/images";
import { createImgStoragePath } from "../../../utilities/functions/storagePaths";
import { ApiImageGeneration } from "../../../api/StableDiffustion/Api.ImgGeneration";
import { ApiImgUpscale } from "../../../api/StableDiffustion/Api.ImgUpscale";
import { ImageUpscaleModelOptions } from "../../../types/services/imageUpscale";
import { uploadGenerationHistoryItem, uploadImageToStorage } from "../../../utilities/functions/uploadingToFirebase";

const ServiceContainer = (
    {
        activeService, 
        setImage
    }
    :
    {
        activeService: ServiceType,
        setImage: Dispatch<SetStateAction<ImageItem>>
    }) => {

    const { promptProps } = modelSelects;

    const dispatch = useDispatch();
    const isLoading = useSelector<RootState, boolean>((state) => state.isLoading.isLoading);

    const [prompt, setPrompt] = useState<string>(``);
    const [serviceModelOptionModel, setServiceModelOptionModel] = useState<CurrentServiceModel>(`ultra`);

    const [serviceModelOptions, setServiceModelOptions] = useState<CurrentServiceModelOptions>({
        output_format: `png`,
    });

    const [isOptionsShown, setIsOptionsShown] = useState<boolean>(false);
    const [isGenerationHistorySavingOptionEnabled, setIsGenerationHistorySavingOptionEnabled] = useState<boolean>(true);
    const [isImgToImgModeEnabled, setIsImgToImgModeEnabled] = useState<boolean>(false);

    const {mobxStore} = useContext(Context);
    const apiKey = mobxStore.SDApiKey;
    const userId = mobxStore.userId;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        dispatch(setIsLoading(true));
        
        const imgGenResultBlock = document.querySelector('.generation-result');
        imgGenResultBlock?.scrollIntoView({behavior: 'smooth'});

        if (!apiKey && !userId) {
            return console.log(`API key or userId is empty. ${apiKey} ${userId}`);
        };

        if (!prompt) return console.log(`Prompt is empty. ${prompt}`);

        let response: string | { name: string; errors: string[]; } | undefined = undefined;

        if (activeService !== `Video Generator`) {

            try {
                switch (activeService) {
                    case `Image Generator`:
                        response = await ApiImageGeneration.getGeneratedImage(prompt, serviceModelOptions as ImageGenerationServiceOptions, serviceModelOptionModel, apiKey!);
                    break;

                    case `Upscale Image`:
                        response = await ApiImgUpscale.getUpscaledImage({...serviceModelOptions as ImageUpscaleModelOptions, prompt}, serviceModelOptionModel as UpscaleServiceModel, apiKey!);
                    break;
    
                    case `Edit Image`:

                    break;

                    case `Precise Image Edit`:
                        
                    break;
    
                    default: console.log(`activeService error: ${activeService}`); break;
                };
            } catch (error) {
                return console.log(`error when getting submit response in ServiceContainer:`, error);
            };

            console.log(`response in ServiceContainer:`, response);

            const timestamp: string = new Date().getTime().toString();
            const imageId = createImageId();
            const storagePath = createImgStoragePath(imageId, prompt, serviceModelOptions.output_format);

            const imageItem: ImageItem = {
                id: imageId,
                prompt: prompt.trim(),
                format: serviceModelOptions.output_format,
                url: response as string,
                storagePath: storagePath,
                timestamp
            };

            console.log(`imageItem:`, imageItem);

            setImage(imageItem);

            uploadImageToStorage(userId!, imageId, response as string, prompt, serviceModelOptions.output_format);

            if (isGenerationHistorySavingOptionEnabled) uploadGenerationHistoryItem(userId!, imageItem, serviceModelOptions as CurrentServiceModelOptions);

            setServiceModelOptions({output_format: `png`});
        };

        dispatch(setIsLoading(false));
    };

    useEffect(() => {
        setServiceModelOptions({output_format: `png`});
    }, [activeService, serviceModelOptionModel]);

    useEffect(() => {
        // console.log(`propmpt:`, prompt);
        // console.log(`serviceModelOptions:`, serviceModelOptions);
        // console.log(`serviceModelOptionModel:`, serviceModelOptionModel);
    }, [prompt, serviceModelOptionModel, serviceModelOptions]);

    return (
        <div className="service-container">
            <div className="service-container__inner">
                <form 
                    className="service-container__form" 
                    action="submit" 
                    method="POST"
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <Textarea
                        {...promptProps}
                        value={prompt}
                        setValue={setPrompt}
                    />
                    <ModelsContainer 
                        activeService={activeService} 
                        serviceModelOption={serviceModelOptionModel}
                        setServiceModelOption={setServiceModelOptionModel} 
                        isImgToImgModeEnabled={isImgToImgModeEnabled}
                    />
                    <div className="service-container__switchers">
                        <Switcher
                            headline="Show options"
                            value={isOptionsShown}
                            setValue={setIsOptionsShown}
                        />
                        <Switcher
                            headline="Save generation history"
                            value={isGenerationHistorySavingOptionEnabled}
                            setValue={setIsGenerationHistorySavingOptionEnabled}
                        />
                        {activeService === `Image Generator` &&
                            <Switcher
                                headline="Image to Image mode"
                                value={isImgToImgModeEnabled}
                                setValue={setIsImgToImgModeEnabled}
                            />
                        }
                    </div>
                    {isOptionsShown && 
                        <ServiceOptions
                            activeService={activeService}
                            serviceModelOptionModel={serviceModelOptionModel}
                            setServiceModelOptions={setServiceModelOptions}
                            isImgToImgModeEnabled={isImgToImgModeEnabled}
                        />
                    }
                    <div className="service-container__btn-container">
                        <button 
                            type="submit" 
                            disabled={!prompt} 
                            className={`service-container__btn-container-btn ${!prompt || isLoading ? 'disabled' : ''}`}
                            title={`${prompt ? 'Generate' : 'Prompt is required'}`}
                        >Generate</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ServiceContainer;