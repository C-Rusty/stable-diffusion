import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import './generator.scss';
import { GenModelsValue } from '../../../types/typesCommon';
import ModelV1Selects from '../ModelV1Selects/ModelV1Selects';
import ModelV2Selects from '../ModelV2Selects/ModelV2Selects';
import { ApiV1ModelParams } from '../../../types/typesV1Model';
import { ApiV2ModelParams } from '../../../types/typesV2Model';
import { generatorCommonPropsForSelect } from '../../../utilities/ModelProps/GeneralPropsForSelect';

const Generator = () => {

    const prompt = useRef<HTMLInputElement | null>(null);

    const { genModelSelectProps } = generatorCommonPropsForSelect;

    const [genModel, setGenModel] = useState<GenModelsValue>(`core`);
    const [data, setData] = useState<ApiV1ModelParams | ApiV2ModelParams | {}>({});

    useEffect(() => {
        console.log(genModel);
    }, [genModel]);

    const handleModelClick = (value: GenModelsValue, id: string) => {
        setGenModel(value);
        document.getElementById(id)?.classList.toggle(`active-model-btn`)
    };

    useEffect(() => {
        console.log(data);
    }, [data]);

    return(
        <section className="generator">
            <div className="container">
                <div className="generator__inner">
                    <h1 className="generator__headline">Stable Diffusion</h1>
                    <input type="text" name="input" id="generate-image-prompt" placeholder='Image description'  className="generator__img-descr-propmt" ref={prompt} />
                    <label htmlFor="" className="generator__label">
                        <span className='generator__label-headline'>
                            Select Model
                        </span>
                        <div className="generator-model">
                        {genModelSelectProps.options.map((optionItem) =>  
                            <button 
                                className="generator-model__btn" 
                                key={optionItem.value}
                                id={optionItem.value}
                                onClick={() => handleModelClick(optionItem.value,optionItem.value)}
                            >{optionItem.text}</button>
                        )}
                        </div>
                    </label>
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
                    <button type="submit" disabled={true} className='generator__button'>Generate Image</button>
                    <div className="generator__result"></div>
                </div>
            </div>
        </section>
    );
};

export default Generator;