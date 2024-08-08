import { act, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { modelSelects } from "../../../utilities/generatorOptions";
import Textarea from "../../common/textarea/Textarea";
import ModelsContainer from "../modelsContainer/ModelsContainer";
import { ImageItem, ServiceType } from "../../../types/typesCommon";
import { CurrentServiceModel, CurrentServiceModelOptions } from "../../../types/services/commonServices";
import Switcher from "../../common/switcher/Switcher";
import ServiceOptions from "../serviceOptions/ServiceOptions";
import './serviceContainer.scss';
import { Context } from "../../app/App";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../../../store/reduxReducers/isLoadingReducer";
import { apiStableDiffusion } from "../../../api/Api.StableDiffusion";
import { createImageId, createImgStoragePath } from "../../../utilities/functions";
import { ImageGenerationServiceOptions } from "../../../types/services/imageGeneration";
import { ImageToVideoGenerationServiceOptions } from "../../../types/services/imageToVideoGeneration";

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

    const [prompt, setPrompt] = useState<string>(``);
    const [serviceModelOptionModel, setServiceModelOptionModel] = useState<CurrentServiceModel>(`ultra`);

    const [serviceModelOptions, setServiceModelOptions] = useState<CurrentServiceModelOptions | undefined>(undefined);

    const [isOptionsShown, setIsOptionsShown] = useState<boolean>(false);
    const [isGenerationHistorySavingOptionEnabled, setIsGenerationHistorySavingOptionEnabled] = useState<boolean>(true);
    const [isImgToImgModeEnabled, setIsImgToImgModeEnabled] = useState<boolean>(false);

    const {mobxStore} = useContext(Context);
    const apiKey = mobxStore.SDApiKey;
    const userId = mobxStore.userId;

    const [base64Img, setBase64Img] = useState<string>('');

    const convertImgToBlob = async (img: string) => {
        const base = await (fetch(img));
        
        const blob = await base.blob();
    
        const reader = new FileReader();
    
        reader.readAsDataURL(blob);
    
        reader.onloadend = () => {
            setBase64Img(reader.result as string);
        };
    };

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
            const {output_format} = serviceModelOptions as Exclude<CurrentServiceModelOptions, 
            ImageToVideoGenerationServiceOptions>;

            console.log(`output_format:`, output_format);
            
            switch (activeService) {
                case `Image Generator`:
                    response = await apiStableDiffusion.getGeneratedImage(prompt, serviceModelOptions as ImageGenerationServiceOptions, serviceModelOptionModel, apiKey!);

                    if (!response) console.log(`Something went wrong with request: ${response}`);
                    
                break;

                case `Edit Image`:
                    
                break;
                case `Precise Image Edit`:
                    
                break;
                case `Upscale Image`:
                    
                break;

                default: console.log(`activeService error: ${activeService}`); break;
            };

            const timestamp: string = new Date().getTime().toString();
            const id = createImageId();
            const storagePath = createImgStoragePath(id, prompt, output_format);

            const imageItem: ImageItem = {
                id: id,
                prompt: prompt,
                format: output_format,
                url: response as string,
                storagePath: storagePath,
                timestamp
            };

            setImage(imageItem);
        };

        try {


            
        } catch (error) {
            console.log(`error when submit:`, error);
        } finally {
            dispatch(setIsLoading(false));
        };
    };

    useEffect(() => {
        console.log(`propmpt:`, prompt);
        console.log(`serviceModelOptions:`, serviceModelOptions);
        console.log(`serviceModelOptionModel:`, serviceModelOptionModel);
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
                        <Switcher
                            headline="Imgage to Image mode"
                            value={isImgToImgModeEnabled}
                            setValue={setIsImgToImgModeEnabled}
                        />
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
                            className={`service-container__btn-container-btn ${!prompt ? 'disabled' : ''}`}
                            aria-label={`Generate ${activeService}`}
                            title={`${prompt ? 'Generate' : 'Prompt is required'}`}
                        >Generate</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ServiceContainer;