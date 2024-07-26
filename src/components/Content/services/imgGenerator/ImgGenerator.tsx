import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from 'react';
import { GenModelsValue, generationHistoryItem, ImageItem, UploadImgProps } from '../../../../types/typesCommon';
import ModelV2Selects from '../../servicesOptions/ImgGenerationOptions/ImgGenerationOptions';
import './imgGenerator.scss';
import { Context } from '../../../app/App';
import { apiStableDiffusion } from '../../../../api/Api.StableDiffusion';
import Models from '../../../models/Models';
import Switcher from '../../../common/switcher/Switcher';
import { ApiFirebaseStore } from '../../../../api/Api.Firebase.Store';
import { apiFirebaseStorage } from '../../../../api/Api.Firebase.Storage';
import { createImageId, createImgStoragePath } from '../../../../utilities/functions';
import { SDModelParams } from '../../../../types/models';

const ImgGenerator = (
    {setIsLoading, setImage} 
    : 
    {
        setIsLoading: Dispatch<SetStateAction<boolean>>,
        setImage: Dispatch<SetStateAction<ImageItem>>
    }
) => {

    const {mobxStore} = useContext(Context);
    const apiKey = mobxStore.SDApiKey;
    const userId = mobxStore.userId;

    const [id, setId] = useState<string | undefined>(undefined);
    const prompt = useRef<HTMLTextAreaElement | null>(null);
    const [genModel, setGenModel] = useState<GenModelsValue>(`ultra`);
    const [options, setOptions] = useState<SDModelParams | undefined>(undefined);
    const [isOptionsShown, setIsOptionsShown] = useState<boolean>(false);
    const [storagePath, setStoragePath] = useState<string | undefined>(undefined);

    const [isGenerationHistorySavingOptionEnabled, setIsGenerationHistorySavingOptionEnabled] = useState<boolean>(true);
    const [isImgToImgModeEnabled, setIsImgToImgModeEnabled] = useState<boolean>(false);

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

        const promptValue = prompt.current?.value.trim();

        if (!promptValue) {
            return console.log(`Prompt is empty. ${promptValue}`);
        };

        if (!apiKey) {
            return console.log(`API key is empty. ${apiKey}`);
        };
        if (!options) return console.log(`Options is empty. ${options}`);

        if (!userId) {
            return console.log(`userId is empty. ${userId}`);
        };

        try {
            const imgGenResultBlock = document.querySelector('.generation-result');
            imgGenResultBlock?.scrollIntoView({behavior: 'smooth'});
            
            setIsLoading(true);

            let response: string | { name: string; errors: string[]; } | undefined = undefined;

            response = await apiStableDiffusion.getImage(promptValue, options, genModel, apiKey);
            
            if (!response) console.log(`Something went wrong with request: ${response}`);

            const timestamp: string = new Date().getTime().toString();
            const id = createImageId();
            const storagePath = createImgStoragePath(id, promptValue, options.output_format);

            setValuesForImageUpload(response as string, id, storagePath);

            const imageItem: ImageItem = {
                id: id,
                prompt: promptValue,
                format: options.output_format,
                url: response as string,
                storagePath: storagePath,
                timestamp
            };

            setImage(imageItem);

            if (isGenerationHistorySavingOptionEnabled) {

                if (options.image) options.image = URL.createObjectURL(options.image as Blob);

                const generationHistoryItem: generationHistoryItem = {
                    generalInfo: imageItem,
                    options: options,
                    isFavourite: false,
                };

                ApiFirebaseStore.uploadGenerationHistoryItem(userId, generationHistoryItem);
            };
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        };
    };

    const setValuesForImageUpload = (response: string, id: string, storagePath: string) => {
        convertImgToBlob(response as string);
        setId(id);
        setStoragePath(storagePath);
    };

    const uploadImageToStorage = async () => {

        if (!options) return console.log(`Options is empty. ${options}`);

        const imgItemToUpload: UploadImgProps = {
            userId: userId,
            base64String: base64Img,
            imgName: `${id}.${prompt.current!.value.split(` `).join(`_`)}.${options.output_format}`,
        };

        await apiFirebaseStorage.uploadImages(imgItemToUpload);
    };

    useEffect(() => {
        if (base64Img && id && storagePath) uploadImageToStorage();
    }, [setValuesForImageUpload]);

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
            {/* <div className="generator-options__options-switcher">
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
                {genModel.includes(`sd3`) &&
                    <div className="generator-options__options-switcher-item">
                        <p className='headline'>Img-to-img mode</p>
                        <Switcher 
                            value={isImgToImgModeEnabled}
                            setValue={setIsImgToImgModeEnabled}
                        />
                    </div>
                }
            </div> */}
            {isOptionsShown && 
                <div className="generator-options__options-container">
                    <ModelV2Selects  
                        setOptions={setOptions as Dispatch<SetStateAction<SDModelParams | {}>>}
                        genModel={genModel}
                        isImgToImgModeEnabled={isImgToImgModeEnabled}
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

export default ImgGenerator;