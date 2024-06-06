import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import './generator.scss';
import { GenModelsValue } from '../../../types/typesCommon';
import ModelV1Selects from '../ModelV1Selects/ModelV1Selects';
import ModelV2Selects from '../ModelV2Selects/ModelV2Selects';
import { ApiV1ModelParams } from '../../../types/typesV1Model';
import { ApiV2ModelParams } from '../../../types/typesV2Model';
import { generatorCommonPropsForSelect } from '../../../utilities/ModelProps/GeneralPropsForSelect';
import { api } from '../../../api/Api.textToImage';

const Generator = () => {

    const prompt = useRef<HTMLInputElement | null>(null);

    const { genModelSelectProps } = generatorCommonPropsForSelect;

    const [genModel, setGenModel] = useState<GenModelsValue>(`core`);
    const [data, setData] = useState<ApiV1ModelParams | ApiV2ModelParams | {}>({});

    const handleModelClick = (value: GenModelsValue, id: string) => {
        setGenModel(value);

        const activeModelBtn = document.querySelector('.active-model-btn');
        if (!activeModelBtn) throw new Error(`Model btn not found`);
        activeModelBtn.classList.remove(`active-model-btn`);

        document.getElementById(id)?.classList.add(`active-model-btn`);
    };

    const [image, setImage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!prompt.current?.value) {
            throw new Error(`Prompt is empty`);
        };

        if (genModel === `core` || genModel === `sd3`) {
            try {
                const response = await api.getImageFromV2Model(prompt.current?.value, data as ApiV2ModelParams, genModel);

                console.log(response);
                
                if (response) setImage(response as string);
                
            } catch (error) {
                throw new Error(`Something went wrong: ${error}`);
            };
        } else {
            try {
                api.getImageFromV1Model(data as ApiV1ModelParams, genModel)
            } catch (error) {
                throw new Error(`Something went wrong: ${error}`);
            };
        };
    };

    return(
        <section className="generator">
            <div className="container">
                <div className="generator__inner">
                    <form 
                        action="submit"
                        method='POST'
                        className="generator__form" 
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <h1 className="generator__headline">Stable Diffusion</h1>
                        <input 
                            type="text" 
                            name="input" 
                            id="generate-image-prompt" 
                            placeholder='Image description'  className="generator__img-descr-propmt" 
                            ref={prompt} 
                        />
                        <div className="generator__model-select">
                            <span className='generator__model-select-headline'>
                                Select Model
                            </span>
                            <div className="generator-model">
                            {genModelSelectProps.options.map((optionItem, index) =>  
                                <button 
                                    className={`generator-model__btn ${index === 0 ? 'active-model-btn' : ""} `} 
                                    key={optionItem.value}
                                    id={optionItem.value}
                                    onClick={() => handleModelClick(optionItem.value,optionItem.value)}
                                >{optionItem.text}</button>
                            )}
                            </div>
                        </div>
                        {genModel === `core` || genModel === `sd3` ? 
                            <ModelV2Selects 
                                data={data as ApiV2ModelParams} 
                                setData={setData as Dispatch<SetStateAction<ApiV2ModelParams | {}>>}
                            />
                            : 
                            <ModelV1Selects 
                                data={data as ApiV1ModelParams} 
                                setData={setData as Dispatch<SetStateAction<ApiV1ModelParams | {}>>}
                            />
                        }
                        <div className="btn-container">
                            <button 
                                type="submit" 
                                className='btn-container__button'
                            >Generate Image</button>
                        </div>
                    </form>
                    <div className="generator__result">
                        <img src={image ? image : ''} alt="" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Generator;