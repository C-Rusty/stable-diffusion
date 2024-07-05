import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from 'react';
import { GenModelsValue, GenerationHistoryItemType, UploadImgProps, generatedImageItem } from '../../../types/typesCommon';
import { SDModelParams } from '../../../types/typesV2Model';
import ModelV2Selects from '../ModelV2Selects/ModelV2Selects';
import './generatorOptions.scss';
import { Context } from '../../app/App';
import { apiStableDiffusion } from '../../../api/Api.SD.TextToImage';
import Models from '../../models/Models';
import Switcher from '../../common/switcher/Switcher';
import { ApiFirebaseStore } from '../../../api/Api.Firebase.Store';
import { apiFirebaseStorage } from '../../../api/Api.Firebase.Storage';

const GeneratorOptions = (
    {setIsLoading, setImage} 
    : 
    {
        setIsLoading: Dispatch<SetStateAction<boolean>>,
        setImage: Dispatch<SetStateAction<generatedImageItem>>
    }
) => {

    const {mobxStore} = useContext(Context);
    const apiKey = mobxStore.SDApiKey;
    const userId = mobxStore.userId;

    const prompt = useRef<HTMLTextAreaElement | null>(null);
    const [genModel, setGenModel] = useState<GenModelsValue>(`ultra`);
    const [options, setOptions] = useState<SDModelParams | {}>({});
    const [isOptionsShown, setIsOptionsShown] = useState<boolean>(false);
    const [isGenerationHistorySavingOptionEnabled, setIsGenerationHistorySavingOptionEnabled] = useState<boolean>(true);

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const promptValue = prompt.current?.value;

        if (!promptValue) {
            return console.log(`Prompt is empty. ${promptValue}`);
        };

        if (!apiKey) {
            return console.log(`API key is empty. ${apiKey}`);
        };

        if (!userId) {
            return console.log(`userId is empty. ${userId}`);
        };

        try {
            const imgGenResultBlock = document.querySelector('.generation-result');
            imgGenResultBlock?.scrollIntoView({behavior: 'smooth'});
            
            setIsLoading(true);

            let response: string | { name: string; errors: string[]; } | undefined = undefined;
            const timestamp: string = new Date().getTime().toString();

            const selectedOptions = options as SDModelParams;

            response = await apiStableDiffusion.getImage(promptValue, selectedOptions, genModel, apiKey);
            
            if (!response) console.log(`Something went wrong with request: ${response}`);

            setImage({
                path: response as string,
                name: promptValue,
                format: selectedOptions.output_format,
                timestamp,
            });

            convertImgToBlob(response as string);

            if (isGenerationHistorySavingOptionEnabled) {

                const generationHistoryItem: GenerationHistoryItemType = {
                    userId,
                    prompt: promptValue,
                    options: options as SDModelParams,
                    timestamp,
                    isFavourite: false,
                };

                ApiFirebaseStore.uploadGenerationHistoryItem(generationHistoryItem);
            };
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        };
    };

    const uploadImageToStorage = async () => {
        const optionsV2 = options as SDModelParams;

        const imgItemToUpload: UploadImgProps = {
            userId: userId,
            base64String: base64Img,
            imgName: `${prompt.current!.value.split(` `).join(`_`)}.${optionsV2.output_format}`,
        };

        await apiFirebaseStorage.uploadImages(imgItemToUpload);
    };

    useEffect(() => {
        uploadImageToStorage();
    }, [base64Img]);

    return(
        <form 
            action="submit"
            method='POST'
            className="generator-options"
            onSubmit={(e) => handleSubmit(e)}
        >
            <textarea 
                name="input" 
                id="generate-image-prompt"
                placeholder='Image description'
                className="generator-options__prompt"
                required={true} 
                rows={1}
                ref={prompt} 
            />
            <div className="generator-options__model-select">
                <span className='generator-options__model-select-headline'>
                    Select Model
                </span>
                <div className="generator-options__model-select-main">
                    <Models setGenModel={setGenModel} />
                </div>
            </div>
            <div className="generator-options__options-switcher">
                <div className="generator-options__options-switcher-item">
                    <p className='headline'>Show options (advanced)</p>
                    <Switcher 
                        value={isOptionsShown}
                        setValue={setIsOptionsShown}
                    />
                </div>
                <div className="generator-options__options-switcher-item">
                    <p className='headline'>Save image and options to history</p>
                    <Switcher 
                        value={isGenerationHistorySavingOptionEnabled}
                        setValue={setIsGenerationHistorySavingOptionEnabled}
                    />
                </div>
            </div>
            {isOptionsShown && 
                <div className="generator-options__options-container">
                    <ModelV2Selects  
                        setData={setOptions as Dispatch<SetStateAction<SDModelParams | {}>>}
                    />
                </div>
            } 
            <div className="generator-options__btn-container">
                <button 
                    type="submit" 
                    className='generator-options__button'
                >Generate Image</button>
            </div>
        </form>
    );
};

export default GeneratorOptions;