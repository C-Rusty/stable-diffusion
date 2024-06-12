import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from 'react';
import { generatorCommonPropsForSelect } from '../../../utilities/ModelProps/GeneralPropsForSelect';
import { GenModelsValue } from '../../../types/typesCommon';
import { ApiV2ModelParams } from '../../../types/typesV2Model';
import { ApiV1ModelParams } from '../../../types/typesV1Model';
import ModelV2Selects from '../ModelV2Selects/ModelV2Selects';
import ModelV1Selects from '../ModelV1Selects/ModelV1Selects';
import './sidebar.scss';
import { Context } from '../../app/App';
import { api } from '../../../api/Api.SD.TextToImage';

const Sidebar = (
    {setGeneratedImage, setIsLoading, setImgName} 
    : 
    {
        setGeneratedImage: Dispatch<SetStateAction<string | null>>, 
        setIsLoading: Dispatch<SetStateAction<boolean>>,
        setImgName: Dispatch<SetStateAction<string>>
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

    const {mobxStore} = useContext(Context);
    const apiKey = mobxStore.SDApiKey;

    const [data, setData] = useState<ApiV1ModelParams | ApiV2ModelParams | {}>({});

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
                const response = await api.getImageFromV2Model(promptValue, data as ApiV2ModelParams, genModel, apiKey);
                
                if (!response) throw new Error(`Something went wrong with request: ${response}`);

                setGeneratedImage(response as string);
                setImgName(promptValue);
            } catch (error) {
                setIsLoading(false);
                throw new Error(`Something went wrong: ${error}`);
            };
        } else {
            try {
                api.getImageFromV1Model(data as ApiV1ModelParams, genModel, apiKey)
            } catch (error) {
                throw new Error(`Something went wrong: ${error}`);
            };
        };
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
                required 
                rows={2}
                ref={prompt} 
            />
            <div className="submit-form__model-select">
                <span className='submit-form__model-select-headline'>
                    Select Model
                </span>
                <div className="submit-form__model-select-main">
                {genModelSelectProps.options.map((optionItem, index) =>  
                    <div className="button-container">
                        <button 
                            className={`button-container__btn ${index === 0 ? 'active-model-btn' : ""} `} 
                            key={optionItem.value}
                            id={optionItem.value}
                            type='button'
                            onClick={() => handleModelClick(optionItem.value,optionItem.value)}
                        >{optionItem.text}</button>
                        <div className="button-container__tip">
                            <span className='button-container__tip-text'>
                                    {optionItem.tip.description}
                            </span>
                            <span className='button-container__tip-text'>
                                {optionItem.tip.imgGenAmount}
                            </span>
                            <span className='button-container__tip-text'>
                                Price: {optionItem.tip.price}
                            </span>
                        </div>
                    </div>
                )}
                </div>
            </div>
            {genModel === `core` || genModel === `sd3` || genModel === `ultra` || genModel === `sd3-turbo` ? 
                <ModelV2Selects 
                    setData={setData as Dispatch<SetStateAction<ApiV2ModelParams | {}>>}
                />
                : 
                <ModelV1Selects 
                    setData={setData as Dispatch<SetStateAction<ApiV1ModelParams | {}>>}
                />
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