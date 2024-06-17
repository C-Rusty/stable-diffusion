import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from 'react';
import { generatorCommonPropsForSelect } from '../../../utilities/ModelProps/GeneralPropsForSelect';
import { GenModelsValue, ImageProps } from '../../../types/typesCommon';
import { ApiV2ModelParams } from '../../../types/typesV2Model';
import { ApiV1ModelParams } from '../../../types/typesV1Model';
import ModelV2Selects from '../ModelV2Selects/ModelV2Selects';
import ModelV1Selects from '../ModelV1Selects/ModelV1Selects';
import './sidebar.scss';
import { Context } from '../../app/App';
import { api } from '../../../api/Api.SD.TextToImage';
import Models from '../../models/Models';
import Switcher from '../../common/switcher/Switcher';

const Sidebar = (
    {setIsLoading, setImageProps} 
    : 
    {
        setIsLoading: Dispatch<SetStateAction<boolean>>,
        setImageProps: Dispatch<SetStateAction<ImageProps>>
    }
) => {

    const prompt = useRef<HTMLTextAreaElement | null>(null);

    const { genModelSelectProps } = generatorCommonPropsForSelect;

    const [genModel, setGenModel] = useState<GenModelsValue>(`core`);

    const handleModelClick = (value: GenModelsValue, id: string) => {
        setGenModel(value);

        const activeModelBtn = document.querySelector('.active-model-btn');
        if (!activeModelBtn) throw new Error(`Model btn not found`);
        activeModelBtn.classList.remove(`active-model-btn`);

        document.getElementById(id)?.classList.add(`active-model-btn`);
    };

    const [isOptionsShown, setIsOptionsShown] = useState<boolean>(false);

    const {mobxStore} = useContext(Context);
    const apiKey = mobxStore.SDApiKey;

    const [options, setOptions] = useState<ApiV1ModelParams | ApiV2ModelParams | {}>({});

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const promptValue = prompt.current?.value;

        if (!promptValue) {
            throw new Error(`Prompt is empty`);
        };

        if (!apiKey) {
            throw new Error(`API key is empty`);
        };

        if (genModel === `core` || genModel === `sd3` || genModel === `sd3-turbo` || genModel === `ultra`) {

            try {
                setIsLoading(true);
                const selectedOptions = options as ApiV2ModelParams;

                const response = await api.getImageFromV2Model(promptValue, selectedOptions, genModel, apiKey);
                
                if (!response) throw new Error(`Something went wrong with request: ${response}`);

                setImageProps({
                    generatedImage: response as string,
                    imgName: promptValue,
                    imgFormat: selectedOptions.output_format,
                });
            } catch (error) {
                setIsLoading(false);
                throw new Error(`Something went wrong: ${error}`);
            };
        } else {
            try {
                api.getImageFromV1Model(options as ApiV1ModelParams, genModel, apiKey)
            } catch (error) {
                throw new Error(`Something went wrong: ${error}`);
            };
        };

        const imgGenResultBlock = document.querySelector('.generation-result');
        imgGenResultBlock?.scrollIntoView({behavior: 'smooth'});
    };

    return(
        <form 
            action="submit"
            method='POST'
            className="submit-form"
            onSubmit={(e) => handleSubmit(e)}
        >
            <textarea 
                name="input" 
                id="generate-image-prompt"
                placeholder='Image description'
                className="submit-form__prompt"
                required={true} 
                rows={1}
                ref={prompt} 
            />
            <div className="submit-form__model-select">
                <span className='submit-form__model-select-headline'>
                    Select Model
                </span>
                <div className="submit-form__model-select-main">
                    <Models 
                        genModelSelectProps={genModelSelectProps} 
                        handleModelClick={handleModelClick}
                    />
                </div>
            </div>
            <div className="submit-form__show-options">
                <p className='submit-form__show-options-headline'>Show Options (advanced)</p>
                <Switcher 
                    value={isOptionsShown}
                    setValue={setIsOptionsShown}
                />
            </div>
            {isOptionsShown && 
                <div className="submit-form__options-container">
                    {genModel === `core` || genModel === `sd3` || genModel === `ultra` || genModel === `sd3-turbo` ? 
                        <ModelV2Selects 
                            setData={setOptions as Dispatch<SetStateAction<ApiV2ModelParams | {}>>}
                        />
                        : 
                        <ModelV1Selects 
                            setData={setOptions as Dispatch<SetStateAction<ApiV1ModelParams | {}>>}
                        />
                    }
                </div>
            } 
            <div className="submit-form__btn-container">
                <button 
                    type="submit" 
                    className='submit-form__button'
                >Generate Image</button>
            </div>
        </form>
    );
};

export default Sidebar;